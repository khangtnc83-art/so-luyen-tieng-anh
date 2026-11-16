/**
 * KHO DỮ LIỆU CHUNG CHO "SỔ LUYỆN TIẾNG ANH" — chạy trên Google Sheet của giáo viên (miễn phí)
 *
 * Làm gì:
 *  - Lưu tiến độ của từng người học (bài đã học, điểm, từ vựng đã nhớ…) để giáo viên xem được.
 *  - Lưu ngày học bù / trạng thái học bù do GIÁO VIÊN nhập, để người học thấy trên trình duyệt của họ.
 *  - Ghi nhật ký từng hoạt động vào trang "Nhật ký".
 *
 * Cài đặt (khoảng 5 phút):
 *  1. Tạo Google Sheet mới (gõ sheets.new trên trình duyệt).
 *  2. Menu Tiện ích mở rộng → Apps Script. Xoá code mẫu, dán TOÀN BỘ file này vào.
 *  3. Đổi mật khẩu giáo viên ở dòng TEACHER_KEY bên dưới, rồi bấm Lưu (biểu tượng đĩa).
 *  4. Bấm Triển khai → Tùy chọn triển khai mới → bánh răng → chọn "Ứng dụng web".
 *       Thực thi với tư cách: Tôi
 *       Người có quyền truy cập: Bất kỳ ai
 *     Bấm Triển khai → Cho phép quyền truy cập (chọn tài khoản Google của bạn → Nâng cao → Đi tới… → Cho phép).
 *  5. Sao chép "URL ứng dụng web" (kết thúc bằng /exec) và gửi cho Claude, hoặc tự dán vào
 *     data/content.js ở dòng   syncUrl: "..."
 *
 * Khi sửa file này sau đó: Triển khai → Quản lý các bản triển khai → bút chì → Phiên bản: Mới → Triển khai
 * (URL giữ nguyên).
 */
var TEACHER_KEY = "doi-mat-khau-nay";   // ← mật khẩu để vào chế độ Giáo viên trên web

var DATA_SHEET = "Dữ liệu";
var LOG_SHEET = "Nhật ký";
var CHUNK = 40000; // mỗi ô Google Sheet chứa tối đa 50.000 ký tự

function doGet(e) {
  var p = (e && e.parameter) || {};
  var out;
  if (p.action === "get" && p.learner) {
    out = { ok: true, progress: read_("P:" + p.learner), admin: read_("A:" + p.learner) };
  } else if (p.action === "list") {
    if (p.key !== TEACHER_KEY) out = { ok: false, error: "key" };
    else out = { ok: true, learners: list_() };
  } else {
    out = { ok: true, hello: "Sổ Luyện Tiếng Anh" };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) { return text_("bad"); }
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (d.action === "progress" && d.learner) {
      write_("P:" + d.learner, d.learner, d.name || "", d.data || {});
    } else if (d.action === "admin" && d.learner) {
      if (d.key !== TEACHER_KEY) return text_("key");
      write_("A:" + d.learner, d.learner, d.name || "", d.data || {});
      log_({ name: "Giáo viên", type: "admin", session: d.learner, detail: JSON.stringify(d.data || {}) });
    } else if (d.action === "delete" && d.learner) {
      if (d.key !== TEACHER_KEY) return text_("key");
      var n = deleteLearner_(d.learner);
      log_({ name: "Giáo viên", type: "delete", session: d.learner, detail: n + " dòng" });
    } else if (d.type) {
      log_(d);
    }
  } finally {
    lock.releaseLock();
  }
  return text_("ok");
}

function text_(s) { return ContentService.createTextOutput(s); }

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) { sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}

function data_() { return sheet_(DATA_SHEET, ["Khoá", "Học viên", "Tên", "Cập nhật", "Dữ liệu (JSON)"]); }

function findRow_(sh, key) {
  var n = sh.getLastRow();
  if (n < 2) return 0;
  var keys = sh.getRange(2, 1, n - 1, 1).getValues();
  for (var i = 0; i < keys.length; i++) if (keys[i][0] === key) return i + 2;
  return 0;
}

function write_(key, learner, name, obj) {
  var sh = data_();
  var json = JSON.stringify(obj);
  var parts = [];
  for (var i = 0; i < json.length; i += CHUNK) parts.push(json.slice(i, i + CHUNK));
  var row = findRow_(sh, key) || sh.getLastRow() + 1;
  var old = sh.getLastColumn();
  if (old > 5) sh.getRange(row, 6, 1, old - 5).clearContent();
  sh.getRange(row, 1, 1, 4 + parts.length).setValues([[key, learner, name, new Date()].concat(parts)]);
}

function deleteLearner_(learner) {
  var sh = data_();
  var n = sh.getLastRow();
  if (n < 2) return 0;
  var keys = sh.getRange(2, 1, n - 1, 1).getValues();
  var removed = 0;
  for (var i = keys.length - 1; i >= 0; i--) {
    var k = String(keys[i][0]);
    if (k === "P:" + learner || k === "A:" + learner) { sh.deleteRow(i + 2); removed++; }
  }
  return removed;
}

function read_(key) {
  var sh = data_();
  var row = findRow_(sh, key);
  if (!row) return null;
  var vals = sh.getRange(row, 5, 1, Math.max(1, sh.getLastColumn() - 4)).getValues()[0];
  try { return JSON.parse(vals.join("")); } catch (err) { return null; }
}

function list_() {
  var sh = data_();
  var n = sh.getLastRow();
  if (n < 2) return [];
  var rows = sh.getRange(2, 1, n - 1, Math.max(5, sh.getLastColumn())).getValues();
  var by = {};
  rows.forEach(function (r) {
    var key = String(r[0]); var learner = String(r[1]);
    if (!learner) return;
    var o = by[learner] = by[learner] || { learner: learner, name: "", updated: "", progress: null, admin: null };
    var obj = null;
    try { obj = JSON.parse(r.slice(4).join("")); } catch (err) {}
    if (key.indexOf("P:") === 0) { o.progress = obj; o.name = r[2] || o.name; o.updated = r[3]; }
    if (key.indexOf("A:") === 0) { o.admin = obj; }
  });
  return Object.keys(by).map(function (k) { return by[k]; });
}

function log_(d) {
  var sh = sheet_(LOG_SHEET, ["Thời gian", "Học viên", "Hoạt động", "Buổi / bài", "Kết quả", "Chi tiết"]);
  var kind = { complete: "HOÀN THÀNH BUỔI", theory: "Ôn lý thuyết", quiz: "Bài tập", speak: "Luyện nói", admin: "GV cập nhật học bù", delete: "GV xoá người học" }[d.type] || d.type;
  var score = d.type === "quiz" ? (d.score + "/" + d.total + " (" + d.pct + "%)")
            : d.type === "speak" ? (d.score + "/100" + (d.self ? " (tự chấm)" : ""))
            : d.type === "complete" ? ("lịch " + d.date + " · học " + d.actual) : "";
  sh.appendRow([new Date(), String(d.name || "").slice(0, 60), kind, String(d.session || "").slice(0, 120), score, String(d.detail || (d.byLevel ? JSON.stringify(d.byLevel) : "")).slice(0, 2000)]);
}

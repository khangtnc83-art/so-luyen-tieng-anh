# Sổ Luyện Tiếng Anh — hướng dẫn cho Claude

Trang web tĩnh giúp một người học (trình độ khá, mạnh từ vựng học thuật, yếu giao tiếp đời thường) ôn **ngữ pháp, từ vựng, luyện nói** để dùng tự tin khi giao tiếp. Giáo viên (chủ dự án) cung cấp tài liệu; Claude soạn bài, sửa web, chạy thử, rồi đẩy lên GitHub.

- Trang người học: https://khangtnc83-art.github.io/so-luyen-tieng-anh/
- Trang giáo viên: cùng link + `#giaovien` (mật khẩu chỉ nằm trong Apps Script — **không bao giờ hỏi, ghi hay commit mật khẩu**)
- Repo: `khangtnc83-art/so-luyen-tieng-anh` (công khai, nhánh `main`, GitHub Pages phục vụ thư mục `docs/`)
- Giao tiếp với chủ dự án bằng **tiếng Việt**, dễ hiểu, không thuật ngữ khó.

## Quy tắc làm việc (bắt buộc)
1. **Hỏi trước khi đẩy lên GitHub.** Sửa + chạy thử xong → báo kết quả → chỉ `git commit` / `git push` khi chủ dự án đồng ý.
2. **Hỏi khi tài liệu chưa rõ** (cách xếp buổi, file thiếu, nội dung mâu thuẫn) trước khi làm.
3. Commit kết thúc bằng dòng `Co-Authored-By: Claude …` theo hướng dẫn hệ thống. Danh tính commit dùng email noreply của GitHub (đã cấu hình trong repo).
4. **Trước mỗi commit có sửa `docs/`: chạy `python3 tools/bump_version.py`** (đổi số phiên bản trong `docs/index.html` + `docs/version.json`). Trang so số này khi mở / quay lại tab và tự tải lại một lần nếu trình duyệt đang giữ bản cũ (GitHub Pages cho trình duyệt giữ file ~10 phút).
5. Sau khi push: đợi build GitHub Pages (`gh api repos/khangtnc83-art/so-luyen-tieng-anh/pages/builds/latest`) rồi kiểm tra trang thật.
6. **Không bao giờ commit `syncUrl` của máy chủ giả lập** — luôn khôi phục link `/exec` thật trước khi commit.

## Cấu trúc
```
docs/index.html          toàn bộ ứng dụng (HTML + CSS + JS, không framework, không build)
docs/data/content.js     lịch học + nội dung các buổi (window.CONTENT)
docs/data/vocab3000.js   3.396 từ Oxford 3000 (window.VOCAB_LIBRARY)
google-sheet-script.gs   Apps Script làm kho dữ liệu chung (dán vào Google Sheet của giáo viên)
tools/mock_sheet.py      máy chủ giả lập Apps Script để chạy thử
tools/bump_version.py    đổi số phiên bản trước mỗi lần đẩy (trình duyệt tự lấy bản mới)
docs/version.json        số phiên bản hiện tại
```

## Lịch & buổi học
- Học **Thứ 2 và Thứ 5**, bắt đầu `startDate: "2026-11-02"` (`studyDays: [1, 4]`). Bảng tự sinh đủ cả tháng.
- **Tên file `NPxx` = Buổi xx** (NP01 → Buổi 1 = 02/11, NP02 → 05/11, NP03 → 09/11, NP04 → 12/11, NP05 → 16/11…).
- File phụ cùng số (ví dụ `NP03.02`) = **bài thứ 2 trong cùng buổi**: thêm một mục `sessions` riêng có cùng `date` (id kiểu `np03-02`). Buổi chỉ "Hoàn thành" khi xong mọi phần của mọi bài trong buổi.
- Một buổi **hoàn thành** khi xong cả 3 phần: Lý thuyết + Bài tập + Luyện nói. Ngày học thực tế = lúc xong phần cuối.
- **Học bù**: chỉ giáo viên nhập (chế độ xem người học → tab Bài học): chọn ngày bù (phải **sau** ngày học) → tick "Đã học bù". Buổi đã bù được tính vào số ngày học.
- **Học phí**: đã bỏ khỏi web theo yêu cầu (17/11/2026) — không hiển thị học phí.

## Soạn một bài mới từ file `.mm` (FreeMind/XMind)
Mỗi mục trong `CONTENT.sessions`:
```js
{ id: "np06", date: "YYYY-MM-DD", title: "NP06 - …", level: "B1",
  grammar: { t: "tiêu đề", c: [ nhánh … ] },   // mindmap
  quiz:   [ { lv: 1|2|3, q, a, opts: [...], ex } ],
  speak:  [ { lv: 1|3, en, vi } ],
  vocab:  [ … ]  // không bắt buộc
}
```
- **Lý thuyết (mindmap)**: giữ đúng cấu trúc nhánh của file gốc. Nút là chuỗi hoặc `{ t, c, k }`.
  - `"Work -> Worked"` hiện thành cặp từ có tô đuôi + nút nghe; `"Do - Did - Done"` hiện 3 dạng; `"Ví dụ: a, b, c"` thành chip bấm nghe; câu tiếng Anh `"… . (nghĩa)"` có nút nghe.
  - `**chữ**` = in đậm.
  - `k: "fix"` = nhãn **ĐÃ SỬA** — dùng khi sửa lỗi trong tài liệu gốc, ghi rõ bản gốc viết gì.
  - `k: "tip"` = nhãn **LƯU Ý** — ghi chú/ví dụ Claude bổ sung.
  - Chính sách: **sửa lỗi + ghi chú** (không im lặng sửa, không giữ lỗi). Có thể thêm nhánh "Hay nhầm khi nói" nếu hữu ích cho giao tiếp.
- **Bài tập**: mỗi lần làm lấy **20 câu = 10 cơ bản (lv 1) + 5 trung bình (lv 2) + 5 khó (lv 3)**. Ngân hàng câu ≥ 20 (đúng tỉ lệ). `opts` rỗng = câu điền từ; nhiều đáp án đúng (chỉ câu điền từ) viết `"a/b"`. Câu trắc nghiệm: `a` là nguyên một lựa chọn — câu 2 chỗ trống nối bằng `" / "` (ví dụ `"was cooking / was washing"`), các `opts` cũng viết cùng kiểu. `ex` = giải thích tiếng Việt ngắn. Câu khó ưu tiên tình huống hội thoại dễ nhầm.
- **Luyện nói**: **10 câu = 4 cơ bản (lv 1) + 6 khó (lv 3)**, câu giao tiếp tự nhiên, có `vi` (nghĩa tiếng Việt).
  - Chấm điểm: số / giờ / năm được đổi thành chữ ở cả câu mẫu lẫn câu nhận được ("8:00" = "eight" = "eight o'clock", "120,000" = "one hundred and twenty thousand"), nên viết câu mẫu kiểu nào cũng được.
  - Phím **Space** = bắt đầu / dừng ghi âm; ở màn hình kết quả Space = **nói lại** (ghi âm ngay).
  - Nút **"‹ Câu trước"** (phím ←) quay lại câu trước, giữ kết quả đã có của từng câu; không quay được khi đang ghi âm.
  - Phím **→** = "Tiếp" (chỉ khi câu đã có kết quả, không khi đang ghi âm). Có thể làm hết bài chỉ bằng Space / Space / →.
  - Micro: trang chỉ báo "Mời bạn đọc" khi micro đã thật sự bật (tránh mất đầu câu); nhận 5 phương án nghe và chọn phương án khớp câu mẫu nhất.
- Ngôn ngữ ví dụ: đời thường, bối cảnh Việt Nam quen thuộc (Đà Nẵng, Hội An, bánh xèo…).

## Giọng văn cho nội dung Claude tự viết (giáo viên chọn 23/11/2026)
Áp dụng cho nội dung Claude tự viết: câu bài tập, luyện nói, ví dụ bổ sung, câu ví dụ từ vựng theo buổi — **không** đụng vào lý thuyết/ví dụ của giáo viên, và **không** viết lại bộ 3000 từ (câu Tatoeba giữ nguyên, giáo viên không yêu cầu).
- Giữ kiểu ví dụ hiện tại (giáo viên rất thích): câu tự nhiên, dùng được ngay khi nói chuyện, bối cảnh Việt Nam đời thường.
- Thêm chất **"người lớn"** = chuyện đời thật của người đi làm/đi học: deadline, sếp, lương, tiền nhà, hẹn hò, độc thân, tăng cân, mất ngủ, họ hàng hỏi chuyện chồng con…
- **Kết hợp linh hoạt** (giáo viên chốt: không bắt buộc, không đặt tỉ lệ): Claude tự cân giữa câu tự nhiên đời thường, chất "người lớn" và **dark joke / hài khô, mỉa, tự giễu** khi hợp với câu và điểm ngữ pháp. Ví dụ dark joke: "I have a dog. The dog has a better social life than I do." · "My boss gave me a raise — in workload." · "What a beautiful Monday! — said no one ever."
- Câu vẫn phải **làm rõ điểm ngữ pháp** đang học; cái hài không được che mất cấu trúc. Câu cơ bản ưu tiên rõ ràng, câu khó / luyện nói được "mặn" hơn.
- Giới hạn: không nội dung tình dục lộ liễu; không chế giễu nhóm người (giới, vùng miền, tôn giáo, ngoại hình, khuyết tật); không đùa về tự tử, bạo lực thật, bệnh hiểm nghèo, thảm hoạ; không chính trị. Tiếng lóng nhẹ được, không chửi thề.

## Giáo viên sửa bài qua link (Claude Docs)
- Khi giáo viên muốn tự sửa bài: tạo một Claude Doc gồm Hướng dẫn sửa · Phần 1 Lý thuyết (### = nhánh lớn, gạch đầu dòng thụt 4 dấu cách = nhánh con, **[ĐÃ SỬA]** / **[LƯU Ý]** ở đầu dòng = `k: "fix"` / `k: "tip"`) · Phần 2 Bài tập (bảng: # | Mức | Câu hỏi | Đáp án | Lựa chọn sai (cách nhau bằng ;) | Giải thích) · Phần 3 Luyện nói (bảng: # | Mức | Câu tiếng Anh | Nghĩa).
- Giáo viên nhắn "đã sửa xong" → đọc lại tài liệu, chuyển ngược thành mục `sessions` (Cơ bản/Trung bình/Khó = lv 1/2/3), giữ đúng những gì giáo viên sửa; câu giáo viên thêm mà sai ngữ pháp → hỏi trước khi đổi, rồi sửa luôn trong tài liệu cho khớp.
- Link bài NP06: https://claude.ai/artifact/AEdBKxo4cxTZUxGSGnTv7n

## Từ vựng
- `docs/data/vocab3000.js`: `{ n, w, pos, ipa, vi, ex?, exVi?, fam?, syn? }` — loại từ, gia đình từ, đồng nghĩa (WordNet), câu ví dụ (Tatoeba, CC BY 2.0 FR), `exVi` = nghĩa tiếng Việt của câu ví dụ (Claude dịch). Nghĩa giữ theo PDF gốc của giáo viên (có vài nghĩa sai đã biết, ví dụ *actually*, *adapt* — chỉ sửa khi được yêu cầu).
- Từ vựng theo buổi nằm trong `sessions[].vocab`: `{ w, form, ipa, pos, vi, ex, exVi, alt }` (`alt` = từ học thuật tương đương). Bài mới có từ vựng thì **luôn kèm `exVi`**. Câu ví dụ dùng đúng dạng từ đang học, tránh thành ngữ / cụm lạ (bài học: *"pop quizzes"* ở thẻ *quiz* làm người học khó hiểu); phiên âm phải là của từ chính, không phải dạng số nhiều.
- Trạng thái từ: **Chưa học / Cần ôn / Đã nhớ** (lưu trong `vs`).
- **Từ hay (★)**: đánh dấu riêng, không liên quan trạng thái (lưu `star`); có bộ lọc "★ Từ hay" và học flashcard riêng các từ này.
- **Ghi chú**: theo từng từ (`notes`, viết ở thẻ flashcard sau khi lật hoặc khi mở dòng trong bảng) + **Sổ ghi chú** chung trong tab Từ vựng (`notebook`). Đồng bộ lên Sheet; giáo viên chỉ xem.
- **Chọn thẻ flashcard**: ngẫu nhiên — tối đa 40 từ "Cần ôn" + 20 từ mới bốc ngẫu nhiên, trộn lẫn; mỗi từ (theo mặt chữ, bỏ phần sau dấu phẩy / ngoặc) chỉ 1 thẻ mỗi lần học vì bộ 3000 có ~18 từ bị ghi 2 lần (centimetre 466/467, kilometre, each other, may/May…). Bấm "Cần ôn" **không** làm thẻ quay lại trong cùng buổi (giáo viên bỏ, 23/11/2026) — từ đó sẽ vào nhóm ôn ở lần học sau.
- **Flashcard**: nút "‹ Thẻ trước" (phím ←) quay lại thẻ vừa chấm và huỷ đánh giá đó; nút "Hiện/Ẩn nghĩa ví dụ" (nhớ lựa chọn trên máy).
- **Tra Cambridge**: khi đang học flashcard, tô đen chữ tiếng Anh (≤ 60 ký tự) → hiện nút "Tra Cambridge: …" mở tab mới `https://dictionary.cambridge.org/search/direct/?datasetsearch=english&q=<chữ>`. Máy tính: nút ở trên chữ; điện thoại: ở dưới (tránh menu Sao chép). Không dùng logo Cambridge.

## Đồng bộ dữ liệu (Google Sheet)
- `CONTENT.syncUrl` = link `/exec` của Apps Script giáo viên. Không có đăng nhập; người học nhận diện bằng tên (`lid` = tên không dấu, gạch nối). Link riêng: `?hv=Tên`.
- Người học ghi tiến độ (`action: "progress"`); giáo viên (có mật khẩu) đọc danh sách (`list`), ghi học bù (`admin`), xoá người học (`delete`).
- Khi giáo viên "Xem" một người học: mọi tab hiện dữ liệu người đó, **các nút học bị khoá**, chỉ sửa được học bù; không ghi gì vào bộ nhớ trình duyệt của giáo viên.
- Sửa `google-sheet-script.gs` ⇒ nhắc giáo viên dán lại vào Apps Script, **giữ `TEACHER_KEY` của họ**, rồi *Triển khai → Quản lý → Phiên bản mới*. Có thể kiểm tra phiên bản bằng yêu cầu chỉ đọc hoặc POST với mật khẩu sai (không ghi dữ liệu thật). **Không ghi dữ liệu thử vào Sheet thật.**

## Chạy thử (trước mọi lần đề xuất push)
```bash
python3 tools/mock_sheet.py --seed        # kho giả lập, mật khẩu GV: test-key
python3 -m http.server 8765 --directory docs
```
- Tạm đổi `syncUrl` trong `docs/data/content.js` thành `"http://127.0.0.1:8766/"`; xong **khôi phục link thật** (sao lưu trước khi sửa).
- Mở `http://localhost:8765/` (người học) và `http://localhost:8765/#giaovien` (giáo viên). Trình duyệt hay giữ bản cũ của `content.js`: `fetch(url,{cache:'reload'})` rồi tải lại.
- Kiểm tra cả màn hình hẹp (điện thoại ~375px), không lỗi console. Xoá localStorage thử nghiệm sau khi test.

## Môi trường máy chủ dự án
- `gh` (GitHub CLI) ở `/usr/local/bin/gh`, đã đăng nhập tài khoản `khangtnc83-art`. Thêm `PATH="/usr/local/bin:$PATH"` khi gọi.
- Không có Homebrew, không có Node. Python 3 có sẵn.

/*
  NỘI DUNG HỌC — mỗi buổi học là một mục trong "sessions".
  Lịch: Thứ 2 và Thứ 5 hằng tuần, bắt đầu từ startDate. "date" là ngày học theo lịch (YYYY-MM-DD).
  Một buổi được tính "Hoàn thành" khi học viên làm xong cả 3 phần: Lý thuyết, Bài tập, Luyện nói.

  Cấu trúc một buổi:
    id, date, title, level
    grammar : sơ đồ tư duy. Mỗi nút là chuỗi "text" hoặc { t: "text", c: [nút con], k: "tip" }
              k: "tip" = ghi chú bổ sung (hiển thị khác màu).
              "A -> B" (từ tiếng Anh) sẽ hiện thành cặp từ có tô đuôi + nút nghe.
              "Ví dụ: a, b, c" sẽ hiện thành các từ bấm để nghe.
    vocab   : { w, form, ipa, pos, vi, ex, alt }  alt = từ học thuật / trang trọng tương đương
    quiz    : { lv: 1|2|3, q, a, opts, ex }   1 = cơ bản, 2 = trung bình, 3 = khó.
              opts rỗng = câu điền từ. Nhiều đáp án đúng: "a/b".
              Bài tập lấy 20 câu: 10 cơ bản + 5 trung bình + 5 khó (ngân hàng câu có thể nhiều hơn, mỗi lần làm sẽ trộn).
    speak   : { lv: 1|3, en, vi }   Bài nói lấy 10 câu: 4 cơ bản + 6 khó.

  syncUrl: dán link Google Apps Script vào đây để nhận tiến độ của học viên (tuỳ chọn).
*/
window.CONTENT = {
  syncUrl: "https://script.google.com/macros/s/AKfycbzvJ7yIXujRfJ8Jka7MNQxWvCV1IMu5NCbp0wuEa-LK7mBrViDj9xg0mJSYuU4runM/exec",   // ← dán link Apps Script (kết thúc bằng /exec) vào đây
  startDate: "2026-11-02",
  studyDays: [1, 4],   // 1 = Thứ 2, 4 = Thứ 5
  sessions: [
    {
      id: "np01",
      date: "2026-11-02",
      title: "NP01 - Hiện tại đơn",
      level: "A2–B1",
      grammar: {
        t: "NP01 - Hiện tại đơn",
        c: [
          { t: "Ghi chú (Note)", c: [
            { t: "Everyone / Anyone → động từ chia **số ít** (is, has, V-s)", c: ["Everyone is here.", "Anyone who wants coffee can come with me."] },
            { t: "These / Those khác gì This / That?", c: [
              "This / That + danh từ **số ít**: This book is mine.",
              "These / Those + danh từ **số nhiều**: These books are mine.",
              { t: "This / These = ở gần người nói · That / Those = ở xa người nói", k: "tip" }
            ]},
            { t: "The sun rises in the east.", c: [
              "The sun rises at 5:30 a.m. in summer.",
              { t: "Bản gốc: \"rises from the East\" → nói đúng là \"rises **in** the east\"", k: "fix" }
            ]},
            { t: "Cách dùng", c: [
              { t: "Sự thật hiển nhiên", c: ["Water boils at 100 degrees Celsius."] },
              { t: "Lặp đi lặp lại (thói quen)", c: ["I go to the gym three times a week."] },
              { t: "Lịch trình cố định", c: ["The train leaves at 7 a.m."] }
            ]},
            { t: "Phủ định: Do / does + not + V0 + O", c: ["I don't like spicy food.", "She doesn't work on Sundays."] },
            { t: "Phủ định với to be: am / is / are + not + N / Adj", c: ["I'm not tired.", "They aren't students."] },
            { t: "Cụm từ hay dùng", c: [
              { t: "I don't know + Wh-word + to V0 + O", c: [
                "I dunno what to do with this information. (dunno = don't know, văn nói)",
                "I don't know how to fix it.",
                { t: "Bản gốc: \"I dont know\" → \"I don't know\"; câu \"I dunno how can\" chưa hết → sửa thành \"I don't know how to + V0\"", k: "fix" }
              ]}
            ]},
            { t: "Câu hỏi đuôi", c: [
              "You're OK today, aren't you?",
              { t: "He goes to school every day, doesn't he?", c: [
                "Tường thuật: He said he went to school every day, didn't he?",
                { t: "Bản gốc: \"did not he?\" → câu hỏi đuôi phủ định viết tắt: \"didn't he?\"", k: "fix" },
                { t: "\"everyday\" (tính từ: thường ngày) ≠ \"every day\" (mỗi ngày) → goes to school **every day**", k: "fix" }
              ]}
            ]},
            { t: "Tính - Danh - Động - Trạng", c: [
              "I barely do my task. (barely = hầu như không)",
              { t: "Trạng từ tần suất đứng **trước** động từ thường, **sau** to be: I barely sleep. / She is always late.", k: "tip" }
            ]}
          ]},
          { t: "1. Trạng từ chỉ tần suất tương đối", c: [
            "Always (luôn luôn)",
            "Usually (thường xuyên)",
            "Often (thường)",
            { t: "Sometimes (thỉnh thoảng) — bổ sung để đủ thang tần suất", k: "tip" },
            "Hardly (hiếm khi)",
            "Never (không bao giờ)",
            { t: "Bản gốc lặp \"Hardly\" 2 lần — đã gộp và xếp theo thứ tự từ nhiều đến ít", k: "fix" }
          ]},
          { t: "2. Trạng từ chỉ tần suất cụ thể", c: [
            "Henry goes to the cinema twice a month. (Henry đi xem phim ở rạp 2 lần mỗi tháng.)",
            "The hour hand moves 12 times a day. (Kim chỉ giờ di chuyển 12 lần 1 ngày.)",
            "Spring comes once a year. (Mùa xuân tới mỗi năm 1 lần.)",
            { t: "once (1 lần) · twice (2 lần) · three times (3 lần) + a day / a week / a month", k: "tip" }
          ]},
          { t: "3. Trạng từ chỉ sự lặp đi lặp lại", c: [
            "Hourly, daily, weekly, monthly, quarterly, yearly (hàng giờ, hàng ngày, hàng tuần, hàng tháng, hàng quý, hàng năm)",
            "Every day, every week, every month, every year, every 10 years… (mỗi ngày, mỗi tuần, mỗi tháng, mỗi 10 năm)"
          ]}
        ]
      },
      quiz: [
        { lv: 1, q: "She ___ to work by bus every day.", a: "goes", opts: ["go", "going", "is go"], ex: "Ngôi 3 số ít (she) → goes." },
        { lv: 1, q: "My parents ___ coffee every morning.", a: "drink", opts: ["drinks", "drinking", "is drink"], ex: "My parents = số nhiều → drink (không thêm s)." },
        { lv: 1, q: "Everyone ___ ready for the trip.", a: "is", opts: ["are", "be", "am"], ex: "Everyone luôn đi với động từ số ít → is." },
        { lv: 1, q: "I ___ like spicy food.", a: "don't", opts: ["doesn't", "am not", "not"], ex: "I + don't + V0." },
        { lv: 1, q: "He ___ a student. He's a teacher.", a: "isn't", opts: ["doesn't", "don't", "aren't"], ex: "Sau là danh từ (a student) → dùng to be: isn't." },
        { lv: 1, q: "___ these your keys?", a: "Are", opts: ["Is", "Does", "Do"], ex: "These (số nhiều) → Are." },
        { lv: 1, q: "Water ___ at 100 degrees Celsius.", a: "boils", opts: ["boil", "is boiling", "boiled"], ex: "Sự thật hiển nhiên → hiện tại đơn; water là danh từ không đếm được → boils." },
        { lv: 1, q: "The train ___ (leave) at 7 a.m. every morning.", a: "leaves", opts: [], ex: "Lịch trình cố định → hiện tại đơn; the train → leaves." },
        { lv: 1, q: "She ___ (not / eat) meat.", a: "doesn't eat/does not eat", opts: [], ex: "She + doesn't + V0." },
        { lv: 1, q: "\"Hardly\" nghĩa là ___", a: "hiếm khi", opts: ["luôn luôn", "thường xuyên", "không bao giờ"], ex: "Hardly (ever) = hiếm khi." },

        { lv: 2, q: "She ___ late for class. (luôn luôn)", a: "is always", opts: ["always is", "always", "is often always"], ex: "Trạng từ tần suất đứng SAU to be: is always." },
        { lv: 2, q: "I go to the gym ___ a week.", a: "three times", opts: ["three time", "third times", "three timely"], ex: "Số lần: once, twice, three times + a week." },
        { lv: 2, q: "You're OK today, ___?", a: "aren't you", opts: ["don't you", "isn't it", "are you"], ex: "Mệnh đề khẳng định với are → đuôi phủ định aren't you." },
        { lv: 2, q: "These / Those đi với ___", a: "danh từ số nhiều", opts: ["danh từ số ít", "động từ", "tính từ"], ex: "These books, those cars…" },
        { lv: 2, q: "How often ___ your sister visit you?", a: "does", opts: ["do", "is", "are"], ex: "Câu hỏi với động từ thường, chủ ngữ ngôi 3 số ít → does." },

        { lv: 3, q: "He goes to school every day, ___?", a: "doesn't he", opts: ["didn't he", "isn't he", "does he"], ex: "goes (hiện tại đơn, khẳng định) → đuôi doesn't he." },
        { lv: 3, q: "A: Do you know how to use this app? — B: Honestly, I ___ what to do with it.", a: "don't know", opts: ["doesn't know", "not know", "am not know"], ex: "I don't know + wh-word + to V0." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "My brother hardly ever eats breakfast.", opts: ["My brother eats hardly ever breakfast.", "My brother hardly ever eat breakfast.", "My brother doesn't hardly eat breakfast."], ex: "Trạng từ đứng trước động từ thường; my brother → eats; hardly đã mang nghĩa phủ định, không dùng thêm doesn't." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "The sun rises in the east.", opts: ["The sun rises from the east.", "The sun rise in the east.", "The sun is rising in the east every day."], ex: "Sự thật hiển nhiên → hiện tại đơn; rise in the east." },
        { lv: 3, q: "Anyone who ___ late has to buy coffee for the team.", a: "is", opts: ["are", "be", "being"], ex: "Anyone → động từ số ít: is." }
      ],
      speak: [
        { lv: 1, en: "I usually get up at six.", vi: "Mình thường dậy lúc 6 giờ." },
        { lv: 1, en: "She doesn't drink coffee.", vi: "Cô ấy không uống cà phê." },
        { lv: 1, en: "Everyone is here.", vi: "Mọi người có mặt đủ rồi." },
        { lv: 1, en: "The bus leaves at seven.", vi: "Xe buýt chạy lúc 7 giờ." },
        { lv: 3, en: "I hardly ever eat breakfast because I'm always in a rush.", vi: "Mình hiếm khi ăn sáng vì lúc nào cũng vội." },
        { lv: 3, en: "Your sister calls your parents twice a week, doesn't she?", vi: "Chị bạn gọi cho bố mẹ 2 lần một tuần, phải không?" },
        { lv: 3, en: "Honestly, I don't know what to do with this information.", vi: "Thật lòng mình không biết làm gì với thông tin này." },
        { lv: 3, en: "These shoes are mine, but those over there aren't.", vi: "Đôi giày này là của mình, còn mấy đôi đằng kia thì không." },
        { lv: 3, en: "The coffee shop near my office opens at seven every morning.", vi: "Quán cà phê gần văn phòng mình mở cửa lúc 7 giờ mỗi sáng." },
        { lv: 3, en: "He goes to the gym every day, but he never eats healthy food.", vi: "Anh ấy đi tập gym mỗi ngày nhưng chẳng bao giờ ăn uống lành mạnh." }
      ]
    },
    {
      id: "np02",
      date: "2026-11-05",
      title: "NP02 - Đuôi \"s / es\"",
      level: "A2–B1",
      grammar: {
        t: "NP02 - Đuôi \"s / es\"",
        c: [
          { t: "Khi nào dùng?", c: [
            { t: "Danh từ số nhiều (đếm được)", c: ["a book -> two books"] },
            { t: "Chia động từ cho ngôi thứ 3 số ít", c: [
              "Ngôi thứ nhất = Người nói (I, we)",
              "Ngôi thứ hai = Người nghe (you)",
              "Ngôi thứ ba = Người được đề cập đến (he, she, it, Lan, my dog…)"
            ]},
            { t: "Sở hữu cách", c: [
              { t: "**'s** = Số ít (The cat**'s** tail) hoặc viết tắt của is / has (He**'s** nice)", c: ["Dinh Dinh's girlfriend"] },
              { t: "**s'** = Số nhiều đã có sẵn s (The cats**'** tails)", c: ["My parents' house"] }
            ]}
          ]},
          { t: "Thêm vào đuôi như thế nào cho đúng?", c: [
            { t: "Danh từ số nhiều (đếm được)", c: [
              { t: "Thêm **-es** khi kết thúc bằng -s, -ss, -sh, -ch, -x, -z", c: [
                "Bus -> Buses", "Class -> Classes", "Dish -> Dishes", "Watch -> Watches", "Box -> Boxes", "Quiz -> Quizzes",
                { t: "Có ngoại lệ", c: ["Stomach -> Stomachs", { t: "Vì -ch ở đây đọc là /k/, nên chỉ thêm -s", k: "tip" }] }
              ]},
              "Thêm **-s** vào đa số các case còn lại",
              { t: "Danh từ kết thúc = -y", c: [
                { t: "Phụ âm + \"y\" -> -ies", c: ["Party -> Parties", "Baby -> Babies", "Country -> Countries", { t: "Bản gốc: \"Parites\" → Parties", k: "fix" }] },
                { t: "Nguyên âm + \"y\" -> -s", c: ["Boy -> Boys", "Toy -> Toys", "Day -> Days"] }
              ]},
              { t: "Danh từ kết thúc = -f / -fe -> **-ves**", c: [
                "Wife -> Wives", "Knife -> Knives", "Leaf -> Leaves",
                { t: "Có ngoại lệ", c: ["Roof -> Roofs", "Chief -> Chiefs", "Belief -> Beliefs"] }
              ]}
            ]},
            { t: "Chia động từ cho ngôi thứ 3 số ít", c: [
              { t: "Thêm **-es** khi kết thúc bằng -s, -ss, -sh, -ch, -x, -z", c: ["Miss -> Misses", "Wash -> Washes", "Fix -> Fixes"] },
              "Thêm **-s** vào đa số các case còn lại",
              { t: "Động từ kết thúc = -y", c: [
                { t: "Phụ âm + \"y\" -> -ies", c: ["Study -> Studies", "Cry -> Cries"] },
                { t: "Nguyên âm + \"y\" -> -s", c: ["Play -> Plays"] }
              ]}
            ]}
          ]},
          { t: "Phát âm sao cho đúng?", c: [
            { t: "Phát âm **/s/**", c: ["Âm cuối vô thanh: /p/, /t/, /k/, /f/, /θ/", "Ví dụ: books, cats, cups, laughs, months"] },
            { t: "Phát âm **/ɪz/**", c: ["Âm cuối xuýt: /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/", "Ví dụ: buses, roses, dishes, garages, watches, judges"] },
            { t: "Phát âm **/z/**", c: ["Nguyên âm và các phụ âm hữu thanh còn lại", "Ví dụ: dogs, pens, rooms, plays, loves"] },
            { t: "Xét theo **âm** cuối, không theo chữ cái cuối: laugh kết thúc bằng âm /f/ nên laughs đọc /s/", k: "tip" }
          ]},
          { t: "Hay nhầm khi nói", k: "tip", c: [
            { t: "**'s** sở hữu khác **'s** viết tắt", c: ["Lan's phone = điện thoại của Lan", "Lan's busy = Lan is busy", "Lan's finished = Lan has finished"] },
            { t: "Chủ ngữ số nhiều → động từ **không** thêm s", c: ["My parents live in Da Lat. (không phải lives)"] },
            { t: "Sau does / doesn't / can / will → động từ nguyên mẫu", c: ["Does she work here? (không phải works)", "He can speak English. (không phải speaks)"] },
            { t: "Everyone / nobody / each → ngôi 3 số ít", c: ["Everyone loves this song."] },
            { t: "Số nhiều bất quy tắc — không thêm s", c: ["Child -> Children", "Person -> People", "Man -> Men"] }
          ]}
        ]
      },
      vocab: [
        { w: "bus", form: "buses", ipa: "/ˈbʌsɪz/", pos: "n", vi: "xe buýt", ex: "I usually take two buses to get to school.", exVi: "Mình thường đi hai chuyến xe buýt để đến trường." },
        { w: "class", form: "classes", ipa: "/ˈklɑːsɪz/", pos: "n", vi: "lớp học, tiết học", ex: "I've got back-to-back classes on Monday.", exVi: "Thứ Hai mình có mấy tiết học liền nhau.", alt: "lecture, session" },
        { w: "dish", form: "dishes", ipa: "/ˈdɪʃɪz/", pos: "n", vi: "cái đĩa; món ăn", ex: "It's your turn to do the dishes!", exVi: "Đến lượt bạn rửa bát rồi đấy!" },
        { w: "watch", form: "watches", ipa: "/ˈwɒtʃɪz/", pos: "v / n", vi: "xem; đồng hồ đeo tay", ex: "She watches K-dramas every night.", exVi: "Tối nào cô ấy cũng xem phim Hàn.", alt: "observe, view" },
        { w: "box", form: "boxes", ipa: "/ˈbɒksɪz/", pos: "n", vi: "cái hộp, thùng", ex: "Can you help me carry these boxes?", exVi: "Bạn giúp mình khiêng mấy cái thùng này được không?" },
        { w: "quiz", form: "quizzes", ipa: "/ˈkwɪzɪz/", pos: "n", vi: "bài kiểm tra ngắn", ex: "We have pop quizzes almost every week.", exVi: "Gần như tuần nào tụi mình cũng có bài kiểm tra đột xuất.", alt: "assessment, test" },
        { w: "stomach", form: "stomachs", ipa: "/ˈstʌməks/", pos: "n", vi: "cái bụng, dạ dày", ex: "My stomach hurts — I ate too much.", exVi: "Mình đau bụng quá — ăn nhiều quá.", alt: "abdomen" },
        { w: "party", form: "parties", ipa: "/ˈpɑːtiz/", pos: "n", vi: "bữa tiệc", ex: "Are you going to Minh's birthday party?", exVi: "Bạn có đi tiệc sinh nhật của Minh không?", alt: "celebration, gathering" },
        { w: "baby", form: "babies", ipa: "/ˈbeɪbiz/", pos: "n", vi: "em bé", ex: "My cousin just had a baby!", exVi: "Chị họ mình vừa sinh em bé!", alt: "infant" },
        { w: "country", form: "countries", ipa: "/ˈkʌntriz/", pos: "n", vi: "đất nước, quốc gia", ex: "How many countries have you been to?", exVi: "Bạn đã đi được bao nhiêu nước rồi?", alt: "nation" },
        { w: "toy", form: "toys", ipa: "/tɔɪz/", pos: "n", vi: "đồ chơi", ex: "My little brother's toys are everywhere.", exVi: "Đồ chơi của em trai mình bày khắp nơi." },
        { w: "wife", form: "wives", ipa: "/waɪvz/", pos: "n", vi: "vợ", ex: "He always listens to his wife.", exVi: "Anh ấy lúc nào cũng nghe lời vợ.", alt: "spouse" },
        { w: "knife", form: "knives", ipa: "/naɪvz/", pos: "n", vi: "con dao", ex: "Careful, those knives are really sharp.", exVi: "Cẩn thận, mấy con dao đó sắc lắm." },
        { w: "leaf", form: "leaves", ipa: "/liːvz/", pos: "n", vi: "chiếc lá", ex: "The leaves are turning yellow already.", exVi: "Lá đã bắt đầu ngả vàng rồi." },
        { w: "roof", form: "roofs", ipa: "/ruːfs/", pos: "n", vi: "mái nhà", ex: "We had drinks on the roof last night.", exVi: "Tối qua tụi mình ngồi uống nước trên sân thượng.", alt: "rooftop" },
        { w: "belief", form: "beliefs", ipa: "/bɪˈliːfs/", pos: "n", vi: "niềm tin, quan niệm", ex: "We respect each other's beliefs.", exVi: "Chúng tôi tôn trọng quan niệm của nhau.", alt: "conviction" },
        { w: "study", form: "studies", ipa: "/ˈstʌdiz/", pos: "v", vi: "học", ex: "She studies better at night.", exVi: "Cô ấy học vào buổi tối thì vào hơn.", alt: "pursue, examine" },
        { w: "laugh", form: "laughs", ipa: "/lɑːfs/", pos: "v", vi: "cười (thành tiếng)", ex: "He laughs at all my bad jokes.", exVi: "Mình kể chuyện cười dở đến mấy anh ấy cũng cười." },
        { w: "judge", form: "judges", ipa: "/ˈdʒʌdʒɪz/", pos: "n / v", vi: "giám khảo; đánh giá", ex: "Don't judge people too fast.", exVi: "Đừng vội đánh giá người khác.", alt: "assess, evaluate" }
      ],
      quiz: [
        { lv: 1, q: "I have three ___ in my bag.", a: "boxes", opts: ["boxs", "boxies", "box"], ex: "box tận cùng -x → thêm -es." },
        { lv: 1, q: "There are many beautiful ___ in Southeast Asia.", a: "countries", opts: ["countrys", "countryes", "country"], ex: "Phụ âm (r) + y → bỏ y, thêm -ies." },
        { lv: 1, q: "The kids left their ___ all over the floor.", a: "toys", opts: ["toies", "toyes", "toy"], ex: "Nguyên âm (o) + y → chỉ thêm -s." },
        { lv: 1, q: "Be careful with those ___!", a: "knives", opts: ["knifes", "knifies", "knive"], ex: "-fe → -ves." },
        { lv: 1, q: "My brother ___ TV every evening.", a: "watches", opts: ["watchs", "watch", "watchies"], ex: "Ngôi 3 số ít (my brother), watch tận cùng -ch → -es." },
        { lv: 1, q: "She ___ English at university.", a: "studies", opts: ["studys", "study", "studyes"], ex: "Ngôi 3 số ít, phụ âm + y → -ies." },
        { lv: 1, q: "I ___ badminton with my friends on Saturdays.", a: "play", opts: ["plays", "playes", "plaies"], ex: "Chủ ngữ I là ngôi thứ nhất → không thêm s." },
        { lv: 1, q: "We have two ___ (class) on Monday morning.", a: "classes", opts: [], ex: "-ss → thêm -es." },
        { lv: 1, q: "In autumn, the ___ (leaf) turn yellow.", a: "leaves", opts: [], ex: "-f → -ves." },
        { lv: 1, q: "Đuôi s trong \"books\" đọc là ___", a: "/s/", opts: ["/z/", "/ɪz/"], ex: "Âm cuối /k/ vô thanh → /s/." },
        { lv: 1, q: "Đuôi s trong \"pens\" đọc là ___", a: "/z/", opts: ["/s/", "/ɪz/"], ex: "Âm cuối /n/ hữu thanh → /z/." },
        { lv: 1, q: "Đuôi es trong \"dishes\" đọc là ___", a: "/ɪz/", opts: ["/s/", "/z/"], ex: "Âm cuối /ʃ/ là âm xuýt → /ɪz/." },
        { lv: 1, q: "Is this Lan___ phone? (của Lan)", a: "'s", opts: ["s'", "s", "es"], ex: "Lan là số ít → sở hữu dùng 's." },

        { lv: 2, q: "The old houses in Hoi An have yellow ___.", a: "roofs", opts: ["rooves", "roofes", "roofies"], ex: "roof là ngoại lệ của -f: chỉ thêm -s." },
        { lv: 2, q: "We had dinner at my ___ house last night. (nhà của bố mẹ tôi)", a: "parents'", opts: ["parent's", "parents's", "parents"], ex: "parents đã có s (số nhiều) → chỉ thêm dấu '." },
        { lv: 2, q: "Đuôi s trong \"laughs\" đọc là ___", a: "/s/", opts: ["/z/", "/ɪz/"], ex: "laugh kết thúc bằng ÂM /f/ (vô thanh) → /s/. Xét âm, không xét chữ gh." },
        { lv: 2, q: "Đuôi es trong \"garages\" đọc là ___", a: "/ɪz/", opts: ["/s/", "/z/"], ex: "Âm cuối /ʒ/ hoặc /dʒ/ là âm xuýt → /ɪz/." },
        { lv: 2, q: "Từ nào có đuôi s đọc KHÁC các từ còn lại?", a: "cats", opts: ["dogs", "rooms", "loves"], ex: "cats đọc /s/ (âm /t/ vô thanh); dogs, rooms, loves đọc /z/." },
        { lv: 2, q: "My little sister ___ (cry) every time she gets a shot.", a: "cries", opts: [], ex: "Ngôi 3 số ít, phụ âm + y → -ies." },

        { lv: 3, q: "A: \"Does she ___ near here?\" — B: \"Yeah, just around the corner.\"", a: "live", opts: ["lives", "living", "lived"], ex: "Sau does → động từ nguyên mẫu. Chữ s đã nằm ở does rồi." },
        { lv: 3, q: "My parents ___ in Da Lat, but my sister ___ in Saigon.", a: "live / lives", opts: ["lives / live", "live / live", "lives / lives"], ex: "parents số nhiều → live; my sister ngôi 3 số ít → lives." },
        { lv: 3, q: "\"Lan's coming with us tonight.\" — 's ở đây là ___", a: "is (Lan is coming)", opts: ["sở hữu (của Lan)", "has (Lan has coming)", "đuôi số nhiều"], ex: "Sau 's là V-ing → 's = is. Nếu sau là V3 (Lan's finished) thì 's = has." },
        { lv: 3, q: "A: \"Whose bags are these?\" — B: \"They're the ___ bags.\" (túi của các học sinh)", a: "students'", opts: ["student's", "students's", "students"], ex: "Nhiều học sinh → students (đã có s) → thêm ' thành students'." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "Everyone in my class watches Netflix.", opts: ["Everyone in my class watch Netflix.", "My friends watches Netflix every night.", "He don't watch Netflix."], ex: "Everyone là ngôi 3 số ít → watches. My friends số nhiều → watch. He → doesn't." },
        { lv: 3, q: "A: \"Where are the kids?\" — B: \"The ___ (child) are playing in the park.\"", a: "children", opts: [], ex: "child → children: số nhiều bất quy tắc, không thêm s (không viết childs / childrens)." }
      ],
      speak: [
        { lv: 1, en: "She watches movies on Sundays.", vi: "Cô ấy xem phim vào Chủ nhật. (watches /ɪz/)" },
        { lv: 1, en: "My brother likes cats and dogs.", vi: "Anh tôi thích chó và mèo. (likes /s/, cats /s/, dogs /z/)" },
        { lv: 1, en: "The buses are full today.", vi: "Hôm nay xe buýt đầy người. (buses /ɪz/)" },
        { lv: 1, en: "He plays the guitar at night.", vi: "Anh ấy chơi guitar buổi tối. (plays /z/)" },
        { lv: 3, en: "My parents' house is about two hours from the city, so I only go back on weekends.", vi: "Nhà bố mẹ tôi cách thành phố khoảng hai tiếng nên tôi chỉ về vào cuối tuần." },
        { lv: 3, en: "She studies so hard that she misses most of the parties.", vi: "Cô ấy học chăm đến mức bỏ lỡ hầu hết các bữa tiệc." },
        { lv: 3, en: "Honestly, the judges loved the babies' costumes more than the dancers' songs.", vi: "Thật lòng mà nói, giám khảo thích trang phục của các em bé hơn bài hát của các vũ công." },
        { lv: 3, en: "He fixes old watches and sells them to tourists at the night market.", vi: "Anh ấy sửa đồng hồ cũ và bán cho khách du lịch ở chợ đêm." },
        { lv: 3, en: "Lan's coming later because she still has to wash the dishes.", vi: "Lan sẽ đến sau vì cô ấy vẫn phải rửa bát." },
        { lv: 3, en: "Our teacher gives us quizzes every week, and nobody really likes them.", vi: "Cô giáo cho chúng tôi kiểm tra ngắn mỗi tuần, và chẳng ai thích cả." }
      ]
    },
    {
      id: "np03",
      date: "2026-11-09",
      title: "NP03 - Quá khứ đơn và Hiện tại hoàn thành",
      level: "B1",
      grammar: {
        t: "NP03 - Quá khứ đơn và Hiện tại hoàn thành",
        c: [
          { t: "Tổng quan", c: [
            { t: "Quá khứ đơn", c: [
              { t: "Nhấn mạnh hành động, sự vật đã bắt đầu và đã kết thúc ở quá khứ (thời điểm xác định)", c: [
                { t: "Bản gốc ghi \"thời điểm 0 xác định\" — quá khứ đơn đi với thời điểm **xác định**: yesterday, last week, in 2022, two days ago", k: "fix" }
              ]},
              { t: "Hiểu đơn giản", c: ["Kể lại việc đã xảy ra rồi thôi → Hết → Không còn liên quan đến hiện tại"] },
              { t: "Ví dụ", c: [
                "I lived in Hue for two years. (Mình từng sống ở Huế 2 năm — giờ không còn sống ở đó.)",
                "I was a terrorist in that game. (Ván game đó mình chơi phe khủng bố.)",
                { t: "Bản gốc: \"I was a terrorism\" → terrorism = chủ nghĩa khủng bố; chỉ người phải là **terrorist**", k: "fix" }
              ]},
              "Công thức: S + V2/ed"
            ]},
            { t: "Hiện tại hoàn thành", c: [
              { t: "Nhấn mạnh kết quả, trải nghiệm hoặc sự việc bắt đầu trong quá khứ nhưng vẫn có liên hệ với hiện tại", c: ["Bắt đầu ở quá khứ và vẫn còn ở hiện tại = Chưa kết thúc"] },
              { t: "Hiểu đơn giản", c: ["Kể lại việc ở quá khứ và muốn nhấn mạnh rằng việc đó có ảnh hưởng, tác động đến hiện tại"] },
              { t: "Ví dụ", c: [
                "I have lived in Saigon for five years. (Mình sống ở Sài Gòn được 5 năm rồi — vẫn đang sống.)",
                { t: "Bản gốc: \"I have been a terrorism\" → sai từ (terrorism); đã thay bằng ví dụ đời thường", k: "fix" }
              ]},
              "Công thức: S + have / has + V3/ed"
            ]}
          ]},
          { t: "Một mối quan hệ đặc biệt: Present Perfect → Past Simple", c: [
            { t: "Khi nói lần đầu về một trải nghiệm, ta thường dùng Present Perfect. Khi hỏi thời gian của trải nghiệm, chuyển sang Past Simple.", c: [
              "A: Have you ever visited Japan?",
              "B: Yes, I have.",
              "A: When did you go?",
              "B: I went there in 2022.",
              { t: "VD 2", c: ["A: Have you ever studied at Indo?", "B: Yes, I studied there last year."] }
            ]},
            { t: "Giải thích", c: [
              "Have you ever visited…? → Hỏi trải nghiệm tính đến hiện tại.",
              "When did you go? → Hỏi một thời điểm cụ thể trong quá khứ."
            ]},
            { t: "Dấu hiệu: yesterday, last…, …ago, in 2022 → Quá khứ đơn · ever, never, already, yet, just, since, for → Hiện tại hoàn thành", k: "tip" }
          ]}
        ]
      },
      quiz: [
        { lv: 1, q: "I ___ to Da Lat last summer.", a: "went", opts: ["have gone", "go", "have went"], ex: "last summer = thời điểm xác định → Quá khứ đơn." },
        { lv: 1, q: "She ___ in Hanoi since 2020.", a: "has lived", opts: ["lived", "lives", "is live"], ex: "since 2020 → bắt đầu ở quá khứ, vẫn còn → Hiện tại hoàn thành." },
        { lv: 1, q: "Have you ever ___ sushi?", a: "eaten", opts: ["ate", "eat", "eating"], ex: "Have + V3: eat – ate – eaten." },
        { lv: 1, q: "We ___ that movie yesterday.", a: "watched", opts: ["have watched", "watch", "watching"], ex: "yesterday → Quá khứ đơn." },
        { lv: 1, q: "I ___ my homework yet.", a: "haven't finished", opts: ["didn't finish", "don't finish", "hasn't finished"], ex: "yet (câu phủ định) → Hiện tại hoàn thành; I → haven't." },
        { lv: 1, q: "A: When ___ you arrive? — B: At 9 p.m.", a: "did", opts: ["have", "do", "has"], ex: "Hỏi thời điểm cụ thể (When…?) → Quá khứ đơn: did." },
        { lv: 1, q: "They ___ (buy) a new car two weeks ago.", a: "bought", opts: [], ex: "two weeks ago → Quá khứ đơn: buy – bought." },
        { lv: 1, q: "He ___ (just / call) me.", a: "has just called/'s just called", opts: [], ex: "just → Hiện tại hoàn thành: has just called." },
        { lv: 1, q: "Công thức Hiện tại hoàn thành là ___", a: "S + have/has + V3/ed", opts: ["S + V2/ed", "S + was/were + V-ing", "S + had + V3/ed"], ex: "Hiện tại hoàn thành: have/has + V3." },
        { lv: 1, q: "Từ nào thường đi với Quá khứ đơn?", a: "yesterday", opts: ["since", "ever", "yet"], ex: "yesterday = thời điểm xác định trong quá khứ." },

        { lv: 2, q: "I ___ this teacher for three years, and I still love her classes.", a: "have known", opts: ["knew", "know", "had known"], ex: "for three years + vẫn còn (still) → Hiện tại hoàn thành." },
        { lv: 2, q: "A: Have you seen my phone? — B: Yes, I ___ it on the table a minute ago.", a: "saw", opts: ["have seen", "see", "had seen"], ex: "a minute ago → thời điểm xác định → Quá khứ đơn." },
        { lv: 2, q: "I ___ to three concerts this year.", a: "have been", opts: ["went", "go", "was"], ex: "this year chưa kết thúc → Hiện tại hoàn thành." },
        { lv: 2, q: "She ___ in Saigon from 2015 to 2019.", a: "lived", opts: ["has lived", "lives", "has been living"], ex: "from 2015 to 2019 = đã kết thúc → Quá khứ đơn." },
        { lv: 2, q: "Câu nào hỏi về TRẢI NGHIỆM?", a: "Have you ever tried bánh xèo?", opts: ["Did you try bánh xèo yesterday?", "Do you try bánh xèo?", "Were you trying bánh xèo?"], ex: "Have you ever + V3 → hỏi trải nghiệm tính đến hiện tại." },

        { lv: 3, q: "A: Have you ever been to Japan? — B: Yes, I ___ there in 2022.", a: "went", opts: ["have gone", "have been", "go"], ex: "Trả lời thời điểm cụ thể (in 2022) → chuyển sang Quá khứ đơn." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "I have lived here since 2019.", opts: ["I have lived here in 2019.", "I live here since 2019.", "I lived here since 2019."], ex: "since + mốc → Hiện tại hoàn thành; in 2019 thì phải dùng Quá khứ đơn." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "I saw that movie last week.", opts: ["I have seen that movie last week.", "I have saw that movie last week.", "I seen that movie last week."], ex: "last week → Quá khứ đơn; không dùng Hiện tại hoàn thành với thời điểm xác định." },
        { lv: 3, q: "\"I was a teacher for five years.\" nghĩa là ___", a: "Bây giờ không còn làm giáo viên nữa", opts: ["Bây giờ vẫn đang làm giáo viên", "Sắp làm giáo viên", "Chưa từng làm giáo viên"], ex: "Quá khứ đơn = đã kết thúc. Nếu vẫn đang làm: I have been a teacher for five years." },
        { lv: 3, q: "A: How long ___ you ___ each other? — B: Since high school.", a: "have / known", opts: ["did / know", "do / know", "have / knew"], ex: "How long… since → Hiện tại hoàn thành: have known." }
      ],
      speak: [
        { lv: 1, en: "I went to the beach last weekend.", vi: "Cuối tuần trước mình đi biển." },
        { lv: 1, en: "Have you ever been to Japan?", vi: "Bạn đã từng đến Nhật chưa?" },
        { lv: 1, en: "She has lived here since 2020.", vi: "Cô ấy sống ở đây từ năm 2020." },
        { lv: 1, en: "I haven't finished my homework yet.", vi: "Mình chưa làm xong bài tập." },
        { lv: 3, en: "I've been to Da Nang twice, but I went there for work both times.", vi: "Mình đến Đà Nẵng 2 lần rồi, nhưng cả 2 lần đều đi công tác." },
        { lv: 3, en: "Have you ever tried durian? I tried it last summer and loved it.", vi: "Bạn ăn sầu riêng bao giờ chưa? Mình ăn hè năm ngoái và mê luôn." },
        { lv: 3, en: "We've known each other since high school, so we're really close.", vi: "Tụi mình quen nhau từ hồi cấp 3 nên rất thân." },
        { lv: 3, en: "I lost my phone yesterday, and I still haven't found it.", vi: "Hôm qua mình làm mất điện thoại, và vẫn chưa tìm thấy." },
        { lv: 3, en: "She hasn't called me since she moved to Singapore.", vi: "Từ khi chuyển sang Singapore, cô ấy chưa gọi cho mình lần nào." },
        { lv: 3, en: "How long have you worked at this company?", vi: "Bạn làm ở công ty này được bao lâu rồi?" }
      ]
    },
    {
      id: "np03-02",
      date: "2026-11-09",
      title: "NP03.02 - Đuôi \"ed\" - V3",
      level: "A2–B1",
      grammar: {
        t: "NP03.02 - Đuôi \"ed\" - V3",
        c: [
          { t: "Tổng quan các dạng động từ", c: [
            "V0 → Không to, không chia, không ing, không làm gì cả (dùng sau do/does, can, will…)",
            "V1 → Nguyên mẫu, base form (cột 1 trong bảng động từ)",
            "V2 → Past simple (quá khứ đơn)",
            { t: "V3 → Past participle (quá khứ phân từ)", c: [
              { t: "Bản gốc: \"Past participant\" → thuật ngữ đúng là \"Past **participle**\"", k: "fix" }
            ]}
          ]},
          { t: "Động từ có quy tắc", c: [
            { t: "V2 = V3 (thêm -ed)", c: [
              { t: "Thông thường thêm -ed", c: ["Work -> Worked", "Touch -> Touched"] },
              { t: "Kết thúc bằng -e, thêm -d", c: ["Live -> Lived"] },
              { t: "Phụ âm + y → -ied", c: ["Study -> Studied"] },
              { t: "Nguyên âm + y → -ed", c: ["Play -> Played"] },
              { t: "Gấp đôi phụ âm cuối trong một số trường hợp (xem nhánh 5)", c: [
                "Stop -> Stopped", "Plan -> Planned",
                { t: "Có ngoại lệ", c: ["Visit -> Visited", "Open -> Opened"] }
              ]}
            ]}
          ]},
          { t: "Động từ bất quy tắc", c: [
            { t: "V1 = V2 = V3", c: ["Let - Let - Let", "Put - Put - Put", "Hurt - Hurt - Hurt"] },
            { t: "V2 = V3, khác V1", c: [
              "Think - Thought - Thought", "Buy - Bought - Bought", "Sleep - Slept - Slept", "Teach - Taught - Taught",
              { t: "Bản gốc có Touch / Watch / Walk ở nhóm này — đây là động từ **có quy tắc** (touched, watched, walked); đã thay bằng ví dụ bất quy tắc", k: "fix" }
            ]},
            { t: "V1 = V3, khác V2", c: ["Come - Came - Come", "Run - Ran - Run", "Become - Became - Become"] },
            { t: "V1 khác V2 khác V3", c: ["Do - Did - Done", "See - Saw - Seen", "Go - Went - Gone", "Eat - Ate - Eaten", "Write - Wrote - Written"] }
          ]},
          { t: "Phát âm như nào cho đúng?", c: [
            { t: "Phát âm **/ɪd/**", c: ["Sau âm /t/, /d/", "Ví dụ: wanted, needed, decided"] },
            { t: "Phát âm **/t/**", c: ["Sau âm vô thanh (trừ /t/): /p/, /k/, /f/, /s/, /ʃ/, /tʃ/", "Ví dụ: worked, watched, laughed"] },
            { t: "Phát âm **/d/**", c: ["Sau nguyên âm hoặc âm hữu thanh (trừ /d/)", "Ví dụ: played, cleaned, loved"] }
          ]},
          { t: "Gấp đôi phụ âm cuối", c: [
            { t: "Động từ 1 âm tiết", c: [
              { t: "Kết thúc bằng 1 nguyên âm + 1 phụ âm → **gấp đôi**", c: ["Stop -> Stopped", "Plan -> Planned", "Shop -> Shopped"] },
              { t: "**Không** gấp đôi khi:", c: [
                { t: "Kết thúc bằng 2 phụ âm (r + k, l + p…)", c: ["Work -> Worked", "Help -> Helped"] },
                { t: "Có 2 nguyên âm trước phụ âm cuối (a + i…)", c: ["Rain -> Rained"] },
                { t: "Kết thúc bằng y, x, w", c: ["Play -> Played", "Fix -> Fixed", "Snow -> Snowed"] }
              ]},
              { t: "Bản gốc xếp work, help, rain, play, fix, snow dưới \"Gấp đôi phụ âm cuối\" — đây là các trường hợp **không** gấp đôi; đã tách thành 2 nhóm", k: "fix" }
            ]},
            { t: "Động từ 2 âm tiết trở lên", c: [
              { t: "Trọng âm ở âm tiết cuối + kết thúc bằng 1 nguyên âm + 1 phụ âm → **gấp đôi**", c: [
                "Prefer -> Preferred", "Admit -> Admitted", "Begin -> Beginning",
                { t: "begin là động từ bất quy tắc (began – begun), chỉ gấp đôi khi thêm -ing: beginning", k: "tip" }
              ]},
              { t: "Trọng âm **không** ở âm tiết cuối → không gấp đôi", c: [
                "Offer -> Offered", "Open -> Opened", "Visit -> Visited",
                { t: "Bản gốc: \"Opended\" → Opened", k: "fix" }
              ]}
            ]},
            { t: "Ngoại lệ cần biết", c: [
              { t: "Anh Anh gấp đôi -l, Anh Mỹ thì không", c: [
                "Travelled (UK) – Traveled (US)",
                "Cancelled (UK) – Canceled (US)",
                "Labelled (UK) – Labeled (US)",
                "Modelled (UK) – Modeled (US)"
              ]}
            ]}
          ]}
        ]
      },
      quiz: [
        { lv: 1, q: "Yesterday I ___ until 10 p.m.", a: "worked", opts: ["work", "works", "workked"], ex: "work → worked (2 phụ âm cuối r + k, không gấp đôi)." },
        { lv: 1, q: "She ___ English at university.", a: "studied", opts: ["studyed", "studies", "studed"], ex: "Phụ âm + y → -ied: studied." },
        { lv: 1, q: "We ___ football after school yesterday.", a: "played", opts: ["plaied", "playd", "plays"], ex: "Nguyên âm + y → -ed: played." },
        { lv: 1, q: "The bus ___ suddenly.", a: "stopped", opts: ["stoped", "stopt", "stops"], ex: "1 âm tiết, 1 nguyên âm + 1 phụ âm → gấp đôi: stopped." },
        { lv: 1, q: "V2 của \"go\" là ___", a: "went", opts: ["goed", "gone", "go"], ex: "go – went – gone." },
        { lv: 1, q: "V3 của \"eat\" là ___", a: "eaten", opts: ["ate", "eated", "eat"], ex: "eat – ate – eaten." },
        { lv: 1, q: "V2 của \"buy\" là ___ (gõ đáp án)", a: "bought", opts: [], ex: "buy – bought – bought." },
        { lv: 1, q: "V3 của \"write\" là ___ (gõ đáp án)", a: "written", opts: [], ex: "write – wrote – written." },
        { lv: 1, q: "Đuôi -ed trong \"wanted\" đọc là ___", a: "/ɪd/", opts: ["/t/", "/d/"], ex: "Sau âm /t/ → /ɪd/." },
        { lv: 1, q: "Đuôi -ed trong \"played\" đọc là ___", a: "/d/", opts: ["/t/", "/ɪd/"], ex: "Sau nguyên âm → /d/." },

        { lv: 2, q: "Đuôi -ed trong \"laughed\" đọc là ___", a: "/t/", opts: ["/d/", "/ɪd/"], ex: "laugh kết thúc bằng âm /f/ (vô thanh) → /t/." },
        { lv: 2, q: "Động từ nào có V1 = V2 = V3?", a: "put", opts: ["run", "come", "see"], ex: "put – put – put." },
        { lv: 2, q: "Từ nào viết ĐÚNG?", a: "preferred", opts: ["prefered", "preferd", "preferrd"], ex: "preFER: trọng âm ở âm tiết cuối → gấp đôi r." },
        { lv: 2, q: "Từ nào viết ĐÚNG?", a: "visited", opts: ["visitted", "visitied", "visted"], ex: "VIsit: trọng âm không ở âm tiết cuối → không gấp đôi." },
        { lv: 2, q: "Run – ___ – Run", a: "Ran", opts: ["Runned", "Rang", "Run"], ex: "run – ran – run (V1 = V3)." },

        { lv: 3, q: "A: Did you go out last night? — B: No, I ___ at home and ___ a movie.", a: "stayed / watched", opts: ["staied / watched", "stayed / watch", "stay / watched"], ex: "stay → stayed (nguyên âm + y); watch → watched." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "I've already eaten lunch.", opts: ["I've already ate lunch.", "I've already eat lunch.", "I've already eated lunch."], ex: "have + V3: eaten." },
        { lv: 3, q: "Từ nào có đuôi -ed đọc KHÁC các từ còn lại?", a: "needed", opts: ["cleaned", "loved", "played"], ex: "needed /ɪd/; cleaned, loved, played đều /d/." },
        { lv: 3, q: "Our flight was ___ because of the storm. (Anh Mỹ)", a: "canceled", opts: ["cancelled", "canceld", "cancaled"], ex: "Anh Mỹ: canceled (1 chữ l). Anh Anh: cancelled." },
        { lv: 3, q: "She has ___ (become) a really good cook.", a: "become", opts: [], ex: "become – became – become; has + V3 = become." }
      ],
      speak: [
        { lv: 1, en: "I worked late yesterday.", vi: "Hôm qua mình làm muộn. (worked /t/)" },
        { lv: 1, en: "She studied all night.", vi: "Cô ấy học cả đêm. (studied /d/)" },
        { lv: 1, en: "We played football after school.", vi: "Tụi mình đá bóng sau giờ học. (played /d/)" },
        { lv: 1, en: "He stopped and waited.", vi: "Anh ấy dừng lại và chờ. (stopped /t/, waited /ɪd/)" },
        { lv: 3, en: "I wanted to call you, but I needed to finish my work first.", vi: "Mình muốn gọi bạn nhưng phải làm xong việc trước." },
        { lv: 3, en: "We cleaned the house, cooked dinner and watched a movie.", vi: "Tụi mình dọn nhà, nấu bữa tối rồi xem phim." },
        { lv: 3, en: "I've already eaten, but thanks for asking.", vi: "Mình ăn rồi, nhưng cảm ơn đã hỏi nhé." },
        { lv: 3, en: "She preferred to stay home, so we canceled our plans.", vi: "Cô ấy thích ở nhà hơn nên tụi mình huỷ kế hoạch." },
        { lv: 3, en: "He laughed so hard that he dropped his phone.", vi: "Anh ấy cười nhiều đến nỗi làm rơi điện thoại." },
        { lv: 3, en: "I thought you had forgotten, but you came anyway.", vi: "Mình tưởng bạn quên rồi, vậy mà bạn vẫn đến." }
      ]
    },
    {
      id: "np04",
      date: "2026-11-12",
      title: "NP04 - Quá khứ tiếp diễn và Quá khứ hoàn thành",
      level: "B1",
      grammar: {
        t: "NP04 - Quá khứ tiếp diễn và Quá khứ hoàn thành",
        c: [
          { t: "1. PAST CONTINUOUS (Quá khứ tiếp diễn)", c: [
            { t: "1.1. Công thức", c: ["(+) S + was/were + V-ing", "(-) S + was/were + not + V-ing", "(?) Was/Were + S + V-ing?"] },
            { t: "1.2. Cách dùng", c: ["Đang diễn ra tại một thời điểm trong quá khứ", "Hành động đang diễn ra thì hành động khác xen vào", "Hai hành động đang diễn ra song song"] },
            { t: "1.3. Dấu hiệu", c: ["Thời gian cụ thể trong quá khứ (at 8 p.m. yesterday)", "At that time", "While", "Then"] },
            { t: "1.4. Ví dụ", c: ["I was studying at 8 p.m. yesterday.", "I was sleeping when she called.", "My mom was cooking while my dad was watching TV."] }
          ]},
          { t: "2. PAST PERFECT (Quá khứ hoàn thành)", c: [
            { t: "2.1. Công thức", c: ["(+) S + had + V3/ed", "(-) S + had not (hadn't) + V3/ed", "(?) Had + S + V3/ed?"] },
            { t: "2.2. Cách dùng", c: ["Hành động xảy ra trước một mốc quá khứ", "Hành động hoàn thành trước hành động khác", "Giải thích nguyên nhân của tình huống trong quá khứ"] },
            { t: "2.3. Dấu hiệu", c: ["before", "after", "by the time", "already"] },
            { t: "2.4. Ví dụ", c: ["I had finished dinner before 8 p.m. yesterday.", "I had prepared all the knowledge by the time the teacher handed out the papers.", "I couldn't get in because I had lost my keys."] }
          ]},
          { t: "3. MỐI QUAN HỆ", c: [
            "Past Continuous: nhấn mạnh quá trình đang diễn ra",
            "Past Perfect: nhấn mạnh xảy ra trước một mốc quá khứ",
            { t: "Thay đổi thì → Ý nghĩa về thời gian khác nhau", c: [
              "When I arrived, she was eating. (cô ấy đang ăn)",
              "When I arrived, she had eaten. (cô ấy đã ăn xong trước đó)"
            ]}
          ]},
          { t: "4. SO SÁNH VỚI PAST SIMPLE", c: [
            "Past Simple: S + V2/ed → đã xảy ra",
            "Past Continuous: S + was/were + V-ing → đang diễn ra lúc đó",
            "Past Perfect: S + had + V3/ed → đã xảy ra trước đó"
          ]},
          { t: "5. LƯU Ý", c: [
            { t: "When / while không tự động quyết định thì", c: ["When she called, I was sleeping. (đang ngủ thì cô ấy gọi)", "When she called, I answered. (cô ấy gọi rồi mình mới nghe)"] },
            { t: "Before / after không bắt buộc dùng Past Perfect", c: ["I had dinner before I went out. (before đã cho biết thứ tự, dùng Past Simple vẫn đúng)"] },
            "Thứ tự sự việc phụ thuộc ngữ cảnh"
          ]}
        ]
      },
      quiz: [
        { lv: 1, q: "I ___ TV at 8 p.m. yesterday.", a: "was watching", opts: ["watched", "am watching", "had watched"], ex: "Đang diễn ra tại thời điểm cụ thể trong quá khứ → Quá khứ tiếp diễn." },
        { lv: 1, q: "They ___ football when it started to rain.", a: "were playing", opts: ["was playing", "played", "are playing"], ex: "Đang diễn ra thì việc khác xen vào; they → were." },
        { lv: 1, q: "___ you sleeping when I called?", a: "Were", opts: ["Was", "Did", "Had"], ex: "Câu hỏi Quá khứ tiếp diễn: Were + you + V-ing?" },
        { lv: 1, q: "She ___ dinner before I arrived.", a: "had cooked", opts: ["has cooked", "was cook", "cooks"], ex: "Xảy ra trước một hành động khác trong quá khứ → had + V3." },
        { lv: 1, q: "By the time we got there, the movie ___.", a: "had started", opts: ["started already", "has started", "was start"], ex: "by the time + quá khứ → Quá khứ hoàn thành." },
        { lv: 1, q: "Công thức Quá khứ hoàn thành là ___", a: "S + had + V3/ed", opts: ["S + was/were + V-ing", "S + have/has + V3/ed", "S + V2/ed"], ex: "Past Perfect: had + V3." },
        { lv: 1, q: "Từ nào là dấu hiệu của Quá khứ tiếp diễn?", a: "while", opts: ["already", "by the time", "before"], ex: "while = trong khi (đang)…" },
        { lv: 1, q: "I ___ (not / sleep) when you called. I was reading.", a: "wasn't sleeping/was not sleeping", opts: [], ex: "I + wasn't + V-ing." },
        { lv: 1, q: "He ___ (already / leave) when I arrived.", a: "had already left", opts: [], ex: "already + xảy ra trước → had already left." },
        { lv: 1, q: "While I ___ a shower, the doorbell rang.", a: "was taking", opts: ["took", "had taken", "am taking"], ex: "while + hành động đang diễn ra → was taking." },

        { lv: 2, q: "\"When I arrived, she was eating.\" nghĩa là ___", a: "Lúc mình đến, cô ấy đang ăn", opts: ["Cô ấy ăn xong trước khi mình đến", "Cô ấy ăn sau khi mình đến", "Cô ấy sẽ ăn"], ex: "was eating = đang ăn vào lúc đó." },
        { lv: 2, q: "\"When I arrived, she had eaten.\" nghĩa là ___", a: "Cô ấy đã ăn xong trước khi mình đến", opts: ["Lúc mình đến cô ấy đang ăn", "Cô ấy ăn sau khi mình đến", "Cô ấy chưa ăn"], ex: "had eaten = đã xong trước mốc 'when I arrived'." },
        { lv: 2, q: "My mom ___ while my dad ___ the dishes.", a: "was cooking / was washing", opts: ["cooked / was washing", "was cooking / had washed", "had cooked / washed"], ex: "Hai hành động song song → cả hai dùng Quá khứ tiếp diễn." },
        { lv: 2, q: "I couldn't get in because I ___ my keys.", a: "had lost", opts: ["was losing", "have lost", "lose"], ex: "Giải thích nguyên nhân trong quá khứ → Quá khứ hoàn thành." },
        { lv: 2, q: "At 10 p.m. last night, we ___ for the exam.", a: "were studying", opts: ["had studied", "studied", "are studying"], ex: "Thời điểm cụ thể (at 10 p.m. last night) → đang làm → Quá khứ tiếp diễn." },

        { lv: 3, q: "A: Why were you so tired yesterday? — B: I ___ well the night before.", a: "hadn't slept", opts: ["wasn't sleeping", "haven't slept", "didn't sleeping"], ex: "Nguyên nhân xảy ra trước 'yesterday' → hadn't slept." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "I was walking home when I saw an accident.", opts: ["I walked home when I was seeing an accident.", "I had walked home when I was seeing an accident.", "I was walk home when I saw an accident."], ex: "Đang đi (was walking) thì nhìn thấy (saw) xen vào." },
        { lv: 3, q: "A: Did you catch the bus? — B: No, it ___ when I got to the stop.", a: "had already left", opts: ["was already leaving", "already leaves", "has already left"], ex: "Xe đi trước khi mình đến → had already left." },
        { lv: 3, q: "After she ___ her homework, she went out with friends.", a: "finished/had finished", opts: ["was finishing", "has finished", "finishes"], ex: "After đã cho biết thứ tự → finished hoặc had finished đều đúng." },
        { lv: 3, q: "A: What were you doing when the lights went out? — B: I ___ a shower.", a: "was taking", opts: ["took", "had taken", "have taken"], ex: "Đang làm gì khi việc khác xen vào → Quá khứ tiếp diễn." }
      ],
      speak: [
        { lv: 1, en: "I was studying at eight last night.", vi: "8 giờ tối qua mình đang học bài." },
        { lv: 1, en: "She was sleeping when I called.", vi: "Lúc mình gọi thì cô ấy đang ngủ." },
        { lv: 1, en: "We had finished dinner before eight.", vi: "Tụi mình ăn tối xong trước 8 giờ." },
        { lv: 1, en: "They were playing football in the rain.", vi: "Họ đang đá bóng dưới mưa." },
        { lv: 3, en: "I was walking home when I saw an old friend from high school.", vi: "Mình đang đi bộ về nhà thì gặp một người bạn cũ hồi cấp 3." },
        { lv: 3, en: "By the time we got to the cinema, the movie had already started.", vi: "Lúc tụi mình tới rạp thì phim đã chiếu rồi." },
        { lv: 3, en: "While my mom was cooking, my dad was watching the news.", vi: "Trong lúc mẹ nấu ăn thì bố đang xem thời sự." },
        { lv: 3, en: "I couldn't get in because I had left my keys at the office.", vi: "Mình không vào nhà được vì để quên chìa khoá ở văn phòng." },
        { lv: 3, en: "When I arrived, everyone had already eaten, so I ordered a pizza.", vi: "Lúc mình đến thì mọi người ăn xong rồi, nên mình gọi pizza." },
        { lv: 3, en: "What were you doing at ten o'clock last night?", vi: "10 giờ tối qua bạn đang làm gì?" }
      ]
    },
    {
      id: "np05",
      date: "2026-11-16",
      title: "NP05 - Các cách nói tương lai (will, going to, hiện tại tiếp diễn)",
      level: "B1",
      grammar: {
        t: "NP05 - Các cách nói tương lai",
        c: [
          { t: "1. WILL (Sẽ)", c: [
            { t: "1.1. Công thức", c: ["(+) S + will + V", "(-) S + will not (won't) + V", "(?) Will + S + V?"] },
            { t: "1.2. Cách dùng", c: ["Quyết định tức thời, ngay tại lúc nói", "Lời hứa, lời đề nghị, lời đe dọa", "Dự đoán dựa trên ý kiến cá nhân, không có bằng chứng rõ ràng"] },
            { t: "1.3. Ví dụ", c: [
              "I'm thirsty. I'll get some water. (Mình khát quá. Để mình đi lấy nước.)",
              "I won't tell anyone. I promise. (Mình sẽ không nói với ai. Mình hứa.)",
              "I think she will pass the exam. (Mình nghĩ cô ấy sẽ đậu kỳ thi.)"
            ]},
            { t: "1.4. Dấu hiệu nhận biết", c: ["I think / I believe / I guess / I'm sure + will", "probably, perhaps, maybe, tomorrow, next week…"] },
            { t: "Fact", c: [
              { t: "Báo giá", c: ["That will be (số tiền)", "That'll be 50,000 dong, please. (Của bạn hết 50 nghìn ạ.)"] }
            ]}
          ]},
          { t: "2. BE GOING TO (Sắp / Dự định sẽ)", c: [
            { t: "2.1. Công thức", c: ["(+) S + am/is/are + going to + V", "(-) S + am/is/are + not + going to + V", "(?) Am/Is/Are + S + going to + V?"] },
            { t: "2.2. Cách dùng", c: ["Kế hoạch, dự định đã có từ trước lúc nói", "Dự đoán dựa trên bằng chứng ở hiện tại"] },
            { t: "2.3. Ví dụ", c: [
              "I'm going to visit my grandparents this weekend. (Cuối tuần này mình định về thăm ông bà.)",
              "Look at those black clouds! It's going to rain. (Nhìn mây đen kia kìa! Trời sắp mưa rồi.)"
            ]},
            { t: "2.4. Dấu hiệu nhận biết", c: ["Có bằng chứng nhìn thấy được: Look!, Watch out!…", "Có kế hoạch từ trước: this weekend, next month, tonight…"] },
            { t: "Fact", c: [
              { t: "Dạng quá khứ: was/were going to = định làm mà không làm được", c: [
                "I was going to call you, but I forgot. (Mình định gọi bạn mà quên mất.)",
                "We were going to go out, but it rained. (Tụi mình định đi chơi nhưng trời mưa.)"
              ]}
            ]}
          ]},
          { t: "3. HIỆN TẠI TIẾP DIỄN chỉ tương lai", c: [
            { t: "3.1. Công thức", c: ["(+) S + am/is/are + V-ing", "(-) S + am/is/are + not + V-ing", "(?) Am/Is/Are + S + V-ing?"] },
            { t: "3.2. Cách dùng", c: ["Lịch hẹn đã sắp xếp chắc chắn (có thời gian, địa điểm, người cụ thể)", "Thường dùng với: hẹn gặp, đặt vé, đặt bàn, họp, đi du lịch"] },
            { t: "3.3. Ví dụ", c: [
              "I'm meeting my client at 3 p.m. tomorrow. (Mai 3 giờ chiều mình gặp khách hàng.)",
              "We're flying to Da Nang on Friday. (Thứ Sáu tụi mình bay ra Đà Nẵng.)",
              "Are you doing anything tonight? (Tối nay bạn có làm gì không?)"
            ]},
            { t: "3.4. Dấu hiệu nhận biết", c: ["Có mốc thời gian tương lai cụ thể: tomorrow, at 3 p.m., on Friday, next week…", "Nếu không có mốc thời gian tương lai, câu mang nghĩa đang làm ở hiện tại"] },
            { t: "Fact", c: [
              { t: "Mẹo nhớ: giống tiếng Việt", c: [
                "Tiếng Việt: \"Mai mình gặp khách.\" (không cần chữ \"sẽ\")",
                "Tiếng Anh: I'm meeting a client tomorrow. (không cần \"will\")"
              ]}
            ]}
          ]},
          { t: "4. PHÂN BIỆT WILL vs GOING TO", c: [
            { t: "4.1. Bảng so sánh", c: [
              "WILL: quyết định ngay lúc nói, chưa có kế hoạch trước",
              "GOING TO: đã có kế hoạch, dự định từ trước lúc nói",
              "WILL: dự đoán theo ý kiến, cảm nhận (I think…)",
              "GOING TO: dự đoán theo bằng chứng đang thấy (Look!…)",
              "WILL: lời hứa, đề nghị giúp đỡ",
              "GOING TO: việc sắp xảy ra, gần như chắc chắn"
            ]},
            { t: "4.2. So sánh qua ví dụ", c: [
              "Quyết định tức thời: \"The phone is ringing.\" – \"I'll answer it.\" (\"Điện thoại reo kìa.\" – \"Để mình nghe.\")",
              "Đã có kế hoạch: \"I'm going to study abroad next year.\" (Năm sau mình định đi du học.)",
              "Ý kiến cá nhân: I think it will be a great film. (Mình nghĩ đó sẽ là bộ phim hay.)",
              "Có bằng chứng: He's running very fast. He's going to win. (Anh ấy đang chạy rất nhanh. Anh ấy sắp thắng rồi.)"
            ]}
          ]}
        ]
      },
      quiz: [
        { lv: 1, q: "I'm thirsty. I ___ get some water.", a: "will", opts: ["am going to", "am", "going"], ex: "Quyết định tức thời ngay lúc nói → will." },
        { lv: 1, q: "Look at those clouds! It ___ rain.", a: "is going to", opts: ["will", "rains", "is raining to"], ex: "Dự đoán có bằng chứng (mây đen) → going to." },
        { lv: 1, q: "I ___ visit my grandparents this weekend. I bought the tickets last week.", a: "am going to", opts: ["will", "visited", "going to"], ex: "Kế hoạch có từ trước → be going to." },
        { lv: 1, q: "I'm ___ my client at 3 p.m. tomorrow.", a: "meeting", opts: ["meet", "met", "going meet"], ex: "Lịch hẹn chắc chắn → hiện tại tiếp diễn: am meeting." },
        { lv: 1, q: "I promise I ___ tell anyone.", a: "won't", opts: ["am not going", "don't", "am not"], ex: "Lời hứa → will / won't." },
        { lv: 1, q: "___ you doing anything tonight?", a: "Are", opts: ["Will", "Do", "Is"], ex: "Hiện tại tiếp diễn: Are you doing…?" },
        { lv: 1, q: "I think she ___ pass the exam.", a: "will", opts: ["is going", "passes", "is passing"], ex: "I think + will (dự đoán theo ý kiến)." },
        { lv: 1, q: "The phone is ringing. — I ___ (answer) it!", a: "will answer/'ll answer", opts: [], ex: "Quyết định ngay lúc nói → I'll answer it." },
        { lv: 1, q: "We ___ (fly) to Da Nang on Friday. The tickets are booked.", a: "are flying/'re flying/are going to fly", opts: [], ex: "Đã đặt vé (lịch chắc chắn) → are flying (going to cũng được)." },
        { lv: 1, q: "Lời hứa thường dùng ___", a: "will", opts: ["be going to", "hiện tại tiếp diễn", "quá khứ đơn"], ex: "Lời hứa, đề nghị → will." },

        { lv: 2, q: "Nhân viên thu ngân: \"That ___ 120,000 dong, please.\"", a: "will be", opts: ["is going to be", "is being", "was"], ex: "Báo giá: That will be + số tiền." },
        { lv: 2, q: "I ___ call you, but I forgot.", a: "was going to", opts: ["will", "am going to", "was calling"], ex: "was going to = định làm mà không làm được." },
        { lv: 2, q: "He's running very fast. He ___ win the race.", a: "is going to", opts: ["will", "wins", "won"], ex: "Bằng chứng đang thấy → going to." },
        { lv: 2, q: "A: We've run out of milk. — B: Oh, I ___ buy some on my way home.", a: "will", opts: ["am going to", "am buying", "bought"], ex: "\"Oh\" → vừa mới quyết định → will." },
        { lv: 2, q: "Câu nào dùng hiện tại tiếp diễn để nói về TƯƠNG LAI?", a: "I'm having dinner with Lan tomorrow.", opts: ["I'm having dinner now.", "I have dinner at 7 every day.", "I had dinner with Lan."], ex: "Có mốc tương lai (tomorrow) → nghĩa tương lai." },

        { lv: 3, q: "A: Why did you buy so much flour? — B: I ___ bake a cake for Mom's birthday.", a: "am going to", opts: ["will", "bake", "baked"], ex: "Đã có kế hoạch từ trước (đã mua bột) → going to." },
        { lv: 3, q: "Chọn câu ĐÚNG:", a: "We're meeting at the cafe at 7 tomorrow.", opts: ["We will meeting at the cafe at 7 tomorrow.", "We're going meet at the cafe at 7 tomorrow.", "We meeting at the cafe at 7 tomorrow."], ex: "Lịch hẹn: are meeting. will + V0; going to + V0." },
        { lv: 3, q: "We ___ go out, but it rained.", a: "were going to", opts: ["are going to", "will", "are going"], ex: "Định đi nhưng không đi được → were going to." },
        { lv: 3, q: "A: Are you free on Saturday? — B: Sorry, I ___ to my cousin's wedding.", a: "'m going", opts: ["'ll go", "go", "went"], ex: "Việc đã sắp xếp → I'm going (hiện tại tiếp diễn)." },
        { lv: 3, q: "Sếp: \"Can someone help me move these boxes?\" — Bạn: \"___\"", a: "I'll help you.", opts: ["I'm going to help you.", "I help you.", "I'm helping you yesterday."], ex: "Đề nghị giúp đỡ ngay lúc nói → I'll help you." }
      ],
      speak: [
        { lv: 1, en: "I'll get some water.", vi: "Để mình đi lấy nước." },
        { lv: 1, en: "It's going to rain.", vi: "Trời sắp mưa rồi." },
        { lv: 1, en: "I'm meeting my friend tomorrow.", vi: "Mai mình gặp bạn." },
        { lv: 1, en: "I won't tell anyone.", vi: "Mình sẽ không nói với ai." },
        { lv: 3, en: "I was going to call you last night, but I fell asleep.", vi: "Tối qua mình định gọi bạn mà ngủ quên mất." },
        { lv: 3, en: "We're flying to Da Nang on Friday, so I'm going to pack tonight.", vi: "Thứ Sáu tụi mình bay ra Đà Nẵng nên tối nay mình sẽ soạn đồ." },
        { lv: 3, en: "Don't worry, I'll help you move the boxes this weekend.", vi: "Đừng lo, cuối tuần này mình sẽ giúp bạn chuyển mấy thùng đồ." },
        { lv: 3, en: "Look at the traffic! We're going to be late for the meeting.", vi: "Nhìn kẹt xe kìa! Tụi mình sắp trễ họp rồi." },
        { lv: 3, en: "Are you doing anything tonight? We're having a small party.", vi: "Tối nay bạn có làm gì không? Tụi mình tổ chức tiệc nhỏ." },
        { lv: 3, en: "That'll be one hundred and twenty thousand dong, please.", vi: "Của bạn hết một trăm hai mươi nghìn ạ." }
      ]
    },
    {
      "id": "np06",
      "date": "2026-11-19",
      "title": "NP06 - Mạo từ (a / an / the / không mạo từ)",
      "level": "B1",
      "grammar": {
        "t": "NP06 - Mạo từ (a / an / the / không mạo từ)",
        "c": [
          {
            "t": "Tổng quan",
            "c": [
              {
                "t": "Mạo từ là gì?",
                "c": [
                  "Từ đứng trước danh từ để cho biết danh từ đó là chung chung hay đã xác định",
                  {
                    "t": "Hiểu đơn giản",
                    "c": [
                      "Tiếng Việt không bắt buộc, tiếng Anh thì **BẮT BUỘC** phải chọn 1 trong 3 -> a / an, the hoặc không có gì (Ø)"
                    ]
                  }
                ]
              },
              {
                "t": "3 lựa chọn",
                "c": [
                  {
                    "t": "A / AN",
                    "c": [
                      "Một cái bất kỳ, người nghe chưa biết là cái nào"
                    ]
                  },
                  {
                    "t": "THE",
                    "c": [
                      "Cái cụ thể, người nói và người nghe đều biết là cái nào"
                    ]
                  },
                  {
                    "t": "Ø (không mạo từ)",
                    "c": [
                      "Danh từ số nhiều hoặc không đếm được, nói chung chung"
                    ]
                  }
                ]
              },
              {
                "t": "Cách chọn nhanh: hỏi 3 câu",
                "c": [
                  "Câu 1: Danh từ đếm được hay không đếm được?",
                  "Câu 2: Nếu đếm được thì số ít hay số nhiều?",
                  "Câu 3: Người nghe đã biết chính xác cái nào chưa?",
                  {
                    "t": "Kết luận",
                    "c": [
                      "Đếm được + số ít + chưa biết -> **a / an**",
                      "Đã biết cái nào (bất kể loại danh từ) -> **the**",
                      "Số nhiều / không đếm được + nói chung -> **Ø**"
                    ]
                  }
                ]
              },
              {
                "t": "Ví dụ",
                "c": [
                  "I have a dog.",
                  "The dog is very cute.",
                  "Dogs are very cute."
                ]
              }
            ]
          },
          {
            "t": "1. A / AN (Một)",
            "c": [
              {
                "t": "1.1. Công thức",
                "c": [
                  "a / an + danh từ đếm được **SỐ ÍT**"
                ]
              },
              {
                "t": "1.2. Cách dùng",
                "c": [
                  "Nhắc đến một người / vật bất kỳ, lần đầu tiên xuất hiện trong câu chuyện",
                  "Nói về nghề nghiệp, danh tính, loại",
                  "Nói về tần suất: once a week, twice a month (mỗi)"
                ]
              },
              {
                "t": "1.3. A hay AN? Nhìn vào ÂM, không phải CHỮ",
                "c": [
                  {
                    "t": "an + **phát âm** nguyên âm (/ɑː/, /æ/, /e/, /ɪ/, /ɒ/, /ʌ/, /ʊ/...)",
                    "c": [
                      "Ví dụ: an apple, an egg, an umbrella, an orange",
                      "an hour, an honest man (chữ h câm -> âm đầu là nguyên âm)",
                      "an MBA, an SMS (đọc từng chữ cái: /em/, /es/ -> âm đầu là nguyên âm)"
                    ]
                  },
                  {
                    "t": "a + **phát âm** phụ âm",
                    "c": [
                      "Ví dụ: a book, a dog, a table",
                      "a university, a user, a European (chữ u, eu đọc là /j/)",
                      "a one-day trip (chữ o đọc là /w/)"
                    ]
                  },
                  {
                    "t": "Ghi nhớ",
                    "c": [
                      "An -> hour, honest, honour, heir",
                      "A -> university, unit, uniform, useful, one, European"
                    ]
                  }
                ]
              },
              {
                "t": "1.4. Ví dụ",
                "c": [
                  "I have a dog.",
                  "She is an engineer.",
                  "He waited for an hour.",
                  "Henry goes to the cinema twice a month."
                ]
              },
              {
                "t": "1.5. Dấu hiệu nhận biết",
                "c": [
                  "Ngay sau là danh từ đếm được số ít, chưa xác định",
                  "Đi với: What a..., such a..., once a..., a lot of, a few",
                  "**KHÔNG** đi với danh từ số nhiều và danh từ không đếm được"
                ]
              },
              {
                "t": "Ghi chú",
                "c": [
                  {
                    "t": "Khi có tính từ chen giữa, a / an do từ NGAY SAU nó quyết định",
                    "c": [
                      "a job -> an easy job",
                      "an old man -> a very old man",
                      "a car -> an expensive car"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "t": "2. THE (Cái đã xác định)",
            "c": [
              {
                "t": "2.1. Công thức",
                "c": [
                  "the + danh từ (số ít, số nhiều, không đếm được)"
                ]
              },
              {
                "t": "2.2. Cách dùng",
                "c": [
                  {
                    "t": "Đã nhắc đến ở trước (nhắc lần 2)",
                    "c": [
                      "I saw a cat. The cat was black."
                    ]
                  },
                  {
                    "t": "Người nói và người nghe cùng biết là cái nào (nhờ ngữ cảnh)",
                    "c": [
                      "Close the door, please.",
                      "Where is the bathroom?"
                    ]
                  },
                  {
                    "t": "Duy nhất trên đời hoặc trong phạm vi hiểu biết chung",
                    "c": [
                      "the sun, the moon, the earth, the sky, the world, the internet",
                      "The sun rises in the east."
                    ]
                  },
                  {
                    "t": "Có cụm bổ nghĩa phía sau để chỉ rõ là cái nào",
                    "c": [
                      "The book on the table is mine.",
                      "The girl who called me is my sister."
                    ]
                  },
                  {
                    "t": "So sánh nhất, số thứ tự, only / same",
                    "c": [
                      "the best, the most beautiful, the tallest",
                      "the first, the second, the last",
                      "the only one, the same size"
                    ]
                  },
                  {
                    "t": "Một số nhóm cố định",
                    "c": [
                      "Sông, biển, đại dương, dãy núi, quần đảo: the Mekong, the Pacific, the Alps",
                      "Quốc gia có tên dạng số nhiều hoặc viết tắt: the Philippines, the Netherlands, the USA, the UK",
                      "Nhạc cụ: play the piano, play the guitar",
                      "the + tính từ = nhóm người: the rich, the poor, the elderly"
                    ]
                  }
                ]
              },
              {
                "t": "2.3. Phát âm của THE",
                "c": [
                  "Trước âm phụ âm -> /ðə/: the book, the city",
                  "Trước âm nguyên âm -> /ðiː/: the apple, the hour",
                  "Giống quy tắc a / an: nhìn vào **ÂM**, không phải** CHỮ**"
                ]
              },
              {
                "t": "2.4. Dấu hiệu nhận biết",
                "c": [
                  "Có of / who / which / that / on the table... xác định rõ ở phía sau",
                  "Có best / first / only / same",
                  "Danh từ đã được nhắc ở câu trước"
                ]
              },
              {
                "t": "2.5. Ví dụ",
                "c": [
                  "The moon is very bright tonight.",
                  "The weather is nice today.",
                  "Can you pass me the salt?"
                ]
              },
              {
                "t": "Fact",
                "c": [
                  {
                    "t": "Tên riêng + the = cả gia đình / nhóm",
                    "c": [
                      "The Smiths are my neighbours. (Nhà Smith là hàng xóm của mình.)"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "t": "3. KHÔNG MẠO TỪ (Ø)",
            "c": [
              {
                "t": "3.1. Công thức",
                "c": [
                  "Ø + danh từ (không có a / an / the)"
                ]
              },
              {
                "t": "3.2. Cách dùng",
                "c": [
                  {
                    "t": "Danh từ số nhiều đếm được, nói chung",
                    "c": [
                      "Dogs are loyal."
                    ]
                  },
                  {
                    "t": "Danh từ không đếm được, nói chung",
                    "c": [
                      "Water is essential for life.",
                      "Ví dụ: information, advice, music, love, rice, money"
                    ]
                  },
                  {
                    "t": "Tên riêng người, thành phố, hầu hết quốc gia",
                    "c": [
                      "Hanoi, Vietnam, Japan, Mr. Brown"
                    ]
                  },
                  {
                    "t": "Bữa ăn, môn học, môn thể thao, ngôn ngữ",
                    "c": [
                      "Ví dụ: have breakfast, have lunch, have dinner",
                      "Ví dụ: study math, play football, speak English"
                    ]
                  },
                  {
                    "t": "Phương tiện đi lại với by",
                    "c": [
                      "Ví dụ: by bus, by car, by plane, on foot"
                    ]
                  },
                  {
                    "t": "Nơi chốn dùng đúng mục đích của nó",
                    "c": [
                      "Ví dụ: go to school, go to work, go to bed, be at home",
                      "He goes to school every day."
                    ]
                  },
                  {
                    "t": "Thứ, tháng, mùa",
                    "c": [
                      "Ví dụ: on Monday, in July, in summer"
                    ]
                  }
                ]
              },
              {
                "t": "3.3. Dấu hiệu nhận biết",
                "c": [
                  "Danh từ số nhiều hoặc không đếm được, và nói chung chung",
                  "Đã có my / your / this / that / some / any đứng trước thì **KHÔNG** thêm mạo từ"
                ]
              },
              {
                "t": "3.4. Ví dụ",
                "c": [
                  "I like music.",
                  "Children need love.",
                  "We usually have breakfast at 7 a.m."
                ]
              },
              {
                "t": "Fact",
                "c": [
                  {
                    "t": "Cùng một nơi chốn, đổi mục đích thì đổi mạo từ",
                    "c": [
                      "He goes to school every day. (đi học -> mục đích học)",
                      "He goes to the school to meet the teacher. (đến ngôi trường đó để gặp thầy -> chỉ là địa điểm)"
                    ]
                  },
                  {
                    "t": "Có ngoại lệ",
                    "c": [
                      "Anh - Anh: in hospital",
                      "Anh - Mỹ: in the hospital"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "t": "4. PHÂN BIỆT CHUNG CHUNG VS CỤ THỂ",
            "c": [
              {
                "t": "4.1. Bảng so sánh",
                "c": [
                  "Ø: nói chung chung, cả một loại",
                  "THE: nói về cái cụ thể, người nghe biết là cái nào",
                  "A / AN: nói về một cái bất kỳ trong loại đó"
                ]
              },
              {
                "t": "4.2. So sánh qua ví dụ",
                "c": [
                  "Dogs are friendly. (Chó nói chung thì thân thiện.)",
                  "The dogs next door are friendly. (Mấy con chó nhà bên thì thân thiện.)",
                  "Water is important. (Nước nói chung rất quan trọng.)",
                  "The water in this glass is cold. (Nước trong ly này lạnh.)",
                  "I like music. (Mình thích âm nhạc nói chung.)",
                  "I like the music in this film. (Mình thích nhạc trong bộ phim này.)",
                  "I need a pen. (Mình cần một cây bút nào đó cũng được.)",
                  "I need the pen on your desk. (Mình cần đúng cây bút trên bàn bạn.)"
                ]
              }
            ]
          },
          {
            "t": "5. Một mối quan hệ đặc biệt: A / AN → THE",
            "c": [
              {
                "t": "Lần đầu nhắc tới, ta dùng a / an. Từ lần thứ hai (đã biết là cái nào), chuyển sang the.",
                "c": [
                  {
                    "t": "VD1:",
                    "c": [
                      "A: I bought a new phone yesterday.",
                      "B: Really? What colour is the phone?",
                      "A: The phone is black."
                    ]
                  },
                  {
                    "t": "VD 2",
                    "c": [
                      "I got in a taxi. The driver was very friendly."
                    ]
                  }
                ]
              },
              {
                "t": "Giải thích",
                "c": [
                  "a new phone -> Người nghe chưa biết, lần đầu giới thiệu.",
                  "the phone -> Người nghe đã biết đang nói tới cái nào.",
                  "the driver -> Chưa nhắc trước đó, nhưng đã có taxi thì chắc chắn có tài xế -> người nghe tự hiểu được."
                ]
              }
            ]
          },
          {
            "t": "6. Cụm từ hay dùng",
            "c": [
              {
                "t": "What + a / an + (adj) + N số ít! -> Cảm thán",
                "c": [
                  "What a beautiful day! (Hôm nay đẹp trời quá!)",
                  "Danh từ không đếm được / số nhiều thì bỏ a: What beautiful weather!"
                ]
              },
              {
                "t": "such + a / an + adj + N -> Nêu lên cảm nghĩ",
                "c": [
                  "It was such a good film.",
                  "It was such a stupid idea that nobody agreed with it."
                ]
              },
              "Ví dụ: half an hour, a lot of, a few, a couple of",
              {
                "t": "Thời gian trong ngày",
                "c": [
                  "in the morning / in the afternoon / in the evening",
                  "at night (không có the)"
                ]
              },
              {
                "t": "Đi tới những nơi quen thuộc hằng ngày",
                "c": [
                  "Ví dụ: go to the cinema, go to the bank, go to the doctor"
                ]
              },
              {
                "t": "Tần suất: once / twice + a + week / month / year",
                "c": [
                  "Spring comes once a year. (Mùa xuân tới mỗi năm 1 lần.)"
                ]
              }
            ]
          }
        ]
      },
      "quiz": [
        {
          "lv": 1,
          "q": "I have ___ dog. His name is Mực.",
          "a": "a",
          "opts": [
            "an",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "Lần đầu nhắc đến, danh từ đếm được số ít → a dog."
        },
        {
          "lv": 1,
          "q": "She is ___ engineer.",
          "a": "an",
          "opts": [
            "a",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "Nghề nghiệp cần a/an; engineer bắt đầu bằng âm nguyên âm /e/ → an."
        },
        {
          "lv": 1,
          "q": "We waited for ___ hour at the bus stop.",
          "a": "an",
          "opts": [
            "a",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "Chữ h trong hour câm, âm đầu là nguyên âm → an hour."
        },
        {
          "lv": 1,
          "q": "My brother studies at ___ university in Da Nang.",
          "a": "a",
          "opts": [
            "an",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "university đọc /juː/ → âm đầu là phụ âm → a university."
        },
        {
          "lv": 1,
          "q": "___ moon is very bright tonight.",
          "a": "The",
          "opts": [
            "A",
            "An",
            "Ø (không dùng)"
          ],
          "ex": "Mặt trăng là duy nhất → the moon."
        },
        {
          "lv": 1,
          "q": "Can you pass me ___ salt, please?",
          "a": "the",
          "opts": [
            "a",
            "an",
            "Ø (không dùng)"
          ],
          "ex": "Lọ muối trên bàn, cả hai cùng biết là cái nào → the salt."
        },
        {
          "lv": 1,
          "q": "I like ___ music, especially pop.",
          "a": "Ø (không dùng)",
          "opts": [
            "a",
            "the",
            "an"
          ],
          "ex": "Âm nhạc nói chung, không đếm được → không mạo từ: I like music."
        },
        {
          "lv": 1,
          "q": "We usually have ___ breakfast at 7 a.m.",
          "a": "Ø (không dùng)",
          "opts": [
            "a",
            "the",
            "an"
          ],
          "ex": "Bữa ăn nói chung → have breakfast (không mạo từ)."
        },
        {
          "lv": 1,
          "q": "I go to work by ___ bus.",
          "a": "Ø (không dùng)",
          "opts": [
            "a",
            "the",
            "an"
          ],
          "ex": "by + phương tiện → không mạo từ: by bus, by car."
        },
        {
          "lv": 1,
          "q": "My sister can play ___ guitar very well.",
          "a": "the",
          "opts": [
            "a",
            "an",
            "Ø (không dùng)"
          ],
          "ex": "play + the + nhạc cụ: play the guitar."
        },
        {
          "lv": 2,
          "q": "I saw a cat in the garden. ___ cat was black.",
          "a": "The",
          "opts": [
            "A",
            "An",
            "Ø (không dùng)"
          ],
          "ex": "Nhắc lại lần 2, người nghe đã biết là con nào → the cat."
        },
        {
          "lv": 2,
          "q": "It was such ___ interesting film!",
          "a": "an",
          "opts": [
            "a",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "such + a/an + tính từ + N; a/an do từ ngay sau quyết định: interesting → an."
        },
        {
          "lv": 2,
          "q": "What ___ beautiful weather today!",
          "a": "Ø (không dùng)",
          "opts": [
            "a",
            "the",
            "an"
          ],
          "ex": "weather không đếm được → What beautiful weather! (không có a)."
        },
        {
          "lv": 2,
          "q": "Fansipan is ___ highest mountain in Vietnam.",
          "a": "the",
          "opts": [
            "a",
            "an",
            "Ø (không dùng)"
          ],
          "ex": "So sánh nhất → the highest."
        },
        {
          "lv": 2,
          "q": "He wants to do ___ MBA in Singapore.",
          "a": "an",
          "opts": [
            "a",
            "the",
            "Ø (không dùng)"
          ],
          "ex": "MBA đọc từng chữ /em-biː-eɪ/, âm đầu là nguyên âm → an MBA."
        },
        {
          "lv": 3,
          "q": "A: Where's Minh? — B: He's in ___ bed. He isn't feeling well.",
          "a": "Ø (không dùng)",
          "opts": [
            "the",
            "a",
            "an"
          ],
          "ex": "in bed / go to bed (dùng đúng mục đích: ngủ, nghỉ) → không mạo từ."
        },
        {
          "lv": 3,
          "q": "A: I bought a new phone yesterday. — B: Nice! How much was ___ phone?",
          "a": "the",
          "opts": [
            "a",
            "an",
            "Ø (không dùng)"
          ],
          "ex": "Đã nhắc ở câu trước, cả hai biết là cái nào → the phone."
        },
        {
          "lv": 3,
          "q": "A: What do you do? — B: I'm ___ student at Hue University.",
          "a": "a",
          "opts": [
            "Ø (không dùng)",
            "the",
            "an"
          ],
          "ex": "Nghề nghiệp, danh tính bắt buộc có a/an: I'm a student (không nói I'm student)."
        },
        {
          "lv": 3,
          "q": "A: I'm buying a laptop. Can you give me ___ advice?",
          "a": "some",
          "opts": [
            "an",
            "a",
            "the"
          ],
          "ex": "advice không đếm được → không dùng a/an; nói some advice hoặc a piece of advice."
        },
        {
          "lv": 3,
          "q": "My grandma is in hospital, so we're going to ___ hospital to visit her.",
          "a": "the",
          "opts": [
            "Ø (không dùng)",
            "a",
            "an"
          ],
          "ex": "Người thân đến bệnh viện để thăm (chỉ là địa điểm, không phải để chữa bệnh) → the hospital."
        }
      ],
      "speak": [
        {
          "lv": 1,
          "en": "I'm a teacher at a small school in Hoi An.",
          "vi": "Mình là giáo viên ở một trường nhỏ ở Hội An."
        },
        {
          "lv": 1,
          "en": "Can you close the door, please?",
          "vi": "Bạn đóng cửa giúp mình nhé?"
        },
        {
          "lv": 1,
          "en": "I usually go to bed at eleven.",
          "vi": "Mình thường đi ngủ lúc 11 giờ."
        },
        {
          "lv": 1,
          "en": "What a beautiful day!",
          "vi": "Hôm nay đẹp trời quá!"
        },
        {
          "lv": 3,
          "en": "I bought a new bike last week, but the brakes are already broken.",
          "vi": "Tuần trước mình mua một chiếc xe đạp mới mà phanh đã hỏng rồi."
        },
        {
          "lv": 3,
          "en": "We took a taxi to the airport, and the driver was really friendly.",
          "vi": "Tụi mình đi taxi ra sân bay, bác tài rất thân thiện."
        },
        {
          "lv": 3,
          "en": "I don't drink coffee in the evening, or I can't sleep at night.",
          "vi": "Mình không uống cà phê vào buổi tối, không thì đêm mình không ngủ được."
        },
        {
          "lv": 3,
          "en": "Could you give me a piece of advice about learning English?",
          "vi": "Bạn cho mình một lời khuyên về việc học tiếng Anh được không?"
        },
        {
          "lv": 3,
          "en": "The noodle soup at that restaurant is the best in Da Nang.",
          "vi": "Món bún ở quán đó ngon nhất Đà Nẵng."
        },
        {
          "lv": 3,
          "en": "My uncle is in hospital, so we're going to the hospital to visit him tonight.",
          "vi": "Chú mình đang nằm viện nên tối nay cả nhà vào bệnh viện thăm chú."
        }
      ]
    }
  ]
};

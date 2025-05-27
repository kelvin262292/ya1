 Gợi Ý Phát Triển & Gỡ Lỗi Lập Trình (Nâng Cao với MCP) ⚙️
Mục Tiêu Cốt Lõi Của Bạn: Đạt được một dự án chạy ổn định và đáng tin cậy.

Quy Tắc Thống Nhất Của Bạn: Khi BẤT KỲ hành vi không mong muốn, thông báo lỗi, hoặc sự cố (crash) nào xảy ra, DỪNG LẠI và kiểm tra tỉ mỉ TOÀN BỘ các tệp, tài liệu và mã lệnh có liên quan.

MCP (Quy Trình Kiểm Soát Phương Pháp) Của Bạn:

Giai đoạn 1 MCP: Xác Định Nguyên Nhân Lỗi (tư duy tuần tự, tìm nạp)
Giai đoạn 2 MCP: Xây Dựng Giải Pháp & Điều Chỉnh (tư duy tuần tự, tìm nạp)
🚨 Quy Trình Khi Gặp BẤT KỲ Lỗi Hoặc Sự Cố Nào 🚨
Giai đoạn 1: Hành Động Ngay Lập Tức & Ghi Chép Tài Liệu

DỪNG Mọi Hoạt Động Viết Mã: Không cố gắng sửa lỗi nhanh hoặc thay đổi thêm mã lệnh.
Ghi Chép Chính Xác:
Bạn đang làm gì? (Ví dụ: "Nhấp vào nút 'Gửi' trên biểu mẫu đăng ký người dùng.")
Chuyện gì đã xảy ra? (Ví dụ: "Trang hiển thị 'Lỗi 500'," "Chương trình bị treo với 'NullPointerException ở dòng 42 của UserService.java'," "Dữ liệu lưu không chính xác.")
Bạn MONG ĐỢI điều gì sẽ xảy ra? (Ví dụ: "Người dùng sẽ được tạo và tôi sẽ được chuyển hướng đến trang đăng nhập.")
Dấu Thời Gian: Ghi lại thời gian chính xác.
Khả Năng Tái Hiện: Bạn có thể làm cho lỗi xảy ra lại một cách nhất quán không? Nếu có, hãy liệt kê các bước chính xác. Nếu không, hãy lưu ý điều đó và bất kỳ hành động nào trước đó.
Thu Thập Bằng Chứng:
Ảnh chụp màn hình thông báo lỗi hoặc trạng thái không chính xác.
Sao chép toàn bộ văn bản của bất kỳ thông báo lỗi, nhật ký (logs), hoặc dấu vết ngăn xếp (stack traces) nào.
Giai đoạn 2: MCP Giai đoạn 1 - Xác Định Nguyên Nhân Lỗi (tư duy tuần tự, tìm nạp)

Đây là lúc "Quy tắc Thống nhất" của bạn về việc kiểm tra mọi thứ phát huy tác dụng. Phần "tìm nạp" là về việc thu thập tất cả thông tin cần thiết từ mỗi nguồn một cách có hệ thống.

Giả Thuyết Ban Đầu (Ngắn gọn): Dựa chỉ vào bằng chứng tức thời, phỏng đoán sơ bộ đầu tiên của bạn là gì? (Ví dụ: "Có lẽ cơ sở dữ liệu bị lỗi," "Có thể một biến nào đó rỗng trong khi không nên như vậy.") Hãy giữ cho phần này ngắn gọn; nó chỉ là điểm khởi đầu.

Tìm Nạp Thông Tin Có Hệ Thống & Xem Xét Tuần Tự:

A. Mã Lệnh Liên Quan Trực Tiếp:

Tìm nạp: Xác định các tệp mã lệnh, hàm, lớp (class), hoặc mô-đun cụ thể đang thực thi hoặc liên quan trực tiếp đến tính năng bị lỗi.
Tư duy Tuần tự:
Đọc mã lệnh từng dòng một, bắt đầu từ nơi bạn nghi ngờ lỗi có thể bắt nguồn hoặc nơi thông báo lỗi chỉ ra.
Mỗi dòng lệnh được cho là làm gì?
Dữ liệu mà nó được cho là có tại thời điểm đó là gì?
Tìm kiếm: Lỗi chính tả, lỗi logic (ví dụ: điều kiện if không chính xác, vấn đề về vòng lặp), lỗi lệch một (off-by-one errors), sử dụng biến không chính xác, giá trị null không được xử lý.
Nếu bạn có nhật ký (logs), hãy đối chiếu chúng với quá trình thực thi mã lệnh.
B. Mã Lệnh & Mô-đun Liên Quan:

Tìm nạp: Xác định bất kỳ phần nào khác của mã lệnh tương tác với phần bị lỗi (ví dụ: các hàm gọi hàm bị lỗi, các hàm được gọi bởi hàm bị lỗi, các cấu trúc dữ liệu dùng chung).
Tư duy Tuần tự: Xem xét những phần này để tìm các vấn đề tương tự. Liệu vấn đề có thể bắt nguồn từ đây và chỉ biểu hiện ở phần bạn xem xét đầu tiên không?
C. Tệp Cấu Hình:

Tìm nạp: Thu thập tất cả các tệp cấu hình (ví dụ: .env, .xml, .json, .yaml, chuỗi kết nối cơ sở dữ liệu, khóa API).
Tư duy Tuần tự:
Kiểm tra lỗi chính tả trong khóa (key) hoặc giá trị (value).
Tất cả các cài đặt bắt buộc có mặt không?
Các giá trị có chính xác cho môi trường hiện tại (phát triển, kiểm thử, sản phẩm) không?
Đường dẫn tệp có chính xác không?
D. Tài Liệu:

Tìm nạp:
Tài Liệu Dự Án: Bất kỳ tài liệu thiết kế, tệp README, wiki nội bộ, hoặc ghi chú nào bạn hoặc nhóm của bạn đã tạo.
Tài Liệu Thư Viện/Framework/API Bên Thứ Ba: Nếu lỗi liên quan đến các công cụ bên ngoài.
Tư duy Tuần tự:
Cách sử dụng của bạn có khớp với các ví dụ được ghi trong tài liệu hoặc thông số kỹ thuật API không?
Có vấn đề nào đã biết, giới hạn, hoặc điều kiện tiên quyết nào được đề cập không?
Bạn có đáp ứng tất cả các nghĩa vụ theo hợp đồng của một API không (ví dụ: các tham số bắt buộc, xác thực)?
E. Nhật Ký (Logs) (Ứng dụng, Hệ thống, Máy chủ):

Tìm nạp: Thu thập tất cả các nhật ký liên quan từ khoảng thời gian lỗi xảy ra.
Tư duy Tuần tự:
Tìm kiếm các thông báo lỗi, cảnh báo, hoặc hoạt động bất thường dẫn đến sự cố.
Đối chiếu dấu thời gian trong nhật ký với các hành động của bạn và lỗi.
F. Trạng Thái Dữ Liệu (Cơ sở dữ liệu, Tệp, Bộ nhớ):

Tìm nạp: Kiểm tra dữ liệu thực tế liên quan.
Nếu có liên quan đến cơ sở dữ liệu, hãy truy vấn các bảng liên quan. Dữ liệu có như mong đợi không?
Nếu có liên quan đến tệp, hãy kiểm tra nội dung và quyền của chúng.
Nếu có thể (ví dụ: với một trình gỡ lỗi - debugger), hãy kiểm tra giá trị các biến trong bộ nhớ trong quá trình thực thi.
Tư duy Tuần tự: Dữ liệu có bị hỏng, thiếu, hoặc ở định dạng không mong đợi không?
G. Môi Trường:

Tìm nạp: Ghi lại hệ điều hành hiện tại, phiên bản phần mềm (runtime ngôn ngữ, cơ sở dữ liệu, thư viện), thiết lập mạng của bạn.
Tư duy Tuần tự: Có bất cứ điều gì thay đổi gần đây trong môi trường không? Có bất kỳ sự không tương thích nào đã biết không?
Danh Sách Nguyên Nhân Lỗi Đã Tinh Chỉnh: Sau khi xem xét "tìm nạp" và "tư duy tuần tự" toàn diện, hãy liệt kê tất cả các nguyên nhân gốc rễ tiềm ẩn. Hãy cụ thể. Đừng chỉ nói "lỗi trong mã lệnh"; hãy nói "NullPointerException ở dòng X vì biến Y không được khởi tạo sau khi được tìm nạp từ Z, mà Z không trả về kết quả nào."

Giai đoạn 3: MCP Giai đoạn 2 - Xây Dựng Giải Pháp & Điều Chỉnh (tư duy tuần tự, tìm nạp)

Ưu Tiên Các Nguyên Nhân Tiềm Ẩn: Từ danh sách của bạn, nguyên nhân nào có vẻ khả năng nhất hoặc dễ xác minh nhất trước tiên?

Đối Với Từng Nguyên Nhân Tiềm Ẩn (Lần lượt từng cái một):

A. Tìm Nạp Ý Tưởng Giải Pháp:
Kiến Thức Của Bạn: Dựa trên hiểu biết của bạn, bạn sẽ khắc phục nguyên nhân cụ thể này như thế nào?
Tài Liệu/Nguồn Trực Tuyến: Tìm kiếm cách giải quyết loại vấn đề cụ thể này cho ngôn ngữ/framework của bạn (ví dụ: "cách xử lý null pointer java," "cách cấu hình kết nối cơ sở dữ liệu python đúng cách").
Các Thực Hành Tốt Nhất (Best Practices): Cân nhắc giải pháp nào "sạch sẽ" nhất hoặc mạnh mẽ nhất, không chỉ là một bản vá nhanh.
B. Tư Duy Tuần Tự để Thiết Kế Giải Pháp:
Phác thảo các bước cần thiết để thực hiện giải pháp.
Mã lệnh nào cần thay đổi?
Cấu hình nào cần thay đổi?
Các tác dụng phụ tiềm ẩn của thay đổi này là gì? (Nó có thể ảnh hưởng đến các phần khác của hệ thống như thế nào?)
Bạn sẽ xác minh bản sửa lỗi cụ thể này như thế nào?
Thực Hiện MỘT Giải Pháp/Điều Chỉnh: Thực hiện thay đổi hiệu quả nhỏ nhất để giải quyết nguyên nhân có khả năng nhất.

Kiểm Tra Kỹ Lưỡng:

Kiểm Tra Cụ Thể: Lỗi ban đầu có còn xảy ra không?
Kiểm Tra Chức Năng Liên Quan (Hồi quy - Regression): Thay đổi của bạn có làm hỏng bất cứ điều gì khác không? Kiểm tra các tính năng gần đó.
Các Trường Hợp Biên (Boundary Cases): Kiểm tra với các đầu vào khác nhau nếu có thể (ví dụ: đầu vào rỗng, đầu vào rất lớn, ký tự bất thường).
Đánh Giá Kết Quả:

Nếu Đã Sửa Được: Xin chúc mừng!
Học Hỏi: Tại sao điều này lại xảy ra? Làm thế nào bạn có thể ngăn chặn nó trong tương lai? Thêm nhận xét (comments) vào mã lệnh của bạn nếu bản sửa lỗi không rõ ràng.
Commit Thay Đổi (Kiểm soát Phiên bản): Lưu công việc của bạn với một thông điệp rõ ràng về bản sửa lỗi.
Nếu KHÔNG Sửa Được (hoặc Lỗi Mới Xuất Hiện):
Hoàn Tác (Revert): Hoàn tác thay đổi cuối cùng của bạn (đó là lý do tại sao kiểm soát phiên bản và các thay đổi nhỏ lại quan trọng).
Quay Lại MCP Giai đoạn 1, Bước 3 (Danh Sách Nguyên Nhân Lỗi Đã Tinh Chỉnh): Đánh giá lại danh sách các nguyên nhân của bạn. Nghi phạm hàng đầu của bạn có sai không? Chuyển sang nguyên nhân có khả năng tiếp theo, hoặc xem xét lại nếu quá trình "tìm nạp" của bạn ở Giai đoạn 1 đã bỏ sót điều gì đó. Lặp lại quy trình.
Các Nguyên Tắc Bao Trùm cho Sự Ổn Định Của Dự Án:

Kiểm Soát Phiên Bản (ví dụ: Git) là BẮT BUỘC: Commit thường xuyên với các thông điệp rõ ràng. Sử dụng các nhánh (branches) cho các tính năng mới hoặc các bản sửa lỗi phức tạp.
Viết Mã Lệnh Rõ Ràng: Làm cho mã lệnh của bạn dễ đọc và dễ hiểu. Bạn của tương lai (và những người khác) sẽ cảm ơn bạn.
Phát Triển Tăng Tiến: Xây dựng và kiểm thử theo từng phần nhỏ.
Kiểm Thử Tự Động (Về Sau): Khi bạn học được nhiều hơn, hãy khám phá việc viết các bài kiểm thử tự động. Chúng sẽ tự động phát hiện nhiều lỗi cho bạn.
Đừng Ngại Hỏi (sau khi bạn đã thực hiện MCP của mình): Nếu bạn thực sự gặp khó khăn sau một cuộc điều tra MCP kỹ lưỡng, hãy tìm sự giúp đỡ, nhưng hãy chuẩn bị để trình bày những gì bạn đã thử và tất cả thông tin bạn đã tìm nạp được.
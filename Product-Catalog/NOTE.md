📔 Học phần: Xây dựng Hệ thống Danh mục Sản phẩm (Product Catalog)
Tài liệu này tổng hợp các kiến thức quan trọng khi xây dựng ứng dụng React kết hợp với thư viện UI Ant Design và TypeScript.

🏗️ 1. Kiến trúc Component (Component Architecture)
Dự án được chia nhỏ thành các thành phần độc lập, giúp mã nguồn dễ đọc và bảo trì:

ProductCard.tsx: Thành phần hiển thị chi tiết cho từng sản phẩm.

Sử dụng Card để bọc nội dung và Card.Meta để hiển thị tiêu đề, giá tiền.

Sử dụng Tag để phân loại danh mục và hiển thị mức giảm giá (nếu có).

Sử dụng Rate ở chế độ disabled để hiển thị đánh giá sao từ người dùng.

ProductList.tsx: Thành phần quản lý bố cục danh sách.

Sử dụng hệ thống Grid (Row và Col) để tự động sắp xếp các sản phẩm theo hàng và cột.

Dùng hàm .map() để duyệt qua mảng dữ liệu và render các ProductCard tương ứng.

SearchBar.tsx: Thanh tìm kiếm đơn giản.

Sử dụng Input của Ant Design để nhận dữ liệu từ người dùng.

Bắt sự kiện onChange để gửi giá trị tìm kiếm về component cha ngay khi người dùng gõ phím.

CategoryFilter.tsx: Bộ lọc theo danh mục.

Sử dụng component Select để tạo menu thả xuống.

Chuyển đổi mảng các chuỗi đơn giản thành định dạng label và value mà Ant Design yêu cầu.

🧠 2. Các kỹ thuật lập trình then chốt
🔹 Quản lý Trạng thái (State Management)
Trong file App.tsx, chúng ta quản lý hai trạng thái quan trọng để điều khiển dữ liệu hiển thị:

search: Lưu trữ từ khóa người dùng nhập vào thanh tìm kiếm.

category: Lưu trữ danh mục mà người dùng đã chọn từ bộ lọc.

🔹 Logic Lọc Dữ liệu (Filtering Logic)
Thay vì thay đổi mảng dữ liệu gốc, chúng ta tạo ra một biến tạm gọi là filteredProducts dựa trên các điều kiện lọc:

Tìm kiếm theo tên: Chuyển cả tên sản phẩm và từ khóa tìm kiếm về chữ thường (toLowerCase()) để so sánh chính xác.

Lọc theo danh mục: Nếu người dùng chọn "All", điều kiện lọc danh mục sẽ bị bỏ qua (hiển thị tất cả).

Kết hợp: Cả hai điều kiện (Tìm kiếm AND Danh mục) phải thỏa mãn thì sản phẩm mới được hiển thị.

🔹 Sử dụng TypeScript để kiểm soát dữ liệu
Định nghĩa interface Product giúp mô tả chính xác các thuộc tính của sản phẩm như id, name, price,....

Thuộc tính discount? (với dấu hỏi chấm) thể hiện đây là dữ liệu tùy chọn, có thể có sản phẩm giảm giá và có sản phẩm không.

🛠️ 3. Thư viện Ant Design sử dụng
Dự án này giúp làm quen với các component phổ biến của Ant Design:
| Component | Mục đích sử dụng |
| :--- | :--- |
| Input | Nhập văn bản tìm kiếm. |
| Select | Chọn danh mục sản phẩm. |
| Row, Col | Tạo bố cục lưới (Grid) chuyên nghiệp. |
| Card, Tag, Rate | Hiển thị thông tin sản phẩm đẹp mắt và trực quan. |

✅ 4. Kết quả đạt được

### 🗂️ Tổ chức dự án

- Biết cách tạo cấu trúc thư mục `src/components/` rõ ràng, mỗi component nằm trong một file riêng biệt, dễ tìm kiếm và bảo trì.
- Hiểu nguyên tắc **Single Responsibility**: mỗi component chỉ đảm nhận một nhiệm vụ duy nhất (`SearchBar` chỉ tìm kiếm, `CategoryFilter` chỉ lọc danh mục,...).

### ⚛️ React & TypeScript

- Thực hành khai báo và sử dụng `useState` để quản lý trạng thái `search` và `category` tại component cha (`App.tsx`).
- Nắm vững cơ chế **Props** (truyền dữ liệu từ cha xuống con) và **Callback** (gửi sự kiện từ con lên cha thông qua hàm `onSearch`, `onSelectCategory`).
- Định nghĩa `interface Product` trong TypeScript để mô tả cấu trúc dữ liệu rõ ràng, giúp trình biên dịch bắt lỗi sớm ngay lúc code.
- Sử dụng thuộc tính **optional** (`discount?`) để xử lý dữ liệu có thể có hoặc không có, tránh lỗi runtime.
- Khai báo mảng dữ liệu tĩnh `const products: Product[]` đúng kiểu, giải quyết lỗi `Cannot find name` và `implicitly has an 'any' type`.

### 🔍 Logic lọc dữ liệu

- Xây dựng hàm lọc kết hợp 2 điều kiện (tìm kiếm theo tên **AND** lọc theo danh mục) mà không làm thay đổi mảng dữ liệu gốc.
- Áp dụng `toLowerCase()` ở cả hai vế để tìm kiếm không phân biệt chữ hoa/thường.
- Xử lý trường hợp "All" bằng cách reset `category` về chuỗi rỗng `""` thay vì dùng giá trị đặc biệt.

### 🎨 Ant Design

- Làm quen và sử dụng thành thạo các component: `Input`, `Select`, `Row`, `Col`, `Card`, `Card.Meta`, `Tag`, `Rate`.
- Hiểu cách chuyển đổi mảng dữ liệu đơn giản sang định dạng `{ label, value }` mà `Select` yêu cầu.
- Tận dụng hệ thống Grid (`Row` + `Col` với `gutter`) để tạo bố cục danh sách sản phẩm tự động co giãn.

### 🐛 Debug & Sửa lỗi

- Đọc hiểu thông báo lỗi TypeScript (`TS2304`, `TS7006`) và xác định đúng nguyên nhân gốc rễ.
- Biết cách tra cứu lỗi và sửa bằng cách bổ sung khai báo kiểu còn thiếu thay vì dùng `any`.

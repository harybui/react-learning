# Học phần: Mini Task Manager (React + TypeScript)

Tài liệu này tổng hợp rõ ràng những gì đã học trong bài Mini Task Manager, các lỗi thường gặp khi làm bài, và cách khắc phục theo hướng dễ bảo trì, dễ mở rộng.

## 1) Mục tiêu bài học

- Xây dựng ứng dụng quản lý công việc đơn giản bằng React.
- Tách logic nghiệp vụ khỏi UI bằng custom hook.
- Dùng Context để chia sẻ trạng thái giao diện (theme) giữa nhiều component.
- Thực hành TypeScript cho Props, state và dữ liệu danh sách.
- Làm quen bộ hook cốt lõi: useState, useEffect, useMemo, useCallback, useContext, useRef.

## 2) Kiến thức đã học chi tiết

### 2.1 Kiến trúc component rõ ràng

Cấu trúc chính:

- src/App.tsx: điều phối tổng, render bố cục chính.
- src/context/ThemeContext.tsx: quản lý light/dark mode.
- src/hooks/useTasks.ts: chứa toàn bộ logic task (thêm/xóa/toggle/lọc/thống kê/loading).
- src/components/TaskInput.tsx: ô nhập và nút thêm task.
- src/components/TaskItem.tsx: hiển thị từng task + checkbox + xóa.

Ý nghĩa:

- Dễ đọc vì mỗi file chỉ làm một nhiệm vụ.
- Dễ test từng phần: logic, hiển thị, context.
- Dễ mở rộng tính năng mà không làm file chính quá lớn.

### 2.2 Custom Hook useTasks

Kiến thức chính:

- useState: lưu danh sách task, filter, loading.
- useEffect: giả lập gọi API và cleanup timer để tránh memory leak.
- useCallback: ghi nhớ hàm add/delete/toggle để hạn chế tạo lại hàm khi re-render.
- useMemo: tối ưu filteredTasks và stats, chỉ tính lại khi dependency thay đổi.

Giá trị đạt được:

- Tách business logic khỏi UI.
- Có thể tái sử dụng logic ở màn hình khác.
- Dễ debug hơn khi lỗi xảy ra.

### 2.3 Theme Context

Kiến thức chính:

- Tạo ThemeContext và custom hook useTheme.
- Bọc app bằng ThemeProvider để các component con truy cập được theme.
- toggleTheme chuyển qua lại giữa light/dark.

Lưu ý:

- Nên kiểm tra context trong useTheme để cảnh báo khi dùng ngoài Provider.
- Có thể mở rộng lưu theme vào localStorage để nhớ lựa chọn người dùng.

### 2.4 Controlled Input và xử lý sự kiện

TaskInput là controlled component:

- value lấy từ state.
- onChange cập nhật state theo từng ký tự.
- onKeyDown cho phép bấm Enter để thêm nhanh.

useRef + useEffect:

- Tự động focus vào input khi vào trang.
- Sau khi thêm task xong, focus lại input để nhập tiếp.

### 2.5 Quản lý danh sách theo hướng immutable

Thêm task:

- Tạo object task mới, nối vào mảng cũ bằng spread hoặc functional update.

Xóa task:

- Dùng filter để tạo mảng mới không chứa task bị xóa.

Toggle done:

- Dùng map để cập nhật đúng phần tử cần đổi trạng thái.

Ý nghĩa:

- React nhận biết state thay đổi và render lại đúng cách.
- Giảm lỗi do cập nhật sai tham chiếu dữ liệu.

### 2.6 Lọc dữ liệu và thống kê

Lọc task theo 3 trạng thái:

- all: tất cả.
- active: chưa hoàn thành.
- done: đã hoàn thành.

Thống kê:

- total, done, active được tính từ danh sách gốc.
- UI hiển thị số liệu cập nhật theo thời gian thực.

### 2.7 TypeScript trong dự án

Điểm học được:

- Định nghĩa interface Task để ép kiểu rõ ràng.
- Định nghĩa Props cho từng component để tránh truyền sai dữ liệu.
- Dùng union type cho filter và theme để giới hạn giá trị hợp lệ.

Lợi ích:

- Bắt lỗi sớm ngay lúc code.
- Gợi ý code tốt hơn trong editor.
- Refactor an toàn hơn.

## 3) Lỗi thường gặp và cách khắc phục

### Lỗi 1: Không đổi được theme hoặc nút theme khó thấy

Biểu hiện:

- Bấm nút nhưng giao diện gần như không thay đổi.
- Màu button/header không rõ, người dùng tưởng chưa có chức năng.

Nguyên nhân:

- CSS mặc định của template Vite (color-scheme, button style) ghi đè style app.
- Nút theme quá nhỏ, nền trong suốt, độ tương phản thấp.

Cách khắc phục:

- Dọn file index.css, bỏ các style mặc định gây xung đột.
- Tăng kích thước, padding, độ tương phản của nút theme.
- Dùng nhãn rõ ràng: Light Mode / Dark Mode.
- Truyền biến isDark xuống component con để đồng bộ màu sắc.

### Lỗi 2: UI nhỏ, khó thao tác

Biểu hiện:

- Khung task, input, filter button, checkbox hiển thị quá nhỏ.

Nguyên nhân:

- Width/padding/font-size đang ở mức mặc định của template.

Cách khắc phục:

- Tăng width card, padding, font-size tổng thể.
- Tăng kích thước checkbox, nút action, khoảng cách giữa các hàng.
- Dùng bố cục responsive để không vỡ trên màn hình nhỏ.

### Lỗi 3: Task thêm vào nhưng không cập nhật đúng

Biểu hiện:

- Thêm/xóa/toggle có lúc không render đúng.

Nguyên nhân:

- Cập nhật state theo cách mutate trực tiếp mảng hoặc object.

Cách khắc phục:

- Luôn dùng immutable update.
- Thêm: tạo mảng mới.
- Xóa: dùng filter.
- Toggle: dùng map và tạo object mới.

### Lỗi 4: Dùng hook sai phạm vi

Biểu hiện:

- Runtime error với useTheme hoặc context nhận null.

Nguyên nhân:

- Gọi useTheme ở component không nằm trong ThemeProvider.

Cách khắc phục:

- Bọc toàn bộ cây component cần theme bằng ThemeProvider.
- Giữ kiểm tra throw error trong useTheme để phát hiện sớm.

### Lỗi 5: setTimeout gây warning khi unmount

Biểu hiện:

- Cảnh báo cập nhật state trên component đã unmount.

Nguyên nhân:

- Timer trong useEffect chưa được cleanup.

Cách khắc phục:

- Trả về hàm cleanup clearTimeout trong useEffect.

### Lỗi 6: Props không khớp sau khi mở rộng giao diện

Biểu hiện:

- TypeScript báo thiếu prop, ví dụ thêm isDark nhưng chưa truyền cho component.

Nguyên nhân:

- Đã cập nhật interface Props ở component con, nhưng component cha chưa truyền đầy đủ.

Cách khắc phục:

- Đồng bộ thay đổi từ interface đến nơi sử dụng component.
- Kiểm tra lại toàn bộ nơi render component sau mỗi lần đổi Props.

## 4) Best practices rút ra từ bài học

- Tách logic và UI: hook xử lý dữ liệu, component tập trung hiển thị.
- Đặt tên hàm rõ nghĩa: addTask, deleteTask, toggleTask, setFilter.
- Ưu tiên functional update khi state phụ thuộc giá trị trước đó.
- Dùng useMemo/useCallback có mục đích, không lạm dụng.
- Giữ style nhất quán theo theme, tránh để style global ghi đè logic trong app.

## 5) Hướng mở rộng để thực hành thêm

- Lưu tasks vào localStorage để dữ liệu không mất khi reload.
- Lưu theme vào localStorage để nhớ chế độ đã chọn.
- Thêm tính năng sửa task và deadline.
- Thêm sắp xếp task theo ngày tạo hoặc mức ưu tiên.
- Thêm nhắc việc khi task sắp đến hạn hoặc quá hạn.

## 6) Tổng kết

Sau bài này, bạn đã nắm được cách kết hợp nhiều hook React trong một bài toán thực tế, biết cách tách cấu trúc dự án để dễ mở rộng, và biết xử lý các lỗi phổ biến liên quan đến theme, state, Props và CSS xung đột. Đây là nền tảng rất tốt để chuyển sang các bài có API thật, quản lý state lớn hơn, hoặc tích hợp thư viện UI trong dự án React TypeScript.

# 📔 Học phần: State & Event Handling trong React

Tài liệu này tổng hợp toàn bộ kiến thức và kỹ năng đạt được sau khi hoàn thành dự án **State & Event Handling** — bộ ba bài tập thực hành về quản lý trạng thái và xử lý sự kiện trong React.

---

## 🗂️ Tổng quan dự án

Dự án gồm 3 component thực hành độc lập:

| Component | Chức năng |
| :--- | :--- |
| `ToggleSwitch.tsx` | Nút bấm chuyển đổi trạng thái ON / OFF |
| `InputCounter.tsx` | Nhập số, lưu vào danh sách và tính tổng |
| `Counter.tsx` | Đếm số lần bấm, kết hợp nhiều counter để tính tổng chung |

---

## 🧠 Kiến thức đạt được

---

### 1. `useState` — Quản lý trạng thái trong component

> **State** là dữ liệu mà React "ghi nhớ" và tự động cập nhật lại giao diện mỗi khi nó thay đổi.

**Cú pháp:**
```tsx
const [giaTri, setGiaTri] = useState(giaTriKhoiDau);
```

**Ví dụ thực tế từ `ToggleSwitch.tsx`:**
```tsx
const [isOn, setIsOn] = useState(false); // ban đầu là OFF

const handleToggle = () => {
  setIsOn(!isOn); // đảo ngược trạng thái
};
```
- `isOn` là giá trị hiện tại — `false` = OFF, `true` = ON.
- `setIsOn(!isOn)` gọi hàm cập nhật, React tự render lại UI.
- **Không bao giờ** sửa trực tiếp `isOn = true` — phải dùng `setIsOn`.

---

### 2. Xử lý sự kiện (Event Handling)

> Sự kiện là hành động của người dùng: bấm nút, gõ phím, chọn...

**Hai cách viết phổ biến:**

```tsx
// Cách 1: Hàm inline (ngắn gọn, dùng khi logic đơn giản)
<Button onClick={() => setIsOn(!isOn)}>Toggle</Button>

// Cách 2: Hàm riêng (dễ đọc hơn khi logic phức tạp)
const handleToggle = () => {
  setIsOn(!isOn);
};
<Button onClick={handleToggle}>Toggle</Button>
```

**Lưu ý quan trọng:**
```tsx
// ✅ Đúng — truyền hàm, gọi khi bấm
<button onClick={handleToggle}>

// ❌ Sai — gọi hàm ngay lập tức khi render
<button onClick={handleToggle()}>
```

---

### 3. Làm việc với mảng trong State

> **Ví dụ từ `InputCounter.tsx`:** Mỗi lần bấm "Add", số mới được thêm vào danh sách.

```tsx
const [numbers, setNumbers] = useState<number[]>([]); // mảng rỗng ban đầu

const addNumber = () => {
  setNumbers([...numbers, Number(value)]); // tạo mảng MỚI, không sửa mảng cũ
  setValue(""); // xóa ô input sau khi thêm
};
```

**Tại sao dùng `[...numbers, số_mới]` thay vì `numbers.push()`?**

React so sánh tham chiếu để biết state có thay đổi không. `push()` sửa trực tiếp mảng cũ nên React **không phát hiện** được sự thay đổi → UI không cập nhật. Dùng spread `...` để tạo mảng mới hoàn toàn.

**Tính tổng với `reduce`:**
```tsx
const total = numbers.reduce((sum, n) => sum + n, 0);
// reduce duyệt qua từng phần tử, cộng dồn vào sum, bắt đầu từ 0
```

---

### 4. Đọc giá trị từ Input

```tsx
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

- `value={value}` — Ant Design Input nhận giá trị từ state (controlled component).
- `onChange={(e) => setValue(e.target.value)}` — mỗi lần gõ phím, cập nhật state.
- `e.target.value` — là chuỗi văn bản hiện tại trong ô input.

---

### 5. State Lifting — Nâng State lên Component Cha

> Khi **nhiều component cần dùng chung một dữ liệu**, hãy đưa state lên component cha và truyền xuống qua Props.

**Vấn đề:** `App.tsx` cần tính `countA + countB`, nhưng nếu state nằm trong từng `Counter` riêng thì `App` không thể truy cập được.

**Giải pháp — State Lifting:**

```
App.tsx (cha)
├── state: countA, countB   ← state nằm ở đây
├── <Counter value={countA} onIncrease={...} />
├── <Counter value={countB} onIncrease={...} />
└── <h3>Total: {countA + countB}</h3>   ← tính được tổng
```

**`App.tsx` — quản lý state và truyền xuống:**
```tsx
const [countA, setCountA] = useState(0);
const [countB, setCountB] = useState(0);

<Counter value={countA} onIncrease={() => setCountA(countA + 1)} />
<Counter value={countB} onIncrease={() => setCountB(countB + 1)} />
<h3>Total: {countA + countB}</h3>
```

**`Counter.tsx` — chỉ nhận và hiển thị, không tự quản lý state:**
```tsx
interface Props {
  value: number;
  onIncrease: () => void;
}

const Counter = ({ value, onIncrease }: Props) => {
  return <button onClick={onIncrease}>{value}</button>;
};
```

**Luồng dữ liệu:**
```
App (cha) ──── value={countA} ────► Counter (con)   [Props: cha → con]
App (cha) ◄─── onIncrease() ──────  Counter (con)   [Callback: con → cha]
```

---

### 6. Props & Callback Pattern

> **Props** truyền dữ liệu từ cha xuống con. **Callback** là hàm cha truyền cho con để con báo lại khi có sự kiện.

```tsx
// Cha truyền hàm callback xuống
<Counter onIncrease={() => setCountA(countA + 1)} />

// Con gọi callback khi người dùng bấm nút
<button onClick={onIncrease}>{value}</button>
```

Nhờ pattern này, **logic xử lý dữ liệu** nằm ở cha, còn **logic hiển thị** nằm ở con — tách biệt rõ ràng.

---

### 7. TypeScript Interface cho Props

> `interface` mô tả "hợp đồng" — component nhận đúng loại dữ liệu nào.

```tsx
interface Props {
  value: number;       // bắt buộc, phải là số
  onIncrease: () => void; // bắt buộc, phải là hàm không tham số, không trả về gì
}
```

**Lợi ích:**
- TypeScript báo lỗi ngay khi truyền sai kiểu dữ liệu.
- Editor gợi ý tên props khi gõ code (IntelliSense).
- Code tự document hóa — đọc interface là biết component cần gì.

---

## 🐛 Lỗi thường gặp & Cách sửa

| Lỗi | Nguyên nhân | Cách sửa |
| :--- | :--- | :--- |
| `Property 'value' does not exist` | Component không khai báo Props | Thêm `interface Props` và nhận qua tham số |
| `'X' is declared but never read` | Import component nhưng không dùng (bị comment) | Xóa dòng import thừa |
| UI không cập nhật khi dùng `push()` | Sửa trực tiếp mảng cũ | Dùng spread `[...arr, newItem]` |
| Hàm bị gọi ngay khi render | Viết `onClick={fn()}` thay vì `onClick={fn}` | Bỏ dấu `()` hoặc bọc trong arrow function |

---

## ✅ Tổng kết kỹ năng đạt được

- ✅ Khai báo và sử dụng `useState` để lưu trữ và cập nhật trạng thái.
- ✅ Xử lý các sự kiện người dùng: `onClick`, `onChange`.
- ✅ Hiểu sự khác biệt giữa **state nội bộ** và **state được nâng lên cha** (State Lifting).
- ✅ Truyền dữ liệu từ cha xuống con bằng **Props** và gửi sự kiện ngược lại bằng **Callback**.
- ✅ Cập nhật mảng trong state một cách đúng chuẩn React (immutable update).
- ✅ Định nghĩa `interface` trong TypeScript để kiểm soát kiểu Props.
- ✅ Đọc hiểu và sửa lỗi TypeScript liên quan đến Props và kiểu dữ liệu.
- ✅ Tách biệt logic xử lý dữ liệu (cha) và logic hiển thị (con).

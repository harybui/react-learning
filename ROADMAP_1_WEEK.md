# 🗺️ ROADMAP HỌC REACT TRONG 1 TUẦN — BEGINNERS

> Kết hợp: Workspace hiện tại + [Mosh Hamedani — React for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk)

---

## 📌 TRƯỚC KHI BẮT ĐẦU — Kiến thức cần có

| Yêu cầu                                        | Mức độ          |
| ---------------------------------------------- | --------------- |
| HTML/CSS cơ bản                                | ✅ Bắt buộc     |
| JavaScript cơ bản (biến, hàm, array, object)   | ✅ Bắt buộc     |
| Arrow function, Destructuring, Spread operator | ✅ Bắt buộc     |
| TypeScript cơ bản (interface, type)            | 🔶 Khuyến khích |

---

## 📅 NGÀY 1 — KHỞI ĐỘNG: React là gì? Tạo dự án đầu tiên

### 🎯 Mục tiêu

Hiểu React là gì, tạo được project Vite + React, chạy được `npm run dev`.

---

### 📖 Bài 1.1 — React là gì và tại sao dùng React?

**React là một JavaScript library** do Facebook tạo ra để xây dựng giao diện người dùng (UI).

**Tại sao dùng React thay vì HTML thuần?**

- HTML thuần: khi dữ liệu thay đổi → bạn phải tự cập nhật DOM thủ công (rất phức tạp)
- React: khi dữ liệu thay đổi → React **tự động** cập nhật lại phần UI liên quan

**Khái niệm Virtual DOM:**

- React tạo ra một "bản sao ảo" của DOM trong bộ nhớ
- Khi state thay đổi, React so sánh Virtual DOM cũ và mới → chỉ cập nhật đúng phần thay đổi
- → Nhanh hơn, hiệu quả hơn

```
DOM thật (chậm) ←→ Virtual DOM (nhanh, trong RAM) ← React quản lý
```

---

### 📖 Bài 1.2 — Tạo project với Vite

```bash
# Mở terminal, chạy lệnh:
npm create vite@latest react-app -- --template react-ts
cd react-app
npm install
npm run dev
```

**Giải thích cấu trúc thư mục:**

```
react-app/
├── src/              ← Viết code ở đây
│   ├── App.tsx       ← Component gốc (root component)
│   ├── main.jsx      ← Điểm khởi động ứng dụng
│   └── assets/       ← Hình ảnh, fonts...
├── index.html        ← File HTML duy nhất (Single Page App)
├── vite.config.js    ← Cấu hình Vite
└── package.json      ← Danh sách thư viện
```

**`main.jsx` làm gì?**

```jsx
// main.jsx — điểm bắt đầu của toàn bộ React app
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Lấy thẻ <div id="root"> trong index.html
// Render component App vào trong đó
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

### 📖 Bài 1.3 — JSX là gì?

**JSX = JavaScript + XML** — cú pháp đặc biệt cho phép viết HTML bên trong JavaScript.

```jsx
// ❌ Không phải HTML thật — đây là JSX
function App() {
  const name = "Mosh";
  return (
    <div>
      <h1>Hello, {name}!</h1> {/* {} để nhúng JS vào JSX */}
    </div>
  );
}
```

**Những điểm khác nhau giữa JSX và HTML:**

| HTML                   | JSX                              |
| ---------------------- | -------------------------------- |
| `class="..."`          | `className="..."`                |
| `for="..."`            | `htmlFor="..."`                  |
| `<br>`                 | `<br />` (phải tự đóng)          |
| Thuộc tính viết thường | camelCase: `onClick`, `onChange` |

---

### 🛠️ BÀI TẬP NGÀY 1

1. Tạo project Vite React TypeScript mới
2. Xóa code mặc định trong `App.tsx`, viết lại component hiển thị tên bạn
3. Thêm 1 biến `city = "Hà Nội"` và hiển thị trong JSX

---

## 📅 NGÀY 2 — COMPONENTS & PROPS

### 🎯 Mục tiêu

Tạo được component tái sử dụng, truyền dữ liệu vào component qua Props.

---

### 📖 Bài 2.1 — Component là gì?

**Component = khối xây dựng (building block) của React.**

Hãy nghĩ giao diện như bộ LEGO — mỗi mảnh LEGO là một component.

```
App
├── Header
│   ├── Logo
│   └── NavBar
├── MainContent
│   ├── ListGroup
│   └── Card
└── Footer
```

**Quy tắc đặt tên:** Component **phải** bắt đầu bằng chữ HOA (`Button`, không phải `button`)

```tsx
// ✅ Đúng — Function Component
function Button() {
  return <button>Click me</button>;
}

// ✅ Cũng đúng — Arrow Function Component
const Button = () => {
  return <button>Click me</button>;
};

// Dùng component trong JSX như thẻ HTML
function App() {
  return <Button />;
}
```

---

### 📖 Bài 2.2 — Props (thuộc tính của component)

**Props = cách truyền dữ liệu từ component cha xuống component con.**

Giống như HTML `<img src="..." alt="...">` — bạn truyền thuộc tính vào component.

```tsx
// Bước 1: Định nghĩa kiểu Props với TypeScript interface
interface Props {
  children: string; // nội dung bên trong thẻ
  color: string; // màu button
  onClick: () => void; // hàm được gọi khi click
}

// Bước 2: Dùng destructuring để lấy props
const Button = ({ children, color, onClick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

// Bước 3: Truyền props khi dùng component
function App() {
  return (
    <Button color="primary" onClick={() => console.log("clicked!")}>
      Click me
    </Button>
  );
}
```

**📂 File trong workspace của bạn:** `src/components/Button.tsx` — đây chính xác là pattern này!

---

### 📖 Bài 2.3 — Children Prop & ReactNode

Khi bạn muốn component nhận **bất kỳ nội dung HTML nào** (không chỉ text):

```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode; // ReactNode = string | JSX | number | null | ...
  onClose?: () => void; // ? = optional prop
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div className="alert alert-primary">
      {children}
      <button onClick={onClose}>×</button>
    </div>
  );
};

// Dùng: có thể truyền bất kỳ nội dung nào
<Alert onClose={() => {}}>
  Đây là <strong>cảnh báo</strong> quan trọng!
</Alert>;
```

**📂 File trong workspace của bạn:** `src/components/Alert.tsx` — chính là ví dụ này.

---

### 📖 Bài 2.4 — Render danh sách với `.map()`

```tsx
interface Props {
  items: string[];
  heading: string;
  onSelectedItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectedItem }: Props) {
  return (
    <>
      <h1>{heading}</h1>

      {/* Conditional rendering: nếu mảng rỗng thì hiện thông báo */}
      {items.length === 0 && <p>Không có dữ liệu</p>}

      <ul>
        {items.map((item, index) => (
          // KEY là bắt buộc khi render danh sách — giúp React nhận diện từng item
          <li key={item} onClick={() => onSelectedItem(item)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

**Tại sao cần `key`?**

- React dùng `key` để biết element nào thay đổi, thêm, hoặc xóa
- Dùng ID duy nhất từ database, hoặc value nếu unique
- **Không dùng `index` làm key** nếu có thể (gây bug khi reorder)

---

### 🛠️ BÀI TẬP NGÀY 2

1. Tạo component `ProductCard` nhận props: `name`, `price`, `imageUrl`
2. Tạo mảng 5 sản phẩm, render bằng `.map()` với `key`
3. Thêm prop optional `discount?: number` và hiển thị nếu có

---

## 📅 NGÀY 3 — STATE & EVENT HANDLING

### 🎯 Mục tiêu

Hiểu State là gì, dùng `useState`, xử lý sự kiện người dùng.

---

### 📖 Bài 3.1 — State là gì? Tại sao không dùng biến thường?

```tsx
// ❌ SAI — biến thường không trigger re-render
function Counter() {
  let count = 0;
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => count++}>Tăng</button>
      {/* Bấm nút: count thay đổi trong bộ nhớ nhưng UI KHÔNG cập nhật */}
    </div>
  );
}

// ✅ ĐÚNG — dùng useState
function Counter() {
  const [count, setCount] = useState(0);
  //     ↑ giá trị  ↑ hàm cập nhật

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      {/* Bấm nút: setCount → React re-render → UI cập nhật ✅ */}
    </div>
  );
}
```

**Quy tắc vàng:** Khi dữ liệu thay đổi cần cập nhật UI → dùng **State**.

---

### 📖 Bài 3.2 — useState Hook chi tiết

```tsx
import { useState } from "react";

function MyComponent() {
  // Cú pháp: const [tên_state, hàm_setter] = useState(giá_trị_ban_đầu)
  const [count, setCount] = useState(0); // number
  const [name, setName] = useState("Mosh"); // string
  const [isVisible, setIsVisible] = useState(false); // boolean
  const [items, setItems] = useState<string[]>([]); // array

  // ❌ KHÔNG làm thế này — gây bug
  // count = 5;

  // ✅ Luôn dùng setter function
  // setCount(5);
}
```

**Hook là gì?**
Hook là các function đặc biệt của React bắt đầu bằng `use` — cho phép dùng các tính năng React trong function component.

**Quy tắc của Hook:**

1. Chỉ gọi Hook ở **top level** của component (không trong if, loop, nested function)
2. Chỉ gọi trong **React function component**

---

### 📖 Bài 3.3 — Event Handling

```tsx
function Form() {
  const [text, setText] = useState("");

  // Cách 1: Inline arrow function
  return <button onClick={() => console.log("clicked")}>Click</button>;
}

// Cách 2: Tách ra thành handler function (khuyến khích cho logic phức tạp)
function Form() {
  const [inputValue, setInputValue] = useState("");

  // Tên convention: handle + TênSựKiện
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn form reload trang
    console.log("Submitted:", inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### 📖 Bài 3.4 — Lifting State Up (Nâng State lên)

Khi 2 component con cần **chia sẻ state**, đặt state ở component cha chung.

```
App (state: alertVisible) ← state ở đây
├── Button → onClick={() => setAlertVisible(true)}
└── Alert  → onClose={() => setAlertVisible(false)}
```

```tsx
// Đây chính xác là pattern trong App.tsx của bạn!
function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>My alert</Alert>
      )}
      <Button color="secondary" onClick={() => setAlertVisible(true)}>
        Show Alert
      </Button>
    </div>
  );
}
```

---

### 🛠️ BÀI TẬP NGÀY 3

1. Tạo component `ToggleSwitch` — click để bật/tắt, đổi màu và text tương ứng
2. Tạo component `InputCounter` — input nhập số, hiển thị tổng các số đã nhập
3. Thực hành pattern "Lifting State Up": 2 component Counter chia sẻ tổng chung

---

## 📅 NGÀY 4 — STYLING & COMPONENT DESIGN

### 🎯 Mục tiêu

Biết các cách style trong React, dùng Bootstrap, CSS Modules, inline styles.

---

### 📖 Bài 4.1 — Các cách style trong React

**Cách 1: CSS thường (global)**

```tsx
// App.css
.my-button { color: red; }

// App.tsx
import './App.css';
<button className="my-button">Click</button>
```

**Cách 2: Inline Style**

```tsx
// Style là object JavaScript — thuộc tính dùng camelCase
<button style={{ backgroundColor: "red", fontSize: "16px" }}>Click</button>;

// Hoặc tách ra
const styles = {
  button: {
    backgroundColor: "blue",
    padding: "10px 20px",
    borderRadius: "5px",
  },
};
<button style={styles.button}>Click</button>;
```

**Cách 3: CSS Modules (khuyến khích)**

```css
/* Button.module.css */
.button {
  background: blue;
}
.button:hover {
  background: darkblue;
}
```

```tsx
import styles from "./Button.module.css";
<button className={styles.button}>Click</button>;
```

→ CSS Module tự động **scoped** — không bị xung đột với component khác.

**Cách 4: Bootstrap (đã cài trong project của bạn)**

```tsx
// main.jsx — import một lần ở đây
import "bootstrap/dist/css/bootstrap.min.css";

// Sau đó dùng class Bootstrap bình thường
<button className="btn btn-primary">Click</button>;
```

---

### 📖 Bài 4.2 — Dynamic ClassName

```tsx
// Cách 1: Template literal
<li className={`list-group-item ${isActive ? 'active' : ''}`}>
  {item}
</li>

// Cách 2: Nối chuỗi (trong workspace của bạn)
<button className={'btn btn-' + color}>Click</button>

// Cách 3: Thư viện clsx (cho trường hợp phức tạp)
import clsx from 'clsx';
<div className={clsx('base-class', { active: isActive, disabled: isDisabled })}>
```

---

### 📖 Bài 4.3 — Props Design — Dùng union type thay vì string tự do

```tsx
// ❌ Không tốt — color có thể là bất kỳ string nào
interface Props {
  color: string;
}

// ✅ Tốt hơn — giới hạn các giá trị hợp lệ
interface Props {
  color: "primary" | "secondary" | "danger" | "warning" | "success";
  size?: "sm" | "md" | "lg";
}

const Button = ({ color, size = "md" }: Props) => {
  // TypeScript sẽ báo lỗi nếu truyền màu không hợp lệ
  return <button className={`btn btn-${color} btn-${size}`}>Click</button>;
};
```

---

### 📖 Bài 4.4 — Tránh long className string với object mapping

```tsx
const colorClasses = {
  primary: "btn-primary",
  danger: "btn-danger",
  success: "btn-success",
};

const Button = ({ color }: { color: keyof typeof colorClasses }) => (
  <button className={`btn ${colorClasses[color]}`}>Click</button>
);
```

---

### 🛠️ BÀI TẬP NGÀY 4

1. Làm lại `Button.tsx` với union type cho prop `color` và thêm `size`
2. Tạo component `Badge` dùng CSS Module với 3 variant: success, warning, danger
3. Tạo component `Card` dùng Bootstrap với image, title, description, button

---

## 📅 NGÀY 5 — FORMS & CONTROLLED COMPONENTS

### 🎯 Mục tiêu

Xây dựng form với controlled components, validate input, xử lý submit.

---

### 📖 Bài 5.1 — Controlled vs Uncontrolled Component

**Uncontrolled (DOM tự quản lý):**

```tsx
// Dùng ref để lấy giá trị — không dùng state
const inputRef = useRef<HTMLInputElement>(null);
const handleSubmit = () => {
  console.log(inputRef.current?.value);
};
<input ref={inputRef} />;
```

**Controlled (React quản lý — khuyến khích):**

```tsx
// React là "single source of truth" cho giá trị input
const [value, setValue] = useState("");
<input
  value={value} // React kiểm soát giá trị
  onChange={(e) => setValue(e.target.value)} // cập nhật state khi user gõ
/>;
```

---

### 📖 Bài 5.2 — Xây dựng Form hoàn chỉnh

```tsx
interface FormData {
  name: string;
  email: string;
  age: number;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Generic handler cho tất cả input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Tên không được để trống";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ";
    if (formData.age < 0 || formData.age > 120)
      newErrors.age = "Tuổi không hợp lệ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên"
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}
      </div>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>
      <button type="submit">Gửi</button>
    </form>
  );
}
```

---

### 📖 Bài 5.3 — React Hook Form (thư viện phổ biến)

```bash
npm install react-hook-form
```

```tsx
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
}

function LoginForm() {
  const {
    register, // đăng ký input
    handleSubmit, // wrapper cho onSubmit
    formState: { errors }, // lỗi validation
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "Tên là bắt buộc", minLength: 3 })}
        placeholder="Tên"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("email", {
          required: "Email là bắt buộc",
          pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Đăng nhập</button>
    </form>
  );
}
```

---

### 🛠️ BÀI TẬP NGÀY 5

1. Tạo form đăng ký tài khoản: username, password, confirm password, email
2. Validate: username ≥ 3 ký tự, password ≥ 8 ký tự, confirm === password
3. Hiển thị thông báo thành công sau khi submit hợp lệ

---

## 📅 NGÀY 6 — useEffect & GỌI API

### 🎯 Mục tiêu

Hiểu side effects, gọi API với `useEffect`, xử lý loading/error states.

---

### 📖 Bài 6.1 — Side Effects là gì?

**Side Effect** = bất kỳ tác động nào ra bên ngoài phạm vi function component:

- Gọi API (fetch data)
- Đặt timer (`setTimeout`, `setInterval`)
- Thao tác trực tiếp với DOM
- Subscribe/unsubscribe event

```tsx
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // 1. Code side effect ở đây
    console.log("Component đã render xong!");

    // 2. Cleanup function (tùy chọn) — chạy khi component unmount
    return () => {
      console.log("Component bị xóa khỏi DOM");
    };
  }, []); // 3. Dependency array
  //    ↑ [] = chạy 1 lần sau render đầu tiên
}
```

**Dependency Array:**

| Cú pháp                           | Khi nào chạy?                       |
| --------------------------------- | ----------------------------------- |
| `useEffect(() => {...})`          | Sau **mỗi lần** render              |
| `useEffect(() => {...}, [])`      | Chỉ **một lần** sau render đầu tiên |
| `useEffect(() => {...}, [count])` | Khi `count` thay đổi                |

---

### 📖 Bài 6.2 — Gọi API cơ bản

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Gọi API khi component mount lần đầu
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi mạng");
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []); // Chỉ gọi 1 lần

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p className="text-danger">Lỗi: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} — {user.email}
        </li>
      ))}
    </ul>
  );
}
```

---

### 📖 Bài 6.3 — Dùng Axios (phổ biến hơn fetch)

```bash
npm install axios
```

```tsx
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Dùng AbortController để cancel request khi component unmount
    const controller = new AbortController();

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // Ignore cancelled requests
        setError(err.message);
        setIsLoading(false);
      });

    // Cleanup: cancel request nếu component unmount trước khi API trả về
    return () => controller.abort();
  }, []);

  //...
}
```

---

### 📖 Bài 6.4 — Custom Hook: tách logic ra khỏi UI

```tsx
// hooks/useUsers.ts — tách logic gọi API ra custom hook
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { users, isLoading, error }; // trả ra để component dùng
}

// Component giờ chỉ lo về UI
function UserList() {
  const { users, isLoading, error } = useUsers(); // ✨ clean và reusable

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🛠️ BÀI TẬP NGÀY 6

1. Gọi API `https://jsonplaceholder.typicode.com/posts` và hiển thị danh sách bài viết
2. Thêm nút "Load More" để tải thêm 10 bài mỗi lần
3. Tạo Custom Hook `usePosts()` tách logic khỏi component

---

## 📅 NGÀY 7 — ROUTING & DỰ ÁN TỔNG HỢP

### 🎯 Mục tiêu

Dùng React Router để tạo multi-page app, hoàn thiện một dự án nhỏ.

---

### 📖 Bài 7.1 — React Router

```bash
npm install react-router-dom
```

```tsx
// main.tsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

```tsx
// App.tsx
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  return (
    <>
      {/* Navigation */}
      <nav>
        <Link to="/">Trang chủ</Link>
        <Link to="/about">Giới thiệu</Link>
      </nav>

      {/* Định nghĩa Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />{" "}
        {/* Dynamic route */}
        <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </>
  );
}
```

```tsx
// pages/UserDetailPage.tsx
function UserDetailPage() {
  const { id } = useParams(); // lấy :id từ URL
  const navigate = useNavigate(); // navigate programmatically

  return (
    <div>
      <h1>User ID: {id}</h1>
      <button onClick={() => navigate("/")}>Về trang chủ</button>
    </div>
  );
}
```

---

### 📖 Bài 7.2 — useContext: chia sẻ state toàn cục

Khi state cần chia sẻ qua nhiều level component (tránh "props drilling"):

```tsx
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

// Provider: bọc quanh các component cần dùng context
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider
      value={{ isDark, toggle: () => setIsDark((d) => !d) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook để dùng context dễ hơn
export const useTheme = () => useContext(ThemeContext);
```

```tsx
// Dùng trong bất kỳ component nào
function Header() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header style={{ background: isDark ? "#333" : "#fff" }}>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
    </header>
  );
}
```

---

### 📖 Bài 7.3 — DỰ ÁN CUỐI TUẦN: Todo App

**Yêu cầu:**

- Thêm todo mới
- Đánh dấu hoàn thành (strike-through)
- Xóa todo
- Lọc: All / Active / Completed
- Lưu vào `localStorage` (persist khi refresh)

```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Khởi tạo từ localStorage nếu có
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Lưu vào localStorage mỗi khi todos thay đổi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h1>Todo App</h1>

      {/* Input */}
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Thêm todo..."
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Thêm
        </button>
      </div>

      {/* Filter */}
      <div className="btn-group mb-3">
        {(["all", "active", "completed"] as FilterType[]).map((f) => (
          <button
            key={f}
            className={`btn btn-outline-secondary ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="list-group">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-muted">
        {todos.filter((t) => !t.completed).length} items left
      </p>
    </div>
  );
}
```

---

## 📊 TỔNG KẾT ROADMAP

| Ngày | Chủ đề             | Concepts chính                                     |
| ---- | ------------------ | -------------------------------------------------- |
| 1    | Khởi động          | React là gì, Vite, JSX, cấu trúc project           |
| 2    | Components & Props | Props, children, interface, `.map()`, key          |
| 3    | State & Events     | `useState`, event handlers, lifting state          |
| 4    | Styling            | Bootstrap, CSS Modules, dynamic className          |
| 5    | Forms              | Controlled components, validation, react-hook-form |
| 6    | useEffect & API    | Side effects, fetch/axios, custom hooks            |
| 7    | Routing & Project  | React Router, useContext, project tổng hợp         |

---

## 📚 TÀI NGUYÊN THAM KHẢO

- 🎥 Video chính: [Mosh — React for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk)
- 📖 Docs chính thức: [react.dev](https://react.dev)
- 🅱️ Bootstrap: [getbootstrap.com](https://getbootstrap.com)
- 🔀 React Router: [reactrouter.com](https://reactrouter.com)
- ✅ TypeScript: [typescriptlang.org](https://www.typescriptlang.org)

---

## 🚦 TRẠNG THÁI HIỆN TẠI CỦA BẠN

Dựa trên workspace, bạn đã nắm được:

- ✅ Tạo Function Components với TypeScript
- ✅ Định nghĩa Props với `interface`
- ✅ `useState` hook cơ bản
- ✅ Event handling (`onClick`, `onClose`)
- ✅ Conditional rendering (`&&`)
- ✅ Render list với `.map()` và `key`
- ✅ `children` prop và `ReactNode`
- ✅ Lifting state up pattern
- ✅ Tích hợp Bootstrap

**→ Bạn đang ở cuối Ngày 3 đầu Ngày 4. Tiếp tục từ Bài 4.3 trở đi!**

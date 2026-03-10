# 📦 Product-List — Ghi chép chi tiết dự án

## 🎯 Mục tiêu dự án

Xây dựng một trang **danh sách sản phẩm** sử dụng React + TypeScript + Ant Design, nhằm thực hành các kiến thức nền tảng của React cho người mới bắt đầu.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ         | Phiên bản | Mục đích                              |
| ----------------- | --------- | ------------------------------------- |
| React             | 18.3.1    | UI library chính                      |
| TypeScript        | 5.6.2     | Type safety cho JS                    |
| Vite              | 5.4.10    | Build tool, dev server                |
| Ant Design (antd) | 6.3.2     | UI component library                  |
| Tailwind CSS      | 4.2.1     | Utility-first CSS (đã cài, chưa dùng) |

### Cài đặt thư viện

```bash
npm create vite@latest Product-List -- --template react-ts
npm install antd
npm install tailwindcss @tailwindcss/vite
```

---

## 📁 Cấu trúc thư mục

```
Product-List/
├── src/
│   ├── App.tsx              ← Component gốc, chứa data sản phẩm
│   ├── App.css              ← CSS cho App (hiện trống)
│   ├── index.css            ← CSS global
│   ├── main.tsx             ← Điểm khởi động: render App vào DOM
│   ├── vite-env.d.ts        ← Khai báo type cho Vite
│   ├── assets/
│   │   └── ERD2.png         ← Ảnh placeholder cho sản phẩm
│   └── components/
│       └── ProductCart.tsx  ← Component thẻ sản phẩm
├── vite.config.js
├── package.json
└── tsconfig.json
```

---

## 📖 Kiến thức React đã thực hành

---

### 1. Function Component

Mọi component trong React đều là một **function** trả về JSX.

```tsx
// Cách viết function component chuẩn
const ProductCart = () => {
  return <div>...</div>;
};

export default ProductCart;
```

**Quy tắc đặt tên:** Tên component phải bắt đầu bằng chữ **HOA** (`ProductCart`, không phải `productCart`).

---

### 2. Props & TypeScript Interface

**Props** là cơ chế truyền dữ liệu từ component cha xuống component con.

#### Định nghĩa Props với `interface`

```tsx
// ProductCart.tsx
interface Props {
  name: string; // bắt buộc — tên sản phẩm
  price: number; // bắt buộc — giá
  imageUrl: string; // bắt buộc — đường dẫn ảnh
  discount?: number; // optional (?) — có thể không truyền
}
```

#### Dùng Destructuring để nhận Props

```tsx
// Thay vì viết props.name, props.price...
// Dùng destructuring ngay trong tham số
const ProductCart = ({ name, price, imageUrl, discount }: Props) => {
  // Dùng trực tiếp: name, price, imageUrl, discount
};
```

#### Truyền Props từ component cha

```tsx
// App.tsx
<ProductCart
  name="Laptop"
  price={1000}
  imageUrl={ERD2}
  discount={10} // optional — có thể bỏ qua
/>
```

##### So sánh: có và không có optional prop `discount`

```tsx
// Truyền đủ
<ProductCart name="Laptop" price={1000} imageUrl={ERD2} discount={10} />

// Không truyền discount — vẫn hợp lệ vì discount?: number
<ProductCart name="Phone" price={800} imageUrl={ERD2} />
```

---

### 3. Render danh sách với `.map()`

Thay vì viết thủ công từng `<ProductCart />`, dùng `.map()` để render tự động từ mảng dữ liệu.

```tsx
// App.tsx
const products = [
  { name: "Laptop", price: 1000, imageUrl: ERD2, discount: 10 },
  { name: "Phone", price: 800, imageUrl: ERD2 },
  { name: "Tablet", price: 500, imageUrl: ERD2, discount: 5 },
  { name: "Keyboard", price: 120, imageUrl: ERD2 },
  { name: "Mouse", price: 60, imageUrl: ERD2 },
];

// Render toàn bộ danh sách bằng 1 dòng
{
  products.map((product) => (
    <Col key={product.name}>
      <ProductCart
        name={product.name}
        price={product.price}
        imageUrl={product.imageUrl}
        discount={product.discount}
      />
    </Col>
  ));
}
```

**Tại sao cần `key`?**

- React dùng `key` để phân biệt từng phần tử trong danh sách
- Khi state thay đổi, React biết chính xác element nào cần re-render
- `key` phải **unique** trong cùng một danh sách
- Dùng `id` từ database là tốt nhất; `name` chấp nhận được nếu unique

---

### 4. Conditional Rendering (Hiển thị có điều kiện)

Hiển thị hoặc ẩn UI dựa trên điều kiện — ở đây là chỉ hiển thị tag giảm giá khi `discount` tồn tại.

```tsx
// Dùng && (short-circuit evaluation)
// Nếu discount là undefined/null/0 → không render gì
// Nếu discount có giá trị → render <Tag>
{
  discount && (
    <Tag color="red" style={{ marginTop: 10 }}>
      Discount: {discount}%
    </Tag>
  );
}
```

**Cách hoạt động của `&&`:**

```
undefined && <Tag> → undefined (không render)
10        && <Tag> → <Tag>     (render)
```

---

### 5. Import ảnh trong Vite

Vite cho phép import file ảnh như một module JS:

```tsx
// App.tsx
import ERD2 from "./assets/ERD2.png";

// Sau đó dùng như biến thông thường
imageUrl: ERD2,
```

Vite sẽ tự động xử lý đường dẫn, hash file, và tối ưu hóa khi build production.

---

### 6. Ant Design Component Library

Ant Design cung cấp các component UI sẵn có, chuyên nghiệp.

#### Import và dùng `Card`

```tsx
import { Card, Tag } from "antd";

<Card
  cover={<img alt={name} src={imageUrl} />} // ảnh bìa
  style={{ width: 240 }}
>
  <Card.Meta
    title={name} // tiêu đề thẻ
    description={`Price: $${price}`} // mô tả
  />
</Card>;
```

#### Import và dùng `Row` / `Col` (Grid Layout)

```tsx
import { Row, Col } from "antd";

// Row = hàng ngang; Col = cột
// gutter = khoảng cách giữa các cột [ngang, dọc]
<Row gutter={[16, 16]}>
  <Col><ProductCart ... /></Col>
  <Col><ProductCart ... /></Col>
</Row>
```

#### Import CSS của Ant Design

```tsx
// main.tsx — import một lần toàn bộ CSS của antd
import "antd/dist/antd.css";
```

#### Các component Ant Design đã dùng

| Component   | Import              | Mục dích                        |
| ----------- | ------------------- | ------------------------------- |
| `Card`      | `antd`              | Thẻ hiển thị thông tin sản phẩm |
| `Card.Meta` | (nested trong Card) | Tiêu đề + mô tả                 |
| `Tag`       | `antd`              | Nhãn giảm giá màu đỏ            |
| `Row`       | `antd`              | Layout hàng ngang               |
| `Col`       | `antd`              | Layout cột trong Row            |

---

### 7. Inline Style trong React

Khác với HTML, style trong React dùng **object JavaScript** với **camelCase**:

```tsx
// HTML: style="margin-top: 10px; width: 240px"
// React:
style={{ marginTop: 10, width: 240 }}

//         ↑ camelCase       ↑ số tự hiểu là px
```

Dùng 2 dấu ngoặc nhọn:

- Ngoài `{}` = nhúng JS vào JSX
- Trong `{}` = object literal

---

### 8. Template Literal trong JSX

```tsx
// Nối chuỗi với giá trị động
description={`Price: $${price}`}
// Nếu price = 1000 → "Price: $1000"
```

---

## 💡 Điểm cần ghi nhớ

### Props optional vs required

```tsx
interface Props {
  name: string; // ✅ required — PHẢI truyền
  discount?: number; // ✅ optional — CÓ THỂ bỏ qua
}
```

### Khi nào dùng JSX `{}` ?

```tsx
// {} để nhúng bất kỳ biểu thức JavaScript nào vào JSX
<h1>{name}</h1>              // biến
<p>{price * 0.9}</p>         // phép tính
<Tag>{discount}%</Tag>       // template
{discount && <Tag>...</Tag>} // conditional
{items.map(i => <li>{i}</li>)} // loop
```

### Khác biệt JSX vs HTML

| HTML                | JSX                        |
| ------------------- | -------------------------- |
| `class="..."`       | `className="..."`          |
| `style="color:red"` | `style={{ color: 'red' }}` |
| `<img src="...">`   | `<img src="..." />`        |

---

## 🚀 Chạy dự án

```bash
cd C:\OSP\React\Product-List
npm install
npm run dev
# Mở http://localhost:5173
```

---

## 📌 Các bước tiếp theo (Next Steps)

- [ ] Thêm `useState` để quản lý giỏ hàng (cart)
- [ ] Thêm nút "Add to Cart" vào `ProductCart`
- [ ] Hiển thị số lượng sản phẩm trong giỏ
- [ ] Dùng `useEffect` để fetch dữ liệu từ API thay vì hardcode
- [ ] Thêm filter theo category
- [ ] Tích hợp React Router: trang danh sách → trang chi tiết sản phẩm

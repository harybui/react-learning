import { Row, Col } from "antd";
import ProductCart from "./components/ProductCart";
import "./App.css";
import ERD2 from "./assets/ERD2.png";
function App() {
  const products = [
    {
      name: "Laptop",
      price: 1000,
      imageUrl: ERD2,
      discount: 10,
    },
    {
      name: "Phone",
      price: 800,
      imageUrl: ERD2,
    },
    {
      name: "Tablet",
      price: 500,
      imageUrl: ERD2,
      discount: 5,
    },
    {
      name: "Keyboard",
      price: 120,
      imageUrl: ERD2,
    },
    {
      name: "Mouse",
      price: 60,
      imageUrl: ERD2,
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <h1>Product List</h1>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.name}>
            <ProductCart
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              discount={product.discount}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;

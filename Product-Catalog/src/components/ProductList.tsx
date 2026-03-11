import { Row, Col } from "antd";
import ProductCard from "./ProductCard";
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  discount?: number;
}
interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category}
            rating={product.rating}
            discount={product.discount}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;

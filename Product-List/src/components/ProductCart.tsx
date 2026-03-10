import { Card, Tag } from "antd";
interface Props {
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
}
const ProductCart = ({ name, price, imageUrl, discount }: Props) => {
  return (
    <Card
      cover={<img alt={name} src={imageUrl} />}
      style={{ width: 240 }}
    >
      <Card.Meta title={name} description={`Price: $${price}`} />
      {discount && (
        <Tag color="red" style={{ marginTop: 10 }}>
          Discount: {discount}%
        </Tag>
      )}
    </Card>
  );
};

export default ProductCart;

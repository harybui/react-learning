import { Card, Tag, Rate } from "antd";
interface Props {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  discount?: number;
}
const ProductCard = ({
  name,
  price,
  imageUrl,
  category,
  rating,
  discount,
}: Props) => {
  return <Card
    hoverable
    cover={<img src={imageUrl} alt={name} />}
    style={{width:240}}
  >
    <Card.Meta title={name} description={`Price: $${price}`} />
    <div style={{marginTop:10}}>
        <Tag color={"blue"}>
            {category}
        </Tag>
        {discount && (<Tag color="red"> -{discount}%</Tag>)}
    </div>
    <Rate disabled defaultValue={rating} />
  </Card>;
};

export default ProductCard;

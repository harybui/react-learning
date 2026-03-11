import { Select } from "antd";
interface Props {
  categories: string[];
  onSelectCategory: (category: string) => void;
}
const CategoryFilter = ({ categories, onSelectCategory }: Props) => {
  return (
    <Select
      placeholder="Select Category"
      style={{ width: 200, marginBottom: 20 }}
      onChange={onSelectCategory}
      options={categories.map((cat) => ({ label: cat, value: cat }))}
    />
  );
};

export default CategoryFilter;

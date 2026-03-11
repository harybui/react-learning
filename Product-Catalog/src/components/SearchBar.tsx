import { Input } from "antd"

interface Props{
    onSearch:(value : string) => void
}
const SearchBar = ({ onSearch }: Props) => {
  return (
    <div>
      <Input placeholder="Search products..." 
      onChange={(e) => onSearch(e.target.value)}
      style={{width:300, marginBottom:20}}
      />
    </div>
  )

}
export default SearchBar
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  discount?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299,
    imageUrl: "https://placehold.co/240x160?text=Laptop",
    category: "Electronics",
    rating: 4,
    discount: 10,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 29,
    imageUrl: "https://placehold.co/240x160?text=Mouse",
    category: "Accessories",
    rating: 5,
  },
  {
    id: 3,
    name: "Smartphone X",
    price: 899,
    imageUrl: "https://placehold.co/240x160?text=Phone",
    category: "Electronics",
    rating: 4,
    discount: 5,
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 49,
    imageUrl: "https://placehold.co/240x160?text=Hub",
    category: "Accessories",
    rating: 3,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Catalog</h1>

      <SearchBar onSearch={setSearch} />

      <CategoryFilter
        categories={["All","Electronics", "Accessories"]}
        onSelectCategory={(val) => setCategory(val === "All" ? "" : val)}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;

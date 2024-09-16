import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Home from "./Home"; // Assuming Home is modified to accept products as props

const ProductPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/products");
        setProducts(response.data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on searchValue
    if (searchValue.trim() === "") {
      setFilteredProducts(products);
    } else {
      const fetchFilteredProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:3100/api/products/search/${searchValue.trim()}`);
          setFilteredProducts(response.data);
        } catch (error) {
          console.error("Error searching products:", error);
        }
      };

      fetchFilteredProducts();
    }
  }, [searchValue, products]);

  return (
    <div>
      <SearchBar onSearch={(value) => setSearchValue(value)} />
      <Home products={filteredProducts} />
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../UI/CardProduct";
import { Container, Typography, Grid, Alert } from "@mui/material";

const Home = ({ cart, setCart, products=[], setProducts }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!cart) return;
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart:", cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === product.id
      );

      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity =
          (updatedCart[itemIndex].quantity || 1) + 1;
        return updatedCart;
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        return [...prevCart, productWithQuantity];
      }
    });

    console.log("Add to cart:", product);
  };

  const viewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              addToCart={() => addToCart(product)}
              viewProduct={() => viewProduct(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

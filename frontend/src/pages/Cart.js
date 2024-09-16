import Main from "../components/Main";
import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";

const stripePromise = loadStripe(
  "pk_test_51PzS8yRq7RA8KXljN4B0A2jOsobzbfs5Styuwmc5FTCH0TmAI9pXGxxjdHyJosBtwRR8IYMDisC6GsxDqZUcpX7x00yZqDnklp"
);

const Cart = ({ cart, setCart }) => {
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    updateLocalStorage(newCart);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + (parseFloat(item.price) || 0) * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post(
        "http://localhost:3100/api/create-checkout-session",
        {
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("umia")}`,
          },
        }
      );

      const session = await response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (e) {
      console.log(e);
      alert("Not authenticated");
    }
  };

  return (
    <Main min_height={"80vh"}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <Paper style={{ padding: 16 }}>
          <List>
            {Array.isArray(cart) && cart.length > 0
              ? cart.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <>
                          <Typography variant="body2">
                            <AttachMoneyIcon
                              fontSize="small"
                              style={{ marginRight: 4 }}
                            />
                            Price: ${parseFloat(item.price).toFixed(2)}
                          </Typography>
                          <Typography variant="body2">
                            Quantity: {item.quantity || 0}
                          </Typography>
                          <Typography variant="body2">
                            <AttachMoneyIcon
                              fontSize="small"
                              style={{ marginRight: 4 }}
                            />
                            Total: $
                            {(
                              (parseFloat(item.price) || 0) *
                              (item.quantity || 1)
                            ).toFixed(2)}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton
                      edge="end"
                      aria-label="remove quantity"
                      onClick={() => removeQuantity(item.id)}
                      disabled={(item.quantity || 0) <= 0}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="add quantity"
                      onClick={() => addQuantity(item.id)}
                    >
                      <AddIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeItem(item.id)}
                      style={{ marginLeft: 8 }}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))
              : "No items found"}
          </List>
          <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item>
              <Typography variant="h6">
                <ReceiptIcon fontSize="small" style={{ marginRight: 8 }} />
                Total Price: ${calculateTotal()}
              </Typography>
            </Grid>
          </Grid>
          {cart.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              style={{ marginTop: 16 }}
            >
              Proceed to Checkout
            </Button>
          )}
        </Paper>
      </Container>
    </Main>
  );
};

export default Cart;

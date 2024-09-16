import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

const ProductCard = ({ product, addToCart, viewProduct }) => {
  const {
    imageUrl,
    name,
    price,
    rating,
    reviews,
    discount,
  } = product;

  // Function to render stars based on the rating value
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon
            key={`full-${index}`}
            sx={{ color: "#FFC107", fontSize: "18px" }}
          />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <StarBorderIcon
            key={`empty-${index}`}
            sx={{ color: "#FFC107", fontSize: "18px" }}
          />
        ))}
      </>
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        padding: 2,
        position: "relative",
        width: "250px",
        "&:hover .hoverButton": {
          opacity: 1,
          bottom: "10px",
        },
      }}
    >
      {/* Discount Badge */}
      {discount && (
        <Box
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            backgroundColor: "#D9534F",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            zIndex: 6,
          }}
        >
          -{discount}%
        </Box>
      )}

      {/* Product Image and Action Icons */}
      <Box sx={{ position: "relative", textAlign: "center", paddingBottom: 2 }}>
        <img
          onClick={viewProduct}
          src={imageUrl}
          alt={name}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            color="inherit"
            sx={{
              backgroundColor: "#fff",
              padding: "6px",
              borderRadius: "50%",
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            onClick={viewProduct}
            color="inherit"
            sx={{
              backgroundColor: "#fff",
              padding: "6px",
              borderRadius: "50%",
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Box>

        {/* Add To Cart Button - Visible on Hover */}
        <Button
          onClick={addToCart}
          variant="contained"
          className="hoverButton"
          sx={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "20px",
            opacity: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Add To Cart
        </Button>
      </Box>

      {/* Product Name */}
      <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        {name}
      </Typography>

      {/* Pricing */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}
      >
        <Typography
          variant="body1"
          sx={{ color: "#D9534F", fontWeight: "bold" }}
        >
          {"$" + price}
        </Typography>
      </Box>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {rating && renderStars()}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {reviews && "(" + reviews + ")"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProductCard;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

/* ProductDetail Component */
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Responsive breakpoint

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Change to column on small screens
        gap: 4,
        padding: 4,
      }}
    >
      {/* Image Gallery */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" }, // Horizontal on small screens, vertical on larger
          gap: 1,
          overflowX: "auto", // Enable horizontal scrolling on small screens
        }}
      >
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src="https://via.placeholder.com/150" // Replace with your images
            alt="product thumbnail"
            style={{
              width: isSmallScreen ? "60px" : "80px",
              height: isSmallScreen ? "60px" : "80px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        ))}
      </Box>

      {/* Main Product Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginY: { xs: 2, md: 0 }, // Add margin on top and bottom for small screens
        }}
      >
        <img
          src="https://via.placeholder.com/400" // Replace with your main product image
          alt="product"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Product Info */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginTop: { xs: 2, md: 0 } }}
        >
          Havic HV G-92 Gamepad
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginY: 1 }}>
          {[...Array(4)].map((_, index) => (
            <StarIcon key={index} sx={{ color: "#FFC107", fontSize: "18px" }} />
          ))}
          <StarIcon sx={{ color: "#E0E0E0", fontSize: "18px" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            (150 Reviews)
          </Typography>
          <Chip label="In Stock" color="success" size="small" />
        </Box>

        {/* Price */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          $192.00
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginBottom: 2 }}
        >
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Colors and Sizes */}
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Colours:
            </Typography>
            <Button
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#444",
                border: "1px solid #ddd",
              }}
            />
            <Button
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#D9534F",
                border: "1px solid #ddd",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Size:
            </Typography>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <Button
                key={size}
                variant="outlined"
                sx={{ minWidth: "36px", padding: "4px" }}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Quantity Selector */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginBottom: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => handleQuantityChange("decrement")}
            variant="outlined"
          >
            -
          </Button>
          <Typography variant="body1">{quantity}</Typography>
          <Button
            onClick={() => handleQuantityChange("increment")}
            variant="outlined"
          >
            +
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D9534F",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Add To Cart
          </Button>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>

        {/* Delivery and Return Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            marginTop: 3,
          }}
        >
          <Paper
            sx={{
              padding: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: "8px",
            }}
          >
            <LocalShippingOutlinedIcon />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Free Delivery
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Enter your postal code for Delivery Availability
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              padding: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: "8px",
            }}
          >
            <ReplayOutlinedIcon />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Return Delivery
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Free 30 Days Delivery Returns. Details
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;

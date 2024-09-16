import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone"; // Replace with the appropriate icon for your category

/**
 * CategoryCard Component
 * Displays a category card with an icon and a label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the category.
 * @param {JSX.Element} props.icon - The icon representing the category.
 * @param {function} props.onClick - Function to handle click events.
 * @returns {JSX.Element} A styled category card component.
 */
const CategoryCard = ({ label, icon = <SmartphoneIcon />, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 150,
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        boxShadow: "none",
        border: "1px solid #ddd",
        cursor: "pointer",
        transition: "0.3s",
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: "#D9534F", // Orange color on hover
          color: "#fff", // White text on hover
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderColor: "#D9534F", // Change border color to match the hover background
        },
        "&:hover .MuiSvgIcon-root": {
          color: "#fff", // White color for icons on hover
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontSize: "40px", marginBottom: "10px" }}>{icon}</Box>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

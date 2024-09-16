import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"; // Replace with the appropriate icon for your feature

/**
 * FeatureCard Component
 * Displays a feature card with a circular icon, title, and description.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - The description of the feature.
 * @param {JSX.Element} props.icon - The icon representing the feature.
 * @returns {JSX.Element} A styled feature card component.
 */
const FeatureCard = ({
  title,
  description,
  icon = <LocalShippingOutlinedIcon />,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
        borderRadius: "8px",
        width: "250px",
        margin: "0 auto",
      }}
    >
      {/* Icon Circle */}
      <Box
        sx={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: "#000",
          border: "2px solid #ddd",
          marginBottom: 2,
          color: "#fff",
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: 1 }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;

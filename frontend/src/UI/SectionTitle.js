import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

// Styled icon to match the red square icon in the title
const Icon = styled("div")(({ theme }) => ({
  width: "18px",
  height: "30px",
  backgroundColor: "#D9534F", // Matches the red color
  borderRadius: "2px",
  marginRight: theme.spacing(1),
}));

/**
 * SectionTitle Component
 * Displays a section title with a small red icon.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The section title text.
 * @param {string} props.subtitle - The subtitle text displayed next to the icon.
 * @returns {JSX.Element} A styled section title component.
 */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Icon />
        <Typography
          variant="subtitle1"
          sx={{ color: "#D9534F", fontWeight: "bold" }}
        >
          {subtitle}
        </Typography>
      </Box>
      {title && (
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;

import React from "react";
import { IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 * NavigationButton Component
 * Displays circular navigation buttons for left and right navigation.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onPrev - Function to handle the previous button click.
 * @param {function} props.onNext - Function to handle the next button click.
 * @returns {JSX.Element} A set of styled navigation buttons.
 */
const NavigationButton = ({ onPrev, onNext }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Previous Button */}
      <IconButton
        onClick={onPrev}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "50%",
          boxShadow: 1,
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            boxShadow: 2,
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={onNext}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "50%",
          boxShadow: 1,
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            boxShadow: 2,
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default NavigationButton;

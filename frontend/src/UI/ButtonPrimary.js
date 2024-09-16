import { Button } from "@mui/material";
import React from "react";

/**
 * PrimaryButton Component
 * A styled button component matching the red button design with additional padding.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed inside the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} A styled button component with additional padding.
 */
const PrimaryButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: "#D9534F", // Red color
        color: "#fff", // White text color
        padding: "16px 32px", // Increased padding for a more prominent button
        borderRadius: "8px", // Rounded corners
        textTransform: "none", // Keep text as is, not uppercase
        fontWeight: "regular",
        fontSize: "16px", // Adjust font size if needed
        "&:hover": {
          backgroundColor: "#C74742", // Slightly darker on hover
        },
      }}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;

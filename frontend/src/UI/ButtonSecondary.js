import { Button } from "@mui/material";
import React from "react";

/**
 * SecondaryButton Component
 * A styled button component matching the outlined button design with black text and additional padding.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed inside the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} A styled button component with additional padding.
 */
const SecondaryButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        borderColor: "#ccc", // Light border color
        color: "#333", // Black text color
        padding: "10px 24px", // Padding for the button
        borderRadius: "8px", // Rounded corners
        textTransform: "none", // Keep text as is, not uppercase
        fontWeight: "bold",
        fontSize: "16px", // Font size
        "&:hover": {
          borderColor: "#bbb", // Slightly darker on hover
          backgroundColor: "rgba(0, 0, 0, 0.04)", // Light hover effect
        },
      }}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;

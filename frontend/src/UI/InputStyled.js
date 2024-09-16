import React from "react";
import { Box, TextField, Typography } from "@mui/material";

/**
 * StyledInput Component
 * A customizable input field with a label, matching the design style.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function to handle input changes.
 * @returns {JSX.Element} A styled input component.
 */
const StyledInput = ({ label, placeholder, value, onChange }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 2 }}
    >
      {/* Label */}
      <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
        {label}
      </Typography>

      {/* Input Field */}
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth
        InputProps={{
          sx: {
            backgroundColor: "#f5f5f5", // Light background color
            borderRadius: "8px", // Rounded corners
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove default border
            },
          },
        }}
        sx={{
          "& .MuiInputBase-input": {
            padding: "10px", // Adjust padding for a comfortable input area
          },
        }}
      />
    </Box>
  );
};

export default StyledInput;

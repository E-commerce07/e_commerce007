import { Box, TextField, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Assurez-vous que le chemin est correct
/* Styled Components */
const PrimaryButton = styled(Button)(() => ({
  backgroundColor: "#D9534F",
  color: "#fff",
  padding: "12px 0",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "#C74742",
  },
}));

/* Main LoginForm Component */
const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  // const { login } = useAuth(); // Utilisation du hook useAuth pour le login

  // State to hold form data
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Call the login method from useAuth hook
      await login(formData.identifier, formData.password);

      console.log("Login successful");
    } catch (error) {
      setError(error.message); // Display error message if login fails
    }
  };

  // Handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        Log in
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", marginBottom: 3 }}
      >
        Enter your details below
      </Typography>

      {/* Display Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Form Fields */}
      <TextField
        fullWidth
        label="Email or Username"
        variant="standard"
        name="identifier"
        value={formData.identifier}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="standard"
        name="password"
        value={formData.password}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event); // Trigger form submission on Enter key press
          }
        }}
      />

      {/* Primary Button */}
      <PrimaryButton type="submit" fullWidth>
        Login
      </PrimaryButton>

      {/* Link to Register */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", textAlign: "center", marginTop: 3 }}
      >
        Don't have an account?{" "}
        <Typography
          onClick={() => navigate("/register")}
          component="span"
          sx={{
            color: "#333",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { color: "#D9534F" },
          }}
        >
          Sign up.
        </Typography>
      </Typography>
    </Box>
  );
};

export default LoginForm;

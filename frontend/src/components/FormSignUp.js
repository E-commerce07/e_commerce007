import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const GoogleButton = styled(Button)(({ theme }) => ({
  color: "#333",
  borderColor: "#ccc",
  padding: "10px 0",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  "&:hover": {
    borderColor: "#bbb",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

/* Main SignUpForm Component */
const SignUpForm = ({ register }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState(""); // State for handling errors

  // Handler for form submission in SignUpForm
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the register method from useAuth hook
      await register(formData);
      console.log("Registration successful");
      navigate('/login')
    
     
    } catch (error) {
      setError(error.message); // Display error message if registration fails
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
        Create an account
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", marginBottom: 3 }}
      >
        Enter your details below
      </Typography>

      {/* Display Error Message */}
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Form Fields */}
      <TextField
        fullWidth
        label="Username"
        variant="standard"
        name="username"
        value={formData.username}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Email"
        variant="standard"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        required
        type="email"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="standard"
        name="password"
        value={formData.password}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        variant="standard"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
        required
      />
      <TextField
        select
        fullWidth
        label="Role"
        variant="standard"
        name="role"
        value={formData.role}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
        required
      >
        <MenuItem value="client">Client</MenuItem>
        <MenuItem value="seller">Seller</MenuItem>
        
      </TextField>

      {/* Primary Button */}
      <PrimaryButton type="submit" fullWidth>
        Create Account
      </PrimaryButton>

      {/* Divider */}
      <Divider sx={{ marginY: 3 }}>OR</Divider>

      {/* Google Sign Up Button */}
      <GoogleButton variant="outlined" fullWidth startIcon={<GoogleIcon />}>
        Sign up with Google
      </GoogleButton>

      {/* Already have an account */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", textAlign: "center", marginTop: 3 }}
      >
        Already have an account?{" "}
        <Typography
           onClick={() => navigate("/login")}
          component="span"
          sx={{
            color: "#333",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { color: "#D9534F" },
          }}
        >
          Log in
        </Typography>
      </Typography>
    </Box>
  );
};

export default SignUpForm;

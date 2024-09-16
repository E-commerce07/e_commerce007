import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import StyledInput from "./StyledInput"; // Assuming StyledInput is imported from the previous component
import Button from "./ButtonMain"; // Assuming StyledInput is imported from the previous component

/**
 * ProfileForm Component
 * Displays a form for editing user profile details.
 *
 * @returns {JSX.Element} A styled form component for profile editing.
 */
const ProfileForm = () => {
  const [profile, setProfile] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (field) => (event) => {
    setProfile({ ...profile, [field]: event.target.value });
  };

  const handleSaveChanges = () => {
    console.log("Save Changes Clicked", profile);
    // Add save changes functionality here
  };

  const handleCancel = () => {
    console.log("Cancel Clicked");
    // Add cancel functionality here
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#D9534F", marginBottom: 2 }}
      >
        Edit Your Profile
      </Typography>

      {/* Profile Form */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledInput
            label="First Name"
            value={profile.firstName}
            onChange={handleChange("firstName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledInput
            label="Last Name"
            value={profile.lastName}
            onChange={handleChange("lastName")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledInput
            label="Email"
            value={profile.email}
            onChange={handleChange("email")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledInput
            label="Address"
            value={profile.address}
            onChange={handleChange("address")}
          />
        </Grid>
      </Grid>

      {/* Password Change Section */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginTop: 3, marginBottom: 1 }}
      >
        Password Changes
      </Typography>
      <StyledInput
        label="Current Password"
        value={profile.currentPassword}
        onChange={handleChange("currentPassword")}
        placeholder="Current Password"
      />
      <StyledInput
        label="New Password"
        value={profile.newPassword}
        onChange={handleChange("newPassword")}
        placeholder="New Password"
      />
      <StyledInput
        label="Confirm New Password"
        value={profile.confirmNewPassword}
        onChange={handleChange("confirmNewPassword")}
        placeholder="Confirm New Password"
      />

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          marginTop: 3,
        }}
      >
        <Button
          variant="text"
          onClick={handleCancel}
          sx={{ textTransform: "none", fontWeight: "bold", color: "#333" }}
        ></Button>
        <Button
          text={"Cancel"}
          variant="contained"
          onClick={handleSaveChanges}
          sx={{
            backgroundColor: "#D9534F",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#C74742",
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;

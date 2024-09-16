import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", padding: 4 }}>
      <Grid
        container
        spacing={4}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* Subscribe Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Exclusive
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Subscribe
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Get 10% off your first order
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" sx={{ p: "10px" }}>
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Grid>

        {/* Support Section */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Support
          </Typography>
          <Typography variant="body2">111 Bijoy sarani, Dhaka,</Typography>
          <Typography variant="body2">DH 1515, Bangladesh.</Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            exclusive@gmail.com
          </Typography>
          <Typography variant="body2">+88015-88888-9999</Typography>
        </Grid>

        {/* Account Section */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Account
          </Typography>
          <Typography variant="body2">My Account</Typography>
          <Typography variant="body2">Login / Register</Typography>
          <Typography variant="body2">Cart</Typography>
          <Typography variant="body2">Wishlist</Typography>
          <Typography variant="body2">Shop</Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Quick Link
          </Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms Of Use</Typography>
          <Typography variant="body2">FAQ</Typography>
          <Typography variant="body2">Contact</Typography>
        </Grid>

        {/* Download App Section */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Download App
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Save $3 with App New User Only
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            {/* Replace with actual QR code or app store images */}
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Google Play
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              App Store
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "start" },
          gap: 2,
          marginTop: 4,
        }}
      >
        <IconButton sx={{ color: "#fff" }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <InstagramIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <LinkedInIcon />
        </IconButton>
      </Box>

      {/* Footer Bottom */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#666",
          marginTop: 4,
        }}
      >
        © Copyright Green Fields 2024. All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;

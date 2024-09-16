// Header.js
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "../components/SearchBar";

const Header = ({
  isAuthenticated,
  isAdmin,
  isSeller,
  logout,
  cart,
  products,
  setProducts,
  category,
}) => {
  let links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Sign Up", path: "/register" },
  ];

  if (isAuthenticated) {
    links.pop();
  }

  if (isAdmin) {
    links.push({ label: "Dashboard", path: "/admin" });
  }

  if (isSeller) {
    links.push({ label: "Dashboard", path: "/seller" });
  }

  const DrawerContent = ({ handleDrawerToggle }) => {
    const navigate = useNavigate();

    return (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 0 }}></Typography>
        <List>
          {links.map((link, index) => (
            <ListItem
              button="true"
              key={index}
              onClick={() => navigate(link.path)}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {}, [isAuthenticated]);

  useEffect(() => {
    if (cart.length > 0) {
      setTotalQuantity(
        cart.reduce((total, item) => total + (item.quantity || 0), 0)
      );
    } else {
      setTotalQuantity(0);
    }
  }, [cart]);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        padding: { xs: "0 10px", md: "0 20px" },
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
            flexGrow: { xs: 1, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
            style={{ height: "30px", cursor: "pointer" }}
          />
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6 }}>
          {links.map((link, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                borderBottom: "2px solid transparent",
                transition: "border-bottom 0.3s ease, color 0.3s ease",
                "&:hover": {
                  borderBottom: "2px solid #D9534F",
                  color: "#D9534F",
                },
              }}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </Typography>
          ))}
        </Box>

        {/* Desktop Search Bar */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <SearchBar
            products={products}
            setProducts={setProducts}
            category={category}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {isAuthenticated && (
            <IconButton onClick={() => navigate("/wishlist")} color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
          )}

          <IconButton onClick={() => navigate("/cart")} color="inherit">
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                sx={{
                  backgroundColor: "#D9534F",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "8px",
                  "&:hover": { backgroundColor: "#C74742" },
                }}
                onClick={() => navigate("/profile")}
              >
                <AccountCircleIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <IconButton color="inherit" onClick={() => navigate("/user")}>
              <PersonOutlineIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Search Bar */}
      <Box sx={{ display: { xs: "flex", md: "none" }, padding: "10px 12px" }}>
        <SearchBar
          products={products}
          setProducts={setProducts}
          category={category}
        />
      </Box>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <DrawerContent handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </AppBar>
  );
};

export default Header;

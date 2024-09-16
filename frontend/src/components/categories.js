import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const SidebarMenu = ({
  products,
  setProducts,
  category = "all",
  setCategory,
}) => {
  const [categories, setCategories] = useState([]);

  const getProds = async () => {
    const prods = await axios.get("http://localhost:3100/api/products");
    return prods.data;
  };

  const getCatgs = async () => {
    const catgs = await axios.get(
      "http://localhost:3100/api/products/categories"
    );
    setCategories([...new Set(catgs.data.map((cat) => cat.name))]);
  };

  useEffect(() => {
    getCatgs();
  }, []);

  useEffect(() => {
    if (category) {
      if (category === "all") {
        const fetchprods = async () => {
          const prods = await getProds();
          setProducts(prods);
        };
        fetchprods();
      } else {
        const fetchprods = async () => {
          const prods = await getProds();
          const filtedProducts = prods.filter(
            (prod) => prod.category_name === category
          );
          setProducts(filtedProducts);
        };
        fetchprods();
      }
    }
  }, [category]);

  return (
    <List
      sx={{
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: 1000,
        paddingRight: "20px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItem>
        <ListItemText
          primary="Exclusive"
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        />
      </ListItem>

      <ListItemButton onClick={() => setCategory("all")}>
        <ListItemText primary="All" />
      </ListItemButton>

      {categories.map((category, index) => (
        <ListItemButton key={index} onClick={() => setCategory(category)}>
          <ListItemText primary={category} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SidebarMenu;

import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";

/* Styled Components */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    width: "20em",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: "8px 16px",
    width: "100%",
    transition: "width 0.3s",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const SearchBar = ({
  placeholder = "What are you looking for?",
  products,
  setProducts,
  category,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const getProds = async () => {
    const prods = await axios.get("http://localhost:3100/api/products", {
      params: { category: category },
    });
    return prods.data;
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      const fetchprods = async () => {
        const prods = await getProds();
        setProducts(prods);
      };
      fetchprods();
    } else {
      setProducts((prevProducts) =>
        prevProducts.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!searchValue.trim()) return;

    try {
      const response = await axios.get(`/api/products/search/${searchValue}`);
      console.log("Search results:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <Search>
      <StyledInputBase
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        value={searchValue}
      />
      <IconButton onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Search>
  );
};

export default SearchBar;

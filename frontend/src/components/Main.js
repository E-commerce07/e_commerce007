import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/* Styled Component for Main */
const MainContainer = styled(Box)(({ theme, min_height }) => ({
  minHeight: min_height || "100vh", // Use the provided minH or default to "100vh"
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
  },
}));

/* Main Component */
const Main = ({ min_height, children, ...props }) => {
  return (
    <MainContainer min_height={min_height} {...props}>
      {children}
    </MainContainer>
  );
};

export default Main;

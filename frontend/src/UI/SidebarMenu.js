import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

/**
 * SidebarMenu Component
 * Displays a sidebar menu with sections and selectable items.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeItem - The currently active item.
 * @param {function} props.onSelect - Function to handle selection of an item.
 * @returns {JSX.Element} A styled sidebar menu component.
 */
const SidebarMenu = ({ activeItem, onSelect }) => {
  // Menu data
  const menuSections = [
    {
      title: "Manage My Account",
      items: ["My Profile", "Address Book", "My Payment Options"],
    },
    {
      title: "My Orders",
      items: ["My Returns", "My Cancellations"],
    },
    {
      title: "My WishList",
      items: [],
    },
  ];

  return (
    <Box sx={{ padding: "20px", maxWidth: "250px" }}>
      {menuSections.map((section, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          {/* Section Title */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            {section.title}
          </Typography>

          {/* Section Items */}
          <List sx={{ padding: 0 }}>
            {section.items.map((item, idx) => (
              <ListItem
                key={idx}
                button
                onClick={() => onSelect(item)}
                sx={{
                  padding: "8px 0",
                  color: item === activeItem ? "#D9534F" : "text.secondary",
                  fontWeight: item === activeItem ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: item === activeItem ? "#D9534F" : "text.primary",
                  },
                }}
              >
                <ListItemText
                  sx={{
                    marginLeft: " 20px",
                  }}
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default SidebarMenu;

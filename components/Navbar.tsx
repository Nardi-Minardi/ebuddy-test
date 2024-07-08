"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { fetchUsers } from "@/store/actions";
import Cookies from "js-cookie";

interface Props {
  window?: () => Window;
  token?: string;
}

const drawerWidth = 240;
const navItems = ["Home", "Login"];

const Navbar: React.FC<Props> = (props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { users, loading, error, isAuthenticated } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    Cookies.remove(process.env.APP_NAME + "-token");
    Cookies.remove("redirected");
    Cookies.remove("no-howto");
    location.reload();
  };

  const handleNavClick = (item: string) => {
    if (item === "Home") {
      router.push("/");
    } else if (item === "Login") {
      if (isAuthenticated) {
        handleLogout();
      } else {
        router.push("/login");
      }
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item)}
              sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item === "Login" && isAuthenticated ? "Logout" : item}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            Logo
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => handleNavClick(item)}>
                {item === "Login" && isAuthenticated ? "Logout" : item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircleIcon from "@mui/icons-material/Circle";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    position: "relative",
                    backgroundColor: "#273339",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                }}>
                <Toolbar>
                    <>
                        <CircleIcon
                            sx={{
                                margin: 2,
                                fontSize: 50,
                                color: "#e34234",
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontFamily: "Courier Prime",
                                component: "div",
                                flexGrow: 1,
                            }}>
                            Digital
                            <br />
                            Farmers
                        </Typography>
                    </>
                    {isMobile ? (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleClose}>
                                <a
                                    href="http://localhost:3000/"
                                    target="_self"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            variant: "text",
                                            fontSize: 16,
                                            color: "#273339",
                                        }}>
                                        Home
                                    </MenuItem>
                                </a>
                                <a
                                    href="https://colossal-seed-831.notion.site/Digital-Farmers-Harvesting-Insights-to-Tackle-Leaf-Diseases-e78b023b99d84863bfa487a362138d6e"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            variant: "text",
                                            fontSize: 16,
                                            color: "#273339",
                                        }}>
                                        Development
                                    </MenuItem>
                                </a>
                                <a
                                    href="https://github.com/BabaRiri"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}>
                                    <MenuItem
                                        sx={{
                                            variant: "text",
                                            fontSize: 16,
                                            color: "#273339",
                                        }}>
                                        Contact
                                    </MenuItem>
                                </a>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <a
                                href="http://localhost:3000/"
                                target="_self"
                                rel="noopener noreferrer">
                                <Button
                                    sx={{
                                        variant: "text",
                                        fontSize: 16,
                                        color: "white",
                                        "&:hover": {
                                            color: "#9BD2A5",
                                        },
                                    }}>
                                    Home
                                </Button>
                            </a>
                            <a
                                href="https://colossal-seed-831.notion.site/Digital-Farmers-Harvesting-Insights-to-Tackle-Leaf-Diseases-e78b023b99d84863bfa487a362138d6e"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button
                                    sx={{
                                        variant: "text",
                                        fontSize: 16,
                                        color: "white",
                                        "&:hover": {
                                            color: "#9BD2A5",
                                        },
                                    }}>
                                    Development
                                </Button>
                            </a>
                            <a
                                href="https://github.com/BabaRiri"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button
                                    sx={{
                                        variant: "text",
                                        fontSize: 16,
                                        color: "white",
                                        "&:hover": {
                                            color: "#9BD2A5",
                                        },
                                    }}>
                                    Contact
                                </Button>
                            </a>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

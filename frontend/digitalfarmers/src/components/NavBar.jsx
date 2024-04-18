import CircleIcon from "@mui/icons-material/Circle";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    position: "relative",
                    backgroundColor: "#273339",
                    paddingLeft: "75px",
                    paddingRight: "75px",
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

                        {/*<img
                            src={"./img/tomatologo.png"}
                            alt="Logo"
                            width= "90px"
                            height= "auto"
                            sx={{
                            }}
                        />*/}
                        
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

import CircleIcon from "@mui/icons-material/Circle";
import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
    return (
        <AppBar sx={{ position: "relative", backgroundColor: "#273339" }}>
            <Toolbar>
                <CircleIcon
                    sx={{
                        margin: 2,
                        fontSize: 50,
                        color: "#e34234",
                    }}
                />
                <Typography varint="h5">
                    Digital
                    <br />
                    Farmers
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

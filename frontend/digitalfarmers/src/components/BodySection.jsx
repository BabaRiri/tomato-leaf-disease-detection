import * as React from "react";
import { Box } from "@mui/material";

const BodySection = () => {
    return (
        <Box>
            <div
                style={{
                    backgroundImage: `url("./img/bg.svg")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    height: "100vh",
                }}></div>
        </Box>
    );
};

export default BodySection;
import * as React from "react";
import { Box } from "@mui/material";
import TextSection from "./TextSection";

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
                }}>
                    <TextSection/>
                </div>
        </Box>
    );
};

export default BodySection;
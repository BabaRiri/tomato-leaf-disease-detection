import * as React from "react";
import { Box } from "@mui/material";
import UploadSection from "./UploadSection";

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
                    minHeight: "100vh",
                }}>
                    <UploadSection/>
                </div>
        </Box>
    );
};

export default BodySection;
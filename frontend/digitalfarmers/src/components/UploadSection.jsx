import React, { useState } from "react";
import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const UploadSection = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [result, setResult] = React.useState(null);
    const [isImageSelected, setIsImageSelected] = React.useState(false);
    const [isResponseReceived, setIsResponseReceived] = React.useState(false);

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setSelectedImage(selectedImage);
        setIsImageSelected(true);
        setResult(null);
        setIsResponseReceived(false);
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });

            const resultData = await response.json();
            setResult(resultData);
            setIsResponseReceived(true);
            console.log("Response:", resultData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (isResponseReceived) {
        return <Box>UploadedCard</Box>;
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                }}>
                <Card
                    sx={{
                        minWidth: 275,
                        width: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        paddingBottom: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }}>
                    <CardContent>
                        {isImageSelected ? (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="uploaded image"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        ) : (
                            <>
                                <AddPhotoAlternateIcon
                                    sx={{ fontSize: 80, color: "#273339" }}
                                />
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom>
                                    Choose an image of a <b>Tomato Leaf</b> you
                                    would like to analyse.
                                </Typography>
                            </>
                        )}
                    </CardContent>

                    <CardActions>
                        <Button
                            sx={{ backgroundColor: "#273339" }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onClick={isImageSelected ? handleSubmit : null}>
                            {isImageSelected ? "Submit" : "Upload File"}

                            {!isImageSelected && (
                                <VisuallyHiddenInput
                                    type="file"
                                    name="file"
                                    onChange={handleImage}
                                    accept="image/jpeg, image/png, image/jpg"
                                />
                            )}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
};

export default UploadSection;

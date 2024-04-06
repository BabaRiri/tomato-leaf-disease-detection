import React from "react";
import {
    Typography,
    Box,
    Container,
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

    const handleReset = () => {
        setSelectedImage(null);
        setResult(null);
        setIsImageSelected(false);
        setIsResponseReceived(false);
    };

    if (isResponseReceived) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 10,
                }}>
                <Card
                    sx={{
                        minWidth: 275,
                        width: 500,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        paddingBottom: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            component="div"
                            color={"#273339"}>
                            <b>Results</b>
                        </Typography>
                        <CardContent>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    padding: 5,
                                    maxWidth: 300,
                                }}
                            />
                        </CardContent>
                        <>
                            <Typography variant="h5" component="div">
                                <b>Label:</b>{" "}
                                {result.class.replaceAll("_", " ")}
                            </Typography>
                            <Typography variant="h5" component="div">
                                <b>Confidence:</b>{" "}
                                {`${Math.round(
                                    parseFloat(result.confidence) * 100
                                )}%`}
                            </Typography>
                        </>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" color="success">
                            Learn More
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: "#273339",
                                "&:hover": {
                                    backgroundColor: "#e34234",
                                },
                            }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            onClick={handleReset}>
                            Try Another Image
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        );
    }

    return (
        <>
            <Container sx={{ maxwidth: "sm", paddingTop: "70px" }}>
                <Typography
                    variant="h2"
                    align="center"
                    color={"#273339"}
                    paddingTop={"20px"}
                    gutterBottom>
                    <b>
                        Tomato Leaf
                        <br />
                        Disease Detection Tool
                    </b>
                </Typography>

                <Typography
                    variant="h4"
                    align="center"
                    color={"white"}
                    paragraph>
                    This tool helps you identify Tomato Leaf Diseases with just
                    an Image.
                </Typography>
            </Container>

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
                                alt="uploaded leaf"
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

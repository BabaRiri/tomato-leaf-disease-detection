import React, { useState } from "react";
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
    const [currentState, setCurrentState] = useState("upload");
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [learnMore, setLearnMore] = useState(null);

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
            const label = resultData.class;
            console.log("Response: ", resultData);
            setResult(resultData);
            setLearnMore(label);
            setCurrentState("results");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setResult(null);
        setIsImageSelected(false);
        setCurrentState("upload");
        setLearnMore(null);
    };

    const handleLearnMore = () => {
        let currentState = learnMore
            .replace("Tomato___", "")
            .replace(/_/g, " ");

        setSelectedImage(null);
        setResult(null);
        setSelectedImage(false);
        setCurrentState(currentState);
        setLearnMore(null);
    };

    const showLearnMore = (
        title,
        casualAgent,
        distribution,
        symptoms,
        conditions,
        control
    ) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 5,
                }}>
                <Card
                    sx={{
                        minWidth: 275,
                        width: 820,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "left",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            component="div"
                            color={"#273339"}
                            marginTop={2}>
                            <b>{title}</b>
                        </Typography>

                        <Typography
                            variant="h5"
                            component="div"
                            color={"#273339"}>
                            <br />
                            Causal Agent
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            color={"#273339"}>
                            {casualAgent}
                        </Typography>

                        <Typography
                            variant="h5"
                            component="div"
                            color={"#273339"}>
                            <br />
                            Distribution
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            color={"#273339"}>
                            {distribution}
                        </Typography>

                        <Typography
                            variant="h5"
                            component="div"
                            color={"#273339"}>
                            <br />
                            Symptoms
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            color={"#273339"}>
                            {symptoms}
                        </Typography>

                        <Typography
                            variant="h5"
                            component="div"
                            color={"#273339"}>
                            <br />
                            Conditions for Development
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            color={"#273339"}>
                            {conditions}
                        </Typography>

                        <Typography
                            variant="h5"
                            component="div"
                            color={"#273339"}>
                            <br />
                            Control
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            color={"#273339"}>
                            {control}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            sx={{
                                marginBottom: 2,
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
    };

    switch (currentState) {
        case "upload":
            return (
                <>
                    <Container sx={{ maxwidth: "sm", paddingTop: "70px" }}>
                        <Typography
                            variant="h2"
                            align="center"
                            color={"#273339"}
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
                            This tool helps you identify Tomato Leaf Diseases
                            with just an Image.
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
                                        alt="Selected Leaf"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                ) : (
                                    <>
                                        <AddPhotoAlternateIcon
                                            sx={{
                                                fontSize: 80,
                                                color: "#273339",
                                            }}
                                        />
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom>
                                            Choose an image of a{" "}
                                            <b>Tomato Leaf</b> you would like to
                                            analyse.
                                        </Typography>
                                    </>
                                )}
                            </CardContent>

                            <CardActions>
                                <Button
                                    sx={{
                                        backgroundColor: "#273339",
                                        "&:hover": {
                                            backgroundColor: "#E34234",
                                        },
                                    }}
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    onClick={
                                        isImageSelected ? handleSubmit : null
                                    }>
                                    {isImageSelected ? "Submit" : "Upload file"}

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
        case "results":
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
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={handleLearnMore}>
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
        case "Early blight":
            let title = currentState;
            let casualAgent = "Alternaria solani";
            let distribution = "Worldwide";
            let symptoms =
                "Symptoms may occur as leaf, stem or fruit lesions. Typically, they appear first on older leaves as irregular, dark brown, necrotic areas. These lesions expand as the disease progresses and they eventually develop concentric, black rings, which give them a target-board appearance. A yellow chlorotic area often surrounds the leaf lesions, and if there are numerous lesions the whole leaf turns yellow and quickly dries up. Complete defoliation of the plant can occur when conditions are favorable for disease development. Lesions may appear as dark brown, elongated, sunken areas on the stem and petiole. Lesion development at the soil-line can result in a collar rot that often girdles the stem. Fruit lesions often occur at the calyx end and are dark, leathery and sunken with the characteristic target-board appearance.";
            let conditions =
                "The fungus generally survives from season to season on decayed plant material in the soil. Volunteer tomatoes, potatoes and other solanaceous weeds can also serve as inoculum sources. Infection and fungal spore production occur during periods of warm '(24-29°C, 75–84°F) and rainy or humid weather. The fungal spores are then disseminated by the wind and rain. This disease can spread rapidly when favorable conditions persist. It can also be serious in arid climates if there are frequent dew periods, or if sprinkler irrigation is used.";
            let control =
                "A fungicide spray program combined with a blight forecasting system is generally the most effective means of controlling early blight.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "healthy":
            return <p>Healthy</p>;
        case "Late blight":
            return <p>Late Blight</p>;
        case "Leaf Mold":
            return <p>Leaf Mold</p>;
        case "Septoria leaf spot":
            return <p>Septoria leaf spot</p>;
        case "Spider mites Two-spotted spider mite":
            return <p>Spider mites Two-spotted spider mite</p>;
        case "Target Spot":
            return <p>Target Spot</p>;
        case "Tomato mosaic virus":
            return <p>Tomato mosaic virus</p>;
        case "Tomato Yellow Leaf Curl Virus":
            return <p>Tomato Yellow Leaf Curl Virus</p>;
        case "Bacterial spot":
            return <p>Bacterial spot</p>;

        default:
            return null;
    }
};

export default UploadSection;

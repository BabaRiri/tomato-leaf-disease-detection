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
        let imageNumbers = [1, 2, 3];
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 5,
                    paddingBottom: 5,
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
                        <Container>
                            <Typography
                                variant="h3"
                                component="div"
                                color={"#273339"}
                                marginTop={2}
                                marginBottom={2}>
                                <b>{title}</b>
                            </Typography>
                        </Container>

                        <Container>
                            {imageNumbers.map((number) => (
                                <img
                                    key={number}
                                    src={`./img/${title}/${number}.jpg`}
                                    alt={`Depiction of disease ${number}`}
                                    style={{
                                        padding: "1px",
                                        width: "33%",
                                        height: "auto",
                                    }}
                                />
                            ))}
                        </Container>

                        <Container sx={{ display: "flex" }}>
                            <Typography
                                variant="h5"
                                component="div"
                                color={"#273339"}
                                width={"50%"}>
                                <br />
                                Causal Agent
                                <br />
                                {
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color={"#273339"}>
                                        {casualAgent}
                                    </Typography>
                                }
                            </Typography>

                            <Typography
                                variant="h5"
                                component="div"
                                color={"#273339"}>
                                <br />
                                Distribution
                                <br />
                                {
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color={"#273339"}>
                                        {distribution}
                                    </Typography>
                                }
                            </Typography>
                        </Container>
                        <Container>
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
                        </Container>
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
    let title = "";
    let casualAgent = "";
    let distribution = "";
    let symptoms = "";
    let conditions = "";
    let control = "";

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
            title = currentState;
            casualAgent = "Alternaria solani";
            distribution = "Worldwide";
            symptoms =
                "Symptoms may occur as leaf, stem or fruit lesions. Typically, they appear first on older leaves as irregular, dark brown, necrotic areas. These lesions expand as the disease progresses and they eventually develop concentric, black rings, which give them a target-board appearance. A yellow chlorotic area often surrounds the leaf lesions, and if there are numerous lesions the whole leaf turns yellow and quickly dries up. Complete defoliation of the plant can occur when conditions are favorable for disease development. Lesions may appear as dark brown, elongated, sunken areas on the stem and petiole. Lesion development at the soil-line can result in a collar rot that often girdles the stem. Fruit lesions often occur at the calyx end and are dark, leathery and sunken with the characteristic target-board appearance.";
            conditions =
                "The fungus generally survives from season to season on decayed plant material in the soil. Volunteer tomatoes, potatoes and other solanaceous weeds can also serve as inoculum sources. Infection and fungal spore production occur during periods of warm '(24-29°C, 75–84°F) and rainy or humid weather. The fungal spores are then disseminated by the wind and rain. This disease can spread rapidly when favorable conditions persist. It can also be serious in arid climates if there are frequent dew periods, or if sprinkler irrigation is used.";
            control =
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
            title = currentState;
            casualAgent = "N/A";
            distribution = "Worldwide";
            symptoms =
                "The leaves are typically free from any visible damage, lesions, discoloration, or signs of wilting, presenting a smooth texture and turgid appearance. ";
            conditions =
                "Maintaining a healthy tomato leaf requires providing adequate sunlight, water, and nutrients, as well as proper care to prevent pest and disease infestations. Regular monitoring and timely intervention can help sustain the leaf's health and ensure optimal tomato plant development.";
            control =
                "The presence of abundant chlorophyll ensures vigorous photosynthetic activity, contributing to the plant's overall growth and productivity.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Late blight":
            title = currentState;
            casualAgent = "Phytophthora infestans";
            distribution = "Worldwide";
            symptoms =
                "Late blight manifests through distinct symptoms on different plant parts, including irregular water-soaked lesions on leaves, dark sunken areas on stems and petioles, and characteristic dark, leathery fruit lesions.";
            conditions =
                "Survival occurs through the overwintering of the fungus in infected plant debris, with subsequent infection favored by cool, wet weather, and spread facilitated by wind and rain.";
            control =
                "Effective management involves implementing fungicide spray programs based on disease forecasting, adopting cultural practices such as prompt removal of infected debris and proper plant spacing, and considering resistant varieties where available to mitigate the impact of late blight outbreaks.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Leaf Mold":
            title = currentState;
            casualAgent = "Fulvia fulva";
            distribution = "Worldwide";
            symptoms =
                "The first symptoms appear as light green to yellowish areas on the upper surface of the older leaves. This coincides with the development of masses of olive­ green fungal conidia on the lower leaf surface. As the disease progresses, the lower leaves turn yellow and drop off. The fungus typically occurs on leaves, but the stems, blossoms and fruit may also become infected. Infected fruit develop a black leathery rot on the calyx end. Although this disease occurs in the field, it is mainly a problem in greenhouses where it can spread rapidly under favorable conditions.";
            conditions =
                "This fungus is an efficient saprophyte and can survive as conidia and sclerotia in the soil and plant debris for at least one year. The conidia are readily dispersed by wind and rain. Dissemination can also occur on workers’ clothing and equipment. High (90%) relative humidity and warm (24°C, 75°F) temperatures are optimal for disease development. However, disease can occur between 10-32°C (50-90°F). Leaf mold will not develop if the relative humidity is less than 85%.";
            control =
                "A good fungicide spray program, as well as providing adequate air movement and heating to reduce the relative humidity to less than 85%, can be effective in reducing losses from this disease. Resistant varieties should be used when possible, however, the extreme diversity of the fungus often makes this difficult.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Septoria leaf spot":
            title = currentState;
            casualAgent = "Septoria lycopersici";
            distribution = "Worldwide";
            symptoms =
                "Symptoms first appear as small, dark, water-soaked lesions on the older leaves. These enlarge to form circular lesions about 5 mm in diameter with black or brown borders and gray centers peppered with small black fungal sporulating structures (pycnidia). Lesions on the stem, petiole and calyx tend to be more elongated, with pycnidia developing in the center. When disease is severe the lesions coalesce, resulting in the leaves collapsing and eventual defoliation of the plant.";
            conditions =
                "This fungus can survive on debris from previous crops, as well as on several weeds including:nightshade, horse nettle, jimson weed and ground cherry. Extended periods of high (100%) relative humidity and temperatures between 20-25°C {68-77°F) favor infection and disease development. Numerous fungal conidia are exuded from the pycnidia when the humidity is high. They can then  be spread by wind and splashing water from rain or overhead irrigation, on workers’ clothing and tools, on cultivation equipment and by insects.";
            control =
                "A good fungicide spray program in conjunction with cultural practices, such as removing or turning under all plant debris and a three-year crop rotation, can help reduce losses from this disease.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Spider mites Two-spotted spider mite":
            title = currentState;
            casualAgent = "Tetranychus urticae";
            distribution = "Worldwide";
            symptoms =
                "Infestations by two-spotted spider mites lead to characteristic symptoms, including stippling or tiny yellow dots on leaves, webbing on plant surfaces, and eventually, leaf discoloration and defoliation.";
            conditions =
                "Spider mites thrive in warm, dry environments, with populations exploding during hot and arid conditions. They reproduce quickly, leading to rapid infestations on susceptible plants.";
            control =
                "Effective management strategies for controlling two-spotted spider mites include the use of miticides, targeted application based on pest population levels, implementing cultural practices such as maintaining proper plant hygiene and reducing dust accumulation, and employing biological control agents like predatory mites to suppress spider mite populations and prevent damage to crops and plants.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Target Spot":
            title = currentState;
            casualAgent = "Corynespora cassiicola";
            distribution = "Europe, India, Nigeria, the Caribbean and USA";
            symptoms =
                "All above-ground parts of the plant may become infected. Symptoms begin on leaves as tiny lesions, which rapidly enlarge and develop into light brown lesions with distinct yellow halos. Often, the lesions grow together, causing the infected tissue to collapse. Symptoms on stems also begin as small lesions, which rapidly enlarge and elongate. These lesions may eventually become large enough to girdle the stem, resulting in the collapse of the tissues above that point. When disease is severe, numerous leaf and stem lesions form on plants, causing extensive collapse of tissues and, eventually, the death of the plant. Infection of immature fruit begins as minute, dark brown sunken spots, which enlarge as the disease progresses. Large brown circular lesions with cracked centers develop on mature fruit. Fungal sporulation commonly occurs in these lesions.";
            conditions =
                "This fungus has a broad host range on which it can survive. Infection occurs readily during periods of mild temperatures between 16-32°C (61-90°F) and high moisture. Fungal spores. which often form abundantly on the surface of infected tissues, are spread by air movement and rainfall.";
            control =
                "A good fungicide spray program initiated prior to the onset of symptoms can help reduce losses from this disease.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Tomato mosaic virus":
            title = currentState;
            casualAgent = "Tomato mosaic virus (ToMV)";
            distribution = "Worldwide";
            symptoms =
                "Typical symptoms include a light and dark green mottling of the leaf tissue and stunting of the plant. Foliar symptoms can vary from a chlorotic mottling to necrosis to upward leaf rolling and stem streaking, depending on which strain of ToMV infects the plant. During cool temperatures, leaves may develop a “femleaf” appearance where the leaf blade is greatly reduced. During high temperatures, foliar symptoms may be masked. Occasionally the fruit will show disease symptoms, which vary from an uneven ripening to an internal browning of the fruit wall (brown wall). Brown wall typically occurs on the fruit of the first two clusters and appears several days prior to foliar symptoms. Under certain environmental conditions, some varieties with resistance (heterozygous) to ToMV will show necrotic streaks or spots on the stem. petiole, and foliage as well as on the fruit.";
            conditions =
                "ToMV has a wide host range including many agricultural crops and weeds, all of which can serve as inoculum sources. It is readily transmitted by machinery or workers from infected to healthy plants during handling. Infested debris from a previous crop can lead to infection when the roots of the new tomato plants come in contact with the debris. Chewing insects can transmit the virus, but are not considered a ma1or source of infection. Tomato seed can carry the virus, but actual infection is thought to occur when plants are thinned or transplanted.";
            control =
                "The use of ToMV-resistant varieties is generally the best way to reduce losses from this disease. Avoid planting in soil from previous crops that were infected with ToMV. Steam sterilizing the potting soil and containers as well as all equipment after each crop can reduce disease incidence. Before handling containers or plants be sure all workers wash with soap and water. Sterilizing pruning utensils or snapping off suckers without touching the plant instead of knife pruning help reduce disease incidence. Direct seeding in the field can help reduce the spread of ToMV.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Tomato Yellow Leaf Curl Virus":
            title = currentState;
            casualAgent = "Tomato yellow leaf curl virus (TYLCV)";
            distribution = "Worldwide";
            symptoms =
                "Plants infected at an early stage can be stunted, develop erect branches and have small chlorotic leaflets that cup and twist upward. Severely affected plants generally do not set fruit. Although less severe, yellowing of leaflets, leaf cupping, failure to set fruit and flower abortion can also be common when infection occurs at a later stage. Fruit that has set before the plants become infected often ripens normally.";
            conditions =
                "The virus is acquired from infected tomatoes or several solanaceous weeds by the larvae of the sweet potato whitefly, and is transmitted in a persistent manner by the adult whitefly into a tomato crop. Secondary spread of the virus in a field is common. The virus is not mechanically transmitted, so it is unlikely that it will be spread from infected to healthy plants by workers. Severe outbreaks of the disease are often associated with large populations of the whiteflies.";
            control =
                "The use of tolerant varieties greatly reduces losses from this disease, as does the removal of solanaceous weeds that are in the vicinity of the tomato crop. Applying mineral oil on a regular basis may help slow the rate of spread of the disease by reducing the acquisition and transmission of the virus by the whitefly. Covering plant beds with yellow plastic mulch, which attracts the whiteflies, and then spraying on a regular basis with insecticides has proven effective in some areas.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );
        case "Bacterial spot":
            title = currentState;
            casualAgent =
                "Xanthomonas euvesicatoria, X. vesicatoria, X. perforans, X. gardneri";
            distribution = "Worldwide";
            symptoms =
                "Symptoms can appear on all above ground parts of the plant. The first symptoms observed on the leaves are dark, water-soaked, circular spots that are less than 3 mm in diameter. These spots become angular and the surface may appear greasy with a translucent center and a black margin. The centers of these lesions soon dry and crack, and a yellow halo may surround the lesion. Lesions tend to be more numerous on the young foliage. During periods of high moisture (heavy rain, fog or dew) leaves will take on a blighted appearance rather that the typical leaf spots. Fruit infection begins as small, black, raised specks, which may be surrounded by a white halo that has a greasy appearance. These lesions can enlarge to 4-5 mm (0. 25 inch) in diameter and become brown, slightly raised and scabby in appearance. They can also have raised margins and be sunken in the center.";
            conditions =
                "The bacterium can survive in crop debris, on volunteer plants, weeds and seed. This disease spreads rapidly through seed beds and fields by sprinkler irrigation and wind-driven rains. Infection generally occurs through wounds, such as those made by insects, wind-driven sand and rain, and by high pressure spraying. Warm (24-30°C, 75-86°F) temperatures with sprinkler irrigation or heavy rains favor disease development.";
            control =
                "The use of disease-free seed and transplants is important for the early control of bacterial spot. Copper sprays can provide moderate levels of protection. When bacterial spot is present, avoid the use of overhead irrigation. Rotation to non-host crops and controlling weeds and volunteer plants are good preventive measures. Good sanitation practices, which include cleaning equipment used in diseased fields and plowing under all plant debris immediately after harvest, can help reduce losses from this disease.";
            return showLearnMore(
                title,
                casualAgent,
                distribution,
                symptoms,
                conditions,
                control
            );

        default:
            return null;
    }
};

export default UploadSection;

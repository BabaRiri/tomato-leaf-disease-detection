import { Typography, Container } from "@mui/material";

const TextSection = () => {
    return (
        <Container sx={{ maxwidth: "sm" }}>
            <Typography
                variant="h2"
                align="center"
                color={"#273339"}
                paddingTop={"50px"}
                gutterBottom>
                <b>
                    Tomato Leaf
                    <br />
                    Disease Detection Tool
                </b>
            </Typography>

            <Typography variant="h4" align="center" color={"white"} paragraph>
                This tool helps you identify Tomato Leaf Diseases with just an
                Image.
            </Typography>
        </Container>
    );
};

export default TextSection;

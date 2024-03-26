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
    const handleImage = () => {};
    return (
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
                    <AddPhotoAlternateIcon
                        sx={{ fontSize: 80, color: "#273339" }}
                    />
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom>
                        Choose an image of a <b>Tomato Leaf</b> you would like
                        to analyse.
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        sx={{ backgroundColor: "#273339" }}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput
                            type="file"
                            name="file"
                            onChange={handleImage}
                        />
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default UploadSection;

import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {IconMapPin} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {red} from "@mui/material/colors";


export const Dashboard = () => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    // @ts-ignore
    const today = new Date().toLocaleDateString("es-MX", options);

    const navigate = useNavigate()

    return (
        <Container sx={{height: "100vh"}} maxWidth={"xl"}>
            <Box px={2} py={4}>
                <Typography variant={"h4"} component={"h3"}>
                    Bienvenido, Bryan
                </Typography>
            </Box>
            <Grid container p={2}>
                <Grid xs={12} md={4}>
                    <Card>
                        <CardHeader
                            title="Rutas"
                            subheader={today}
                        />
                        <CardContent>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconMapPin size={"1rem"}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Acajutla, Sonsonate"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconMapPin size={"1rem"}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"El polvón, Sonsonate"}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconMapPin size={"1rem"}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Playa Dorada, Sonsonate"}/>
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions>
                            <Button variant={"contained"}
                                    size={"small"}
                                    color={"error"}
                                    onClick={() => navigate("/routes")}
                            >
                                Ir a rutas
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

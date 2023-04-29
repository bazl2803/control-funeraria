import {useEffect, useState} from "react";
import {AppBar, Box, Breadcrumbs, Button, Link, Stack, TextField, Typography,} from "@mui/material";
import {ServicesTable} from "./ServicesTable";
import {ServiceDialog} from "./ServiceDialog";
import {IconChevronRight} from "@tabler/icons-react";
import axios from "axios";
import {Service} from "../api/Service";
import {ServiceDetail} from "./ServiceDetail";

export const Services = () => {
    const [open, setOpen] = useState(false);

    const [services, setServices] = useState<Service[]>([]);

    async function getServices() {
        try {
            const response = await axios.get("http://localhost:3000/api/services");
            setServices(response.data as Service[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100vh",
                gap: 2,
                overflowY: "auto",
                "::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <AppBar
                sx={{
                    "@media(prefers-color-scheme: light)": {
                        backgroundColor: "white",
                    },
                }}
                position={"sticky"}>

                <Stack
                    sx={{flexGrow: 1, paddingX: "1.2rem", paddingY: "0.5rem"}}
                    direction={"row"}
                    spacing={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Breadcrumbs separator={<IconChevronRight size={"1rem"}/>}>
                        <Link underline="hover" color="inherit" href={"/app"}>
                            <Typography sx={{textDecoration: "none"}}>Home</Typography>
                        </Link>
                        <Typography color="text.primary">Servicios</Typography>
                    </Breadcrumbs>
                    <TextField variant="filled" size="small" label="Buscar"/>
                    <Button onClick={() => setOpen(true)} variant="contained">
                        Nuevo
                    </Button>
                </Stack>
            </AppBar>

            <ServiceDialog open={open} onClose={() => setOpen(false)}/>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 25rem",
                    gap: "1rem",
                    padding: "0 1rem 1rem 1rem",
                }}
            >
                <ServicesTable services={services}/>
                <ServiceDetail serviceId="1"/>
            </Box>
        </Box>
    );
};

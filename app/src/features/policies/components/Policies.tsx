import {useEffect, useState} from "react";
import {AppBar, Box, Breadcrumbs, Button, Link, Stack, TextField, Typography,} from "@mui/material";
import {PolicyDialog} from "./PolicyDialog";
import {IconChevronRight} from "@tabler/icons-react";
import axios from "axios";
import {Policy} from "../api/Policy";
import {PoliciesTable, PolicyPayments} from "@/features/policies";

export const Policies = () => {
    const [open, setOpen] = useState(false);

    const [policies, setPolicies] = useState<Policy[]>([]);

    async function getPolicies() {
        try {
            const response = await axios.get("http://localhost:3000/api/item");
            setPolicies(response.data as Policy[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPolicies();
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
                position="static"
            >
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
                        <Typography color="text.primary">Polizas</Typography>
                    </Breadcrumbs>
                    <TextField variant="filled" size="small" label="Buscar"/>
                    <Button onClick={() => setOpen(true)} variant="contained">
                        Nuevo
                    </Button>
                </Stack>
            </AppBar>

            <PolicyDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    getPolicies();
                }}
            />

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1rem",
                padding: "0 1rem 1rem 1rem",
            }}>
                <PoliciesTable/>
                <PolicyPayments/>
            </Box>
        </Box>
    );
};

import {useState} from "react";
import {AppBar, Box, Breadcrumbs, Button, Link, Stack, TextField, Typography} from "@mui/material";
import {ClientsTable} from "./ClientsTable";
import {ClientModal} from "./ClientModal";
import {IconChevronRight} from "@tabler/icons-react";
import {ClientPolicies} from "@/features/clients/components/ClientPolicies";

export const Clients = () => {
    const [open, setOpen] = useState(false);
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

                <Stack sx={{flexGrow: 1, paddingX: "1.2rem", paddingY: "0.5rem"}}
                       direction={"row"}
                       spacing={4}
                       justifyContent={"space-between"}
                       alignItems={"center"}>
                    <Breadcrumbs separator={<IconChevronRight size={"1rem"}/>}>
                        <Link underline="hover" color="inherit" href={"/app"}>
                            <Typography sx={{textDecoration: "none"}}>Home</Typography>
                        </Link>
                        <Typography color="text.primary">Clientes</Typography>
                    </Breadcrumbs>
                    <TextField variant="filled" size="small" label="Buscar"/>
                    <Button onClick={() => setOpen(true)} variant="contained">
                        Nuevo
                    </Button>
                </Stack>
            </AppBar>

            <ClientModal open={open} onClose={() => setOpen(false)}/>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1rem",
                padding: "0 1rem 1rem 1rem",
            }}>
                <ClientsTable/>
                <ClientPolicies/>
            </Box>
        </Box>
    );
};

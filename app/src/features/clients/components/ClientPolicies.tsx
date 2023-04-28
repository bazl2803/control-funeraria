import {Button, LinearProgress, List, ListItemButton, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {PolicyDialog} from "@/features/policies";
import {useState} from "react";
import {IconCirclePlus} from "@tabler/icons-react";

export const ClientPolicies = () => {
    const [open, setOpen] = useState(false);
    return (
        <Paper sx={{padding: "1rem", width: "25rem"}} elevation={2}>
            <Typography variant={"h6"}>
                Polizas
            </Typography>
            <List>
                <ListItemButton>
                    <Stack width={"100%"} padding={1}>
                        <ListItemText primary={"#000001"} secondary={"Estándar Sencillo"}/>
                        <LinearProgress value={50} variant={"determinate"}/>
                    </Stack>
                </ListItemButton>
            </List>

            <PolicyDialog open={open} onClose={() => {
                console.log("Obtener Polizas");
                setOpen(false);
            }}/>

            <Button startIcon={<IconCirclePlus/>}
                    fullWidth
                    onClick={() => setOpen(true)}>
                Nueva Poliza
            </Button>
        </Paper>
    );
};
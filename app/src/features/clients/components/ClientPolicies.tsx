import {LinearProgress, List, ListItemButton, ListItemText, Paper, Stack, Typography} from "@mui/material";

export const ClientPolicies = () => {
    return (
        <Paper sx={{padding: "1rem", width: "25rem"}} elevation={2}>
            <Typography variant={"h6"}>
                Polizas
            </Typography>
            <List>
                <ListItemButton>
                    <Stack width={"100%"} padding={1}>
                        <ListItemText primary={"#000001"} secondary={"Estándar Sencillo"}/>
                        <LinearProgress  value={50} variant={"determinate"}/>
                    </Stack>
                </ListItemButton>
            </List>
        </Paper>
    );
};
import {useEffect, useState} from "react";
import {AppBar, Box, Breadcrumbs, Button, Link, Stack, TextField, Typography,} from "@mui/material";
import {ItemsTable} from "./ItemsTable";
import {ItemDialog} from "./ItemDialog";
import {IconChevronRight} from "@tabler/icons-react";
import axios from "axios";
import {Item} from "../api/Item";
import {ItemLog} from "./ItemLog";

export const Items = () => {
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState<Item[]>([]);

    async function getItems() {
        try {
            const response = await axios.get("http://localhost:3000/api/items");
            setItems(response.data as Item[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getItems();
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
                        <Typography color="text.primary">Mobiliario</Typography>
                    </Breadcrumbs>
                    <TextField variant="filled" size="small" label="Buscar"/>
                    <Button onClick={() => setOpen(true)} variant="contained">
                        Nuevo
                    </Button>
                </Stack>
            </AppBar>

            <ItemDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    getItems();
                }}
            />

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1rem",
                padding: "0 1rem 1rem 1rem",
            }}>
                <ItemsTable items={items}/>
                <ItemLog itemId="1"/>
            </Box>
        </Box>
    );
};

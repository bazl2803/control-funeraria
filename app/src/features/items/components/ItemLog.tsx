import {useEffect, useState} from "react";
import {Paper, Stack, Typography,} from "@mui/material";
import {Item} from "../api/Item";
import axios from "axios";

interface Props {
    itemId: string;
}

export const ItemLog = (props: Props) => {
    const [item, setitem] = useState<Item>();

    async function getitem() {
        try {
            const response =
                await axios.get(`http://localhost:3000/api/items/${props.itemId}`);
            setitem(response.data as Item);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getitem();
    }, []);

    return (
        <Paper sx={{padding: "1rem", width: "25rem"}} elevation={2}>
            <Stack>
                <Typography variant="h6">Registro</Typography>
            </Stack>
        </Paper>
    );
};

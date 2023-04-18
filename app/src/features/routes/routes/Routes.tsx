import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    SelectChangeEvent,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {IconMapPin} from "@tabler/icons-react";

export const Routes = () => {
    const [route, setRoute] = useState("");
    const navigate = useNavigate()

    const handleChange = (event: SelectChangeEvent) => {
        setRoute(event.target.value as string);
    };

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            padding: 2,
            gap: 4,
            height: "100%"
        }}>
            <Stack sx={{gridColumn: 1}} spacing={1}>
                <Typography variant={"h6"}>Rutas</Typography>
                <List sx={{flexGrow: 1}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <IconMapPin/>
                        </ListItemIcon>
                        <ListItemText primary={"Sonsonate"} secondary={"Sonsonate"}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <IconMapPin/>
                        </ListItemIcon>
                        <ListItemText primary={"Juayúa"} secondary={"Sonsonate"}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <IconMapPin/>
                        </ListItemIcon>
                        <ListItemText primary={"Sonzacate"} secondary={"Sonsonate"}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <IconMapPin/>
                        </ListItemIcon>
                        <ListItemText primary={"El Polvón"} secondary={"Sonsonate"}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <IconMapPin/>
                        </ListItemIcon>
                        <ListItemText primary={"Playa Dorada"} secondary={"Sonsonate"}/>
                    </ListItemButton>
                </List>
            </Stack>
            <TableContainer sx={{gridColumn: 2}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Saldo</TableCell>
                            <TableCell>Cuota</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Box>
    );
};
import {
    AppBar,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Toolbar
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const Routes = () => {
    const [route, setRoute] = useState("");
    const navigate = useNavigate()

    const handleChange = (event: SelectChangeEvent) => {
        setRoute(event.target.value as string);
    };

    return (
        <Stack>
            <AppBar>
                <Toolbar>
                    <FormControl variant={"filled"} fullWidth>
                        <InputLabel id={'route-name'}>Ruta</InputLabel>
                        <Select value={route}
                                onChange={handleChange}
                                size={"small"}
                                labelId={'route-name'}>
                            <MenuItem value={"Sonsonate"}>Sonsonate</MenuItem>
                            <MenuItem value={"El Polvón"}>El Polvón</MenuItem>
                            <MenuItem value={"La majada"}>La Majada</MenuItem>
                            <MenuItem value={"Guaymango"}>Guaymango</MenuItem>
                            <MenuItem value={"Playa Dorada"}>Playa Dorada</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <Container>
                Lista de Clientes en esta ruta
            </Container>
        </Stack>
    );
};
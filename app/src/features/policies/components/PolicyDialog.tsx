import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {Service} from "@/features/services/api/Service";
import {Policy} from "@/features/policies/api/Policy";
import axios from "axios";

interface Props extends DialogProps {
    onClose: () => void;
    clientId: number
}

export const PolicyDialog: React.FC<Props> = (props) => {
    const [policy, setPolicy] = useState<Policy>();
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service>();

    async function getServices() {
        try {
            const response = await axios.get("http://localhost:3000/api/service");
            setServices(response.data as Service[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    function handleSubmit() {
        axios
            .post("http://localhost:3000/api/policies", policy, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => console.log(response.data))
            .catch((error) => console.error(error))
            .finally(() => props.onClose && props.onClose());
    }

    useEffect(() => {
        getServices()
    }, []);

    return (
        <Dialog {...props} fullWidth maxWidth={"sm"}>
            <DialogTitle my={"1rem"}>
                Nueva Poliza
            </DialogTitle>
            <DialogContent sx={{padding: "0 1.5rem 1.5rem 1.5rem"}}>
                <Stack spacing={4}>
                    <FormControl fullWidth>
                        <FormLabel id="demo-row-radio-buttons-group-label">Modalidad</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            sx={{justifyContent: "space-between"}}
                        >
                            <FormControlLabel value="Pasivo" control={<Radio/>} label="Pasivo"/>
                            <FormControlLabel value="Crédito" control={<Radio/>} label="Crédito"/>
                            <FormControlLabel value="Reserva" control={<Radio/>} label="Reserva"/>
                            <FormControlLabel value="Contado" control={<Radio/>} label="Contado"/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl variant={"filled"} size={"small"}>
                        <InputLabel id={"service-select-label"}>
                            Servicio
                        </InputLabel>
                        <Select labelId={"service-select-label"} variant={"filled"}>
                            {services.map((service) => (
                                <MenuItem key={service.id}
                                          value={service.id}
                                          onClick={() => {
                                              setSelectedService(service)
                                          }}>
                                    {service.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction={"row"} spacing={1}>
                        <FormControl size="small" variant="filled" fullWidth>
                            <InputLabel>Valor</InputLabel>
                            <FilledInput
                                value={selectedService?.price}
                                size={"small"}
                                type={"number"}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>

                        <FormControl size="small" variant="filled" fullWidth>
                            <InputLabel>Prima</InputLabel>
                            <FilledInput
                                value={selectedService?.prime}
                                size={"small"}
                                type={"number"}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>

                        <FormControl size="small" variant="filled" fullWidth>
                            <InputLabel>Cuota</InputLabel>
                            <FilledInput
                                value={selectedService?.fee}
                                size={"small"}
                                type={"number"}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
                            />
                        </FormControl>

                    </Stack>

                    <TextField variant="filled" label="Notas" size={"small"} multiline rows={3}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack direction={"row"} spacing={2} padding={2}>
                    <Button onClick={() => props.onClose && props.onClose()}>Cancelar</Button>
                    <Button onClick={() => props.onClose && props.onClose()}
                            variant={"contained"}>Guardar</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
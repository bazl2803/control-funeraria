import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";

interface Props extends DialogProps {
    onClose?: () => void;
}

export const ClientModal: React.FC<Props> = (props) => {
    const {onClose} = props;
    const [activeStep, setActiveStep] = useState(0);
    const [client, setClient] = useState({
        name: "",
        type: "Persona",
        doc_id: "",
        incomes: "",
        status: "",
        route_id: 0,
        route_index: 0,
        extension_day: 0,
        method: "",
        phone_number: "",
        email: "",
        job: "",
        created_at: new Date(),
    });

    const handleSubmit = () => {
        axios
            .post("http://localhost:3000/api/clients", client, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => console.log(response.data))
            .catch((error) => console.error(error))
            .finally(() => onClose && onClose());
    };

    const handleClose = () => {
        if (onClose) {
            onClose()
            setClient({
                name: "",
                type: "Persona",
                doc_id: "",
                incomes: "",
                status: "",
                route_id: 0,
                route_index: 0,
                extension_day: 0,
                method: "",
                phone_number: "",
                email: "",
                job: "",
                created_at: new Date(),
            })
            setActiveStep(0)
        }
    }

    const page1 = (
        <Box>
            <Stack spacing={4} padding={2}>
                <Stack direction={"row"} alignItems={"end"} justifyContent={"space-between"}>
                    <FormControl size="small" fullWidth>
                        <FormLabel id="type_radio_group">Tipo de Cliente</FormLabel>
                        <RadioGroup
                            aria-labelledby="type_radio_group"
                            value={client?.type}
                            onChange={(e) => setClient({...client, type: e.target.value})}
                            name="radio-buttons-group"
                        >
                            <Stack direction={"row"}>
                                <FormControlLabel
                                    value="Persona"
                                    control={<Radio/>}
                                    label="Persona"
                                />

                                <FormControlLabel
                                    value="Empresa"
                                    control={<Radio/>}
                                    label="Empresa"
                                />
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        variant="filled"
                        label="Documento de identidad"
                        size="small"
                        fullWidth
                    />
                </Stack>

                <TextField variant="filled" label="Nombre" size="small"/>
                <TextField variant="filled" label="Teléfono" type="tel" size="small"/>
                <TextField variant="filled" label="Correo Electrónico" type="email" size="small"/>
            </Stack>
        </Box>
    );

    const page2 = (
        <Box>
            <Stack spacing={4} padding={2}>
                <Stack direction={"row"} spacing={2}>
                    <TextField variant="filled" label="Profesión" size={"small"} fullWidth/>
                    <TextField variant="filled" label="Ingresos" size={"small"} type={"number"} fullWidth/>
                </Stack>

                <Stack direction={"row"} spacing={2}>
                    <FormControl variant="filled" size={"small"} fullWidth>
                        <InputLabel id="route_label">Método de Pago</InputLabel>
                        <Select labelId={"route_label"}>
                            <MenuItem value={1}>Oficina</MenuItem>
                            <MenuItem value={2}>Ruta</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" size={"small"} fullWidth>
                        <InputLabel id="route_label">Modalidad</InputLabel>
                        <Select labelId={"route_label"}>
                            <MenuItem value={1}>Pasivo</MenuItem>
                            <MenuItem value={2}>Crédito</MenuItem>
                            <MenuItem value={3}>Reserva</MenuItem>
                            <MenuItem value={4}>Contado</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <TextField variant="filled" label="Dirección" size={"small"} multiline rows={3}/>

                <FormControl variant="filled" size={"small"}>
                    <InputLabel id="route_label">Ruta</InputLabel>
                    <Select labelId={"route_label"}>
                        <MenuItem value={1}>Sonsonate</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );

    const steps = [
        {title: "Datos del Cliente", page: page1},
        {title: "Datos de Pago", page: page2},
        {title: "Servicio"},
    ];

    return (
        <Dialog scroll="paper" maxWidth="sm" fullWidth {...props}>
            <DialogTitle mt={"1rem"}>Nuevo Cliente</DialogTitle>
            <DialogContent sx={{padding: "1rem"}}>
                <Stepper sx={{margin: "1rem 1rem 1rem 0"}} activeStep={activeStep}>
                    {steps.map((step) => {
                        return (
                            <Step>
                                <StepLabel>{step.title}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {steps[activeStep].page}
            </DialogContent>
            <DialogActions sx={{margin: "1.5rem"}}>
                <Stack direction={"row"}
                       justifyContent={"space-between"}
                       spacing={2}
                       width={"100%"}
                >
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Stack direction={"row"}
                           justifyContent={"space-between"}
                           spacing={2}>
                        {activeStep > 0 && <Button onClick={() => setActiveStep(activeStep - 1)}>Atrás</Button>}
                        {activeStep + 1 < steps.length &&
                            <Button onClick={() => setActiveStep(activeStep + 1)}>Siguiente</Button>}
                        {activeStep + 1 === steps.length &&
                            <Button variant={"contained"} onClick={() => {
                                setActiveStep(0);
                                handleClose()
                            }}>Finalizar</Button>}
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

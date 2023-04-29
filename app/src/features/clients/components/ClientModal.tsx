import {
    Box,
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
    Step,
    StepLabel,
    Stepper,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Service} from "@/features/services/api/Service";
import {Route} from "@/features/routes/api/Route";

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
    const [services, setServices] = useState<Service[]>();
    const [selectedService, setSelectedService] = useState<Service>();
    const [routes, setRoutes] = useState<Route[]>();
    const [selectedRoute, setSelectedRoute] = useState<Route>();


    async function getServices() {
        try {
            const response = await axios.get("http://localhost:3000/api/services");
            setServices(response.data as Service[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function getRoutes() {
        try {
            const response = await axios.get("http://localhost:3000/api/routes");
            setRoutes(response.data as Route[]);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getServices();
        getRoutes();
    }, [])

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
            onClose();
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
            });
            setActiveStep(0);
        }
    };

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
                                <FormControlLabel value="Persona" control={<Radio/>} label="Persona"/>

                                <FormControlLabel value="Empresa" control={<Radio/>} label="Empresa"/>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        value={client.doc_id}
                        variant="filled"
                        label="Documento de identidad"
                        size="small"
                        fullWidth
                        onChange={(e) => setClient({...client, doc_id: e.target.value})}
                    />
                </Stack>

                <TextField
                    value={client.name}
                    variant="filled"
                    label="Nombre"
                    size="small"
                    onChange={(e) => setClient({...client, name: e.target.value})}
                />
                <TextField
                    value={client.phone_number}
                    variant="filled"
                    label="Teléfono"
                    type="tel"
                    size="small"
                    onChange={(e) => setClient({...client, phone_number: e.target.value})}
                />
                <TextField
                    value={client.email}
                    variant="filled"
                    label="Correo Electrónico"
                    type="email"
                    size="small"
                    onChange={(e) => setClient({...client, email: e.target.value})}
                />
            </Stack>
        </Box>
    );

    const page2 = (
        <Box>
            <Stack spacing={4} padding={2}>
                <Stack direction={"row"} spacing={2}>
                    <TextField variant="filled" label="Profesión" size={"small"} fullWidth/>

                    <FormControl size="small" variant="filled" fullWidth>
                        <InputLabel>Ingresos</InputLabel>
                        <FilledInput
                            size={"small"}
                            type={"number"}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
                        />
                    </FormControl>
                </Stack>

                <Stack direction={"row"} spacing={2}>
                    <FormControl variant="filled" size={"small"} fullWidth>
                        <InputLabel id="route_label">Método de Cobro</InputLabel>
                        <Select defaultValue={""} labelId={"route_label"}>
                            <MenuItem value={""} disabled>
                                Métodos de Cobro
                            </MenuItem>
                            <MenuItem value={"Oficina"}>Oficina</MenuItem>
                            <MenuItem value={"Banco"}>Banco</MenuItem>
                            <MenuItem value={"Ruta"}>Ruta</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" size={"small"} fullWidth>
                        <InputLabel id="route_label">Modalidad de Pago</InputLabel>
                        <Select defaultValue={""} labelId={"route_label"}>
                            <MenuItem value={""} disabled>
                                Modalidades
                            </MenuItem>
                            <MenuItem value={"Pasivo"}>Pasivo</MenuItem>
                            <MenuItem value={"Crédito"}>Crédito</MenuItem>
                            <MenuItem value={"Reserva"}>Reserva</MenuItem>
                            <MenuItem value={"Contado"}>Contado</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <TextField variant="filled" label="Dirección" size={"small"} multiline rows={2}/>

                <Stack direction={"row"} spacing={2}>
                    <FormControl variant="filled" size={"small"} fullWidth>
                        <InputLabel id="route_label">Ruta</InputLabel>
                        <Select value={client.route_id} labelId={"route_label"}
                                onChange={(e) =>
                                    setClient({
                                        ...client,
                                        route_id: parseInt(e.target.value as string)
                                    })}>
                            <MenuItem disabled>
                                Rutas
                            </MenuItem>
                            {routes?.map((route) => (
                                <MenuItem key={route.id}
                                          value={route.id}
                                          onClick={() => setSelectedRoute(route)}>
                                    {`${route.name}, ${route.location}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" variant="filled">
                        <InputLabel>Dia de Cobro</InputLabel>
                        <FilledInput
                            value={selectedRoute?.payday}
                            size={"small"}
                            type={"number"}
                        />
                    </FormControl>
                </Stack>
            </Stack>
        </Box>
    );

    const page3 = (
        <Box>
            <Stack spacing={4} padding={2}>
                <FormControl variant="filled" size={"small"}>
                    <InputLabel id="route_label">Servicio</InputLabel>
                    <Select defaultValue={""}
                            labelId={"route_label"}>
                        <MenuItem value={""} disabled>
                            Servicios
                        </MenuItem>
                        {
                            services?.map((service) => (
                                <MenuItem key={service.id}
                                          value={service.id}
                                          onClick={() => setSelectedService(service)}>
                                    {service.name}
                                </MenuItem>
                            ))
                        }
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
        </Box>
    );

    const steps = [
        {title: "Datos del Cliente", page: page1},
        {title: "Datos de Pago", page: page2},
        {title: "Servicio", page: page3},
    ];

    return (
        <Dialog scroll="paper" maxWidth="sm" fullWidth {...props}>
            <DialogTitle mt={"1rem"}>Nuevo Cliente</DialogTitle>
            <DialogContent sx={{padding: "1rem"}}>
                <Stepper sx={{margin: "1rem 1rem 1rem 0.5rem"}} activeStep={activeStep}>
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
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2} width={"100%"}>
                    <Button onClick={() => handleClose()}>Cancelar</Button>
                    <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                        {activeStep > 0 && <Button onClick={() => setActiveStep(activeStep - 1)}>Atrás</Button>}
                        {activeStep + 1 < steps.length && (
                            <Button onClick={() => setActiveStep(activeStep + 1)}>Siguiente</Button>
                        )}
                        {activeStep + 1 === steps.length && (
                            <Button
                                variant={"contained"}
                                onClick={() => {
                                    handleSubmit();
                                    setActiveStep(0);
                                    handleClose();
                                }}
                            >
                                Finalizar
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

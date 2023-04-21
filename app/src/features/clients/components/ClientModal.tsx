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
import React, { useState } from "react";
import { Client } from "../api/Client";

interface Props extends DialogProps {
  onClose?: () => void;
}

export const ClientModal: React.FC<Props> = (props) => {
  const { onClose } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [client, setClient] = useState<Client>({
    name: "",
    type: "",
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

  const page1 = () => (
    <Box>
      <Stack spacing={4} padding={2}>
        <TextField label="Nombre" size="small" />
        <FormControl size="small">
          <FormLabel id="type_radio_group">Tipo de Cliente</FormLabel>
          <RadioGroup
            aria-labelledby="type_radio_group"
            value={client.type}
            onChange={(e) => setClient({ ...client, type: e.target.value })}
            name="radio-buttons-group"
          >
            <Stack direction={"row"}>
              <FormControlLabel
                value="Persona"
                control={<Radio />}
                label="Persona"
              />

              <FormControlLabel
                value="Empresa"
                control={<Radio />}
                label="Empresa"
              />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>
    </Box>
  );

  const steps = [{ title: "Datos del Cliente", page: page1 }];

  return (
    <Dialog scroll="paper" maxWidth="xs" fullWidth {...props}>
      <DialogTitle>Nueva Ruta</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

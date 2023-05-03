import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Service } from "@/features/services/api/Service";
import { Route } from "@/features/routes/api/Route";
import { Client } from "../api/Client";
import { ClientsModalOne } from "./ClientsModalOne";
import { ClientsModalTwo } from "./ClientsModalTwo";
import { ClientsModalThree } from "./ClientsModalThree";
import { ClientsModalFour } from "./ClientsModalFour";
import { Policy } from "@/features/policies/api/Policy";

interface Props extends DialogProps {
  onClose?: () => void;
}

interface ClientContextState {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
  policy: Policy;
  setPolicy: React.Dispatch<React.SetStateAction<Policy>>;
}

export const ClientContext = React.createContext<ClientContextState>({} as ClientContextState);

export const ClientModal: React.FC<Props> = (props) => {
  const CLIENT_INITIAL_STATE: Client = {
    id: 0,
    name: "",
    type: "Persona",
    doc_id: "",
    incomes: 0,
    status: "",
    address: "",
    extension_day: 0,
    method: "",
    phone_number: "",
    email: "",
    job: "",
    created_at: new Date(),
  };

  const POLICY_INITIAL_STATE: Policy = {
    balance: 0,
    serviceId: 0,
    clientId: 0,
  };

  const { onClose } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [client, setClient] = useState(CLIENT_INITIAL_STATE);
  const [policy, setPolicy] = useState(POLICY_INITIAL_STATE);

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
        incomes: 0,
        status: "",
        address: "",
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

  const steps = ["Datos del Cliente", "Forma de Pago", "Tipo de Servicio", "Estado del Servicio"];

  return (
    <Dialog scroll="body" maxWidth="sm" fullWidth {...props}>
      <DialogTitle mt={"1rem"}>Nuevo Cliente</DialogTitle>
      <DialogContent sx={{ padding: "1rem" }}>
        <Stepper sx={{ margin: "1rem 0rem 1rem 0.5rem" }} activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <ClientContext.Provider value={{ client, setClient, policy, setPolicy }}>
          {activeStep === 0 && <ClientsModalOne />}
          {activeStep === 1 && <ClientsModalTwo />}
          {activeStep === 2 && <ClientsModalThree />}
          {activeStep === 3 && <ClientsModalFour />}
        </ClientContext.Provider>
      </DialogContent>
      <DialogActions sx={{ margin: "1.5rem" }}>
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

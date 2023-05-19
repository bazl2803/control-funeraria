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
import React, { useState } from "react";
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
  policy: Omit<Policy, "clientId">;
  setPolicy: React.Dispatch<React.SetStateAction<Omit<Policy, "clientId">>>;
}

export const ClientContext = React.createContext<ClientContextState>({} as ClientContextState);

export const ClientModal: React.FC<Props> = (props) => {
  const CLIENT_INITIAL_STATE: Client = {
    name: "",
    type: "Persona",
    doc_id: "",
    incomes: 0,
    status: true,
    address: "",
    extension_day: 0,
    method: "",
    phone_number: "",
    email: "",
    job: "",
    created_at: new Date(),
  };

  const POLICY_INITIAL_STATE: Omit<Policy, "clientId" | "id"> = {
    serviceId: 0,
    balance: 0,
    value: 0,
    prime: 0,
    fee: 0,
  };

  const { onClose } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [client, setClient] = useState(CLIENT_INITIAL_STATE);
  const [policy, setPolicy] = useState(POLICY_INITIAL_STATE);

  const handleSubmit = () => {
    const data = { ...client, policy: { create: { ...policy } } };
    axios
      .post("http://localhost:3000/api/clients", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Client response:", response);
      })
      .catch((error) => console.error(error))
      .finally(() => onClose && onClose());
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
      setClient(CLIENT_INITIAL_STATE);
      setPolicy(POLICY_INITIAL_STATE);
      setActiveStep(0);
    }
  };

  const steps = ["Datos del Cliente", "Forma de Pago", "Tipo de Servicio"];

  return (
    <Dialog scroll="body" maxWidth="sm" fullWidth {...props}>
      <DialogTitle mt={"1rem"}>Nuevo Cliente</DialogTitle>
      <DialogContent sx={{ padding: "1rem" }}>
        <Stepper sx={{ margin: "1rem 0rem 1rem 0.5rem" }} activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <ClientContext.Provider value={{ client, setClient, policy, setPolicy }}>
          {activeStep === 0 && <ClientsModalOne />}
          {activeStep === 1 && <ClientsModalTwo />}
          {activeStep === 2 && <ClientsModalThree />}
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

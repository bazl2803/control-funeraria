import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Service } from "../api/Service";
import axios from "axios";

interface Props extends DialogProps {
  onClose: () => void;
}

export const ServiceDialog: React.FC<Props> = (props) => {
  const [service, setService] = useState<Service>({
    name: "",
    price: 0,
    prime: 0,
    fee: 0,
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/services", service, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error))
      .finally(() => props.onClose && props.onClose());
  };

  return (
    <Dialog scroll="paper" maxWidth="sm" fullWidth {...props}>
      <DialogTitle my={"1rem"}>Nuevo Servicio</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <TextField
            label="Nombre"
            value={service.name}
            size="small"
            variant="filled"
            onChange={(e) => setService({ ...service, name: e.target.value })}
          />

          <Stack direction={"row"} spacing={2}>
            <FormControl size="small" variant="filled" fullWidth>
              <InputLabel>Valor</InputLabel>
              <FilledInput
                value={service.price}
                size={"small"}
                type={"number"}
                inputProps={{min: 1}}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                onChange={(e) => setService({ ...service, price: parseFloat(e.target.value) })}
              />
            </FormControl>

            <FormControl size="small" variant="filled" fullWidth>
              <InputLabel>Prima</InputLabel>
              <FilledInput
                value={service.prime}
                size={"small"}
                type={"number"}
                inputProps={{min: 1}}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                onChange={(e) => setService({ ...service, prime: parseFloat(e.target.value) })}
              />
            </FormControl>

            <FormControl size="small" variant="filled" fullWidth>
              <InputLabel>Cuota</InputLabel>
              <FilledInput
                value={service.fee}
                size={"small"}
                type={"number"}
                inputProps={{min: 1}}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
                onChange={(e) => setService({ ...service, fee: parseFloat(e.target.value) })}
              />
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: " 1.5rem 1.6rem" }}>
        <Button onClick={() => props.onClose && props.onClose()}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

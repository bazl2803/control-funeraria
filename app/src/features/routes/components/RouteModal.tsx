import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose?: () => void;
}

export const RouteModal: React.FC<Props> = (props) => {
  const { onClose } = props;
  const [route, setRoute] = useState<{
    name: string;
    location: string;
    payday: number;
  }>({
    name: "",
    location: "Sonsonate",
    payday: 1,
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/routes", route, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error))
      .finally(() => onClose && onClose());
  };

  return (
    <Dialog scroll="paper" maxWidth="xs" fullWidth {...props}>
      <DialogTitle m={1} mt={2}>Nueva Ruta</DialogTitle>
      <DialogContent>
        <Stack spacing={4} padding={1}>
          <TextField
            value={route.name}
            variant="filled"
            size="small"
            label="Nombre"
            fullWidth
            onChange={(e) => setRoute({ ...route, name: e.target.value })}
          />

          <FormControl variant="filled" fullWidth>
            <InputLabel id="location_label">Ubicación</InputLabel>
            <Select
              value={route.location}
              labelId="location_label"
              size="small"
              fullWidth
              onChange={(e) => {
                setRoute({ ...route, location: e.target.value });
              }}
            >
              <MenuItem value="Ahuachapán">Ahuachapán</MenuItem>
              <MenuItem value="La Libertad">La Libertad</MenuItem>
              <MenuItem value="Santa Ana">Santa Ana</MenuItem>
              <MenuItem value="San Salvador">San Salvador</MenuItem>
              <MenuItem value="Sonsonate">Sonsonate</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={route.payday}
            label="Día de Cobro"
            variant="filled"
            fullWidth
            type="number"
            onChange={(e) => setRoute({ ...route, payday: parseInt(e.target.value) })}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: "1",
              max: "28",
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" px={3} pb={2} spacing={1}>
          <Button onClick={() => onClose && onClose()}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

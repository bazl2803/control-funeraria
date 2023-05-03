import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FilledInput,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Item } from "../api/Item";
import axios from "axios";

interface Props extends DialogProps {
  onClose: () => void;
}

export const ItemDialog: React.FC<Props> = (props) => {
  const [item, setItem] = useState<Item>({
    name: "",
    stock: 0,
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/items", item, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error))
      .finally(() => props.onClose && props.onClose());
  };

  return (
    <Dialog scroll="paper" maxWidth="xs" fullWidth {...props}>
      <DialogTitle my={"1rem"}>Nuevo Artículo</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} spacing={4}>
          <TextField
            label="Nombre"
            value={item.name}
            size="small"
            variant="filled"
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            fullWidth
          />

          <FormControl size="small" variant="filled">
            <InputLabel>Inventario Inicial</InputLabel>
            <FilledInput
              value={item.stock}
              size={"small"}
              type={"number"}
              inputProps={{ min: 1 }}
              onChange={(e) => setItem({ ...item, stock: parseInt(e.target.value) })}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: " 1.5rem 1.6rem" }}>
        <Button onClick={() => props.onClose && props.onClose()}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

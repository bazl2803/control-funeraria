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
import { PrismaClient } from "@prisma/client";
import React, { useState } from "react";

interface Props extends DialogProps {
  onClose: () => void;
}

export const RouteModal: React.FC<Props> = (props) => {
  const [route, setRoute] = useState<{ name: string; location: string }>({
    name: "",
    location: "",
  });

  const handleSubmit = () => {
    try {
      const prisma = new PrismaClient();
      prisma.route.create({
        data: {
          name: route?.name,
          location: route?.location,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog scroll="paper" {...props}>
      <DialogTitle>Nueva Ruta</DialogTitle>
      <DialogContent>
        <Stack spacing={4} padding={2}>
          <TextField
            value={route.name}
            variant="standard"
            size="small"
            label="Nombre"
            onChange={(e) => setRoute({ ...route, name: e.target.value })}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel id="location_label">Ubicación</InputLabel>
            <Select
              value={route.location}
              labelId="location_label"
              size="small"
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { ClientContext } from "./ClientModal";

export const ClientsModalOne: React.FC = () => {
  const { client, setClient } = useContext(ClientContext);

  return (
    <Box>
      <Stack spacing={4} padding={2}>
        <Stack direction={"row"} alignItems={"end"} justifyContent={"space-between"}>
          <FormControl size="small" fullWidth>
            <FormLabel id="type_radio_group">Tipo de Cliente</FormLabel>
            <RadioGroup
              value={client.type}
              onChange={(e) => setClient({ ...client, type: e.target.value })}
              aria-labelledby="type_radio_group"
              name="radio-buttons-group"
            >
              <Stack direction={"row"}>
                <FormControlLabel value="Persona" control={<Radio />} label="Persona" />

                <FormControlLabel value="Empresa" control={<Radio />} label="Empresa" />
              </Stack>
            </RadioGroup>
          </FormControl>

          <TextField
            value={client.doc_id}
            onChange={(e) => setClient({ ...client, doc_id: e.target.value })}
            variant="filled"
            label="Documento de identidad"
            size="small"
            fullWidth
          />
        </Stack>

        <TextField
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          variant="filled"
          label="Nombre"
          size="small"
        />
        
        <TextField
          value={client.phone_number}
          onChange={(e) => setClient({ ...client, phone_number: e.target.value })}
          variant="filled"
          label="Teléfono"
          type="tel"
          size="small"
        />

        <TextField
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
          variant="filled"
          label="Correo Electrónico"
          type="email"
          size="small"
        />
      </Stack>
    </Box>
  );
};

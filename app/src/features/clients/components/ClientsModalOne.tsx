import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Input,
  InputLabel,
  FilledInput,
} from "@mui/material";
import { useContext } from "react";
import { ClientContext } from "./ClientModal";
import { PhoneMask } from "@/components/PhoneMask/PhoneMask";
import { DocumentMask } from "@/components/DocumentMask/DocumentMask";

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

          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="DUI">DUI</InputLabel>
            <FilledInput
              value={client.doc_id}
              onChange={(e) => setClient({ ...client, doc_id: e.target.value })}
              name="doc_id"
              size="small"
              id="DUI"
              // inputComponent={DocumentMask as any}
            />
          </FormControl>
        </Stack>

        <TextField
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          variant="filled"
          label="Nombre"
          size="small"
        />

        <FormControl variant="filled">
          <InputLabel htmlFor="formatted-text-mask-input">Teléfono</InputLabel>
          <FilledInput
            value={client.phone_number}
            onChange={(e) => setClient({ ...client, phone_number: e.target.value })}
            name="phone_number"
            type="tel"
            size="small"
            id="formatted-text-mask-input"
            inputComponent={PhoneMask as any}
          />
        </FormControl>

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

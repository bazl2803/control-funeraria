import React from "react";
import {
  Box,
  Stack,
  FormControl,
  TextField,
  FilledInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { ClientContext } from "./ClientModal";

export const ClientsModalFour = () => {
  const { client, setClient, policy, setPolicy } = React.useContext(ClientContext);
  return (
    <Box>
      <Stack spacing={4} padding={2}>
        <FormControl size="small" variant="filled" fullWidth>
          <InputLabel>Saldo Actual</InputLabel>
          <FilledInput
            value={policy.balance}
            onChange={(e) => setPolicy({ ...policy, balance: parseFloat(e.target.value) })}
            size={"small"}
            type={"number"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        <TextField
          value={policy.notes}
          onChange={(e) => setPolicy({ ...policy, notes: policy.notes })}
          variant="filled"
          label="Notas"
          size={"small"}
          multiline
          rows={3}
        />
      </Stack>
    </Box>
  );
};

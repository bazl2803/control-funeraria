import {
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  TextField,
  FilledInput,
  InputAdornment,
  InputLabel,
  Checkbox,
} from "@mui/material";

export const ClientsModalFour = () => {
  return (
    <Box>
      <Stack spacing={4} padding={2}>
        <FormControl size="small" variant="filled" fullWidth>
          <InputLabel>Saldo Actual</InputLabel>
          <FilledInput
            size={"small"}
            type={"number"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        <FormControlLabel control={<Checkbox defaultChecked />} label="Entregado" />

        <TextField variant="filled" label="Notas" size={"small"} multiline rows={3} />
      </Stack>
    </Box>
  );
};

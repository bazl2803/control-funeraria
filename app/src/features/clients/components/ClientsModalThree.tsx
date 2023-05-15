import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FilledInput,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { ClientContext } from "./ClientModal";
import axios from "axios";
import { Service } from "@/features/services/api/Service";

export const ClientsModalThree: React.FC = () => {
  const { policy, setPolicy } = React.useContext(ClientContext);
  const [services, setServices] = React.useState<Service[]>([]);

  async function getServices() {
    try {
      const response = await axios.get("http://localhost:3000/api/services");
      setServices(response.data as Service[]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getServices();
  }, []);

  return (
    <Box>
      <Stack spacing={4} padding={2}>
        <DatePicker
          value={policy.date}
          defaultValue={null}
          onChange={(value) => {
            value && setPolicy({ ...policy, date: value });
          }}
          slotProps={{ textField: { variant: "filled", size: "small" } }}
          label="Fecha del Contrato"
        />

        <FormControl variant="filled" size={"small"}>
          <InputLabel id="route_label">Servicio</InputLabel>
          <Select defaultValue="" labelId={"route_label"} displayEmpty>
            <MenuItem disabled>Servicio</MenuItem>
            {services.map((service) => (
              <MenuItem
                key={service.id}
                value={service.id}
                onClick={() => {
                  setPolicy({
                    ...policy,
                    serviceId: service.id,
                    value: parseFloat(service.price.toString()),
                    prime: parseFloat(service.prime.toString()),
                    fee: parseFloat(service.fee.toString()),
                  });
                }}
              >
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction={"row"} spacing={1}>
          <FormControl size="small" variant="filled" fullWidth>
            <InputLabel>Valor</InputLabel>
            <FilledInput
              value={policy.value}
              onChange={(e) =>
                setPolicy({ ...policy, value: parseFloat(e.target.value.toString()) })
              }
              size={"small"}
              type={"number"}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>

          <FormControl size="small" variant="filled" fullWidth>
            <InputLabel>Prima</InputLabel>
            <FilledInput
              value={policy.prime}
              onChange={(e) =>
                setPolicy({ ...policy, prime: parseFloat(e.target.value.toString()) })
              }
              size={"small"}
              type={"number"}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </Stack>

        <FormControl size="small" variant="filled" fullWidth>
          <InputLabel>Cuota</InputLabel>
          <FilledInput
            value={policy.fee}
            onChange={(e) => setPolicy({ ...policy, fee: parseFloat(e.target.value.toString()) })}
            size={"small"}
            type={"number"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
          />
        </FormControl>

        {/* <TextField
          value={policy.notes}
          onChange={(e) => setPolicy({ ...policy, notes: policy.notes })}
          variant="filled"
          label="Notas"
          size={"small"}
          multiline
          rows={3}
        /> */}
      </Stack>
    </Box>
  );
};

import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FilledInput,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { ClientContext } from "./ClientModal";
import axios from "axios";
import { Service } from "@/features/services/api/Service";
import { Policies } from "@/features/policies";

export const ClientsModalThree: React.FC = () => {
  const { client, setClient, policy, setPolicy } = React.useContext(ClientContext);
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
          onChange={(value) => {
            value && setPolicy({ ...policy, date: value });
          }}
          slotProps={{ textField: { variant: "filled", size: "small" } }}
          label="Fecha del Contrato"
        />

        <FormControl variant="filled" size={"small"}>
          <InputLabel id="route_label">Servicio</InputLabel>
          <Select labelId={"route_label"}>
            {services.map((service) => (
              <MenuItem
                key={service.id}
                value={service.id}
                onClick={(e) => {
                  setPolicy({ ...policy, serviceId: service.id, prime: service.prime });
                  // TODO: Add cost, fee to policy.
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
              size={"small"}
              type={"number"}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>

          <FormControl size="small" variant="filled" fullWidth>
            <InputLabel>Prima</InputLabel>
            <FilledInput
              size={"small"}
              type={"number"}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </Stack>

        <FormControl size="small" variant="filled" fullWidth>
          <InputLabel>Cuota</InputLabel>
          <FilledInput
            size={"small"}
            type={"number"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

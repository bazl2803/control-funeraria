import { Route } from "@/features/routes/api/Route";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { ClientContext } from "./ClientModal";

export const ClientsModalTwo: React.FC = () => {
  const { client, setClient, policy, setPolicy } = React.useContext(ClientContext);
  const [routes, setRoutes] = React.useState<Array<Route>>([]);

  React.useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/routes"); // Replace the URL with your API endpoint
        setRoutes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <Box>
      <Stack spacing={4} padding={2}>
        <Stack direction={"row"} spacing={2}>
          <TextField
            value={client.job}
            onChange={(e) => setClient({ ...client, job: e.target.value })}
            variant="filled"
            label="Profesión"
            size={"small"}
            fullWidth
          />

          <FormControl size="small" variant="filled" fullWidth>
            <InputLabel>Ingresos</InputLabel>
            <FilledInput
              value={client.incomes}
              onChange={(e) =>
                setClient({ ...client, incomes: parseFloat(e.target.value.toString()) })
              }
              size={"small"}
              type={"number"}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
            />
          </FormControl>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <FormControl variant="filled" size={"small"} fullWidth>
            <InputLabel>Método de Cobro</InputLabel>
            <Select
              value={client.method}
              onChange={(e) => setClient({ ...client, method: e.target.value })}
              defaultValue=""
            >
              <MenuItem value={client.method} disabled>
                Método de Pago
              </MenuItem>
              <MenuItem value="Ruta" onChange={() => setClient({ ...client, method: "Ruta" })}>
                Ruta
              </MenuItem>
              <MenuItem
                value="Oficina"
                onChange={() => setClient({ ...client, method: "Oficina" })}
              >
                Oficina
              </MenuItem>
              <MenuItem value="Banco" onChange={() => setClient({ ...client, method: "Banco" })}>
                Banco
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled" size={"small"} fullWidth>
            <InputLabel id="route_label">Modalidad de Pago</InputLabel>
            <Select value={policy.modality} defaultValue="" labelId={"route_label"}>
              <MenuItem value="" disabled>
                Modalidad de Pago
              </MenuItem>
              <MenuItem value="Pasivo" onClick={() => setPolicy({ ...policy, modality: "Pasivo" })}>
                Pasivo
              </MenuItem>
              <MenuItem
                value="Crédito"
                onClick={() => setPolicy({ ...policy, modality: "Crédito" })}
              >
                Crédito
              </MenuItem>
              <MenuItem
                value="Contado"
                onClick={() => setPolicy({ ...policy, modality: "Contado" })}
              >
                Contado
              </MenuItem>
              <MenuItem
                value="Reservado"
                onClick={() => setPolicy({ ...policy, modality: "Reservado" })}
              >
                Reservado
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <TextField
          value={client.address}
          onChange={(e) => setClient({ ...client, address: e.target.value })}
          variant="filled"
          label="Dirección"
          size={"small"}
          multiline
          rows={2}
        />

        <Stack direction={"row"} spacing={2}>
          <FormControl variant="filled" size={"small"} fullWidth>
            <InputLabel id="route_label">Ruta</InputLabel>
            <Select defaultValue="" labelId={"route_label"}>
              <MenuItem key={-1} disabled />
              {routes.map((route) => (
                <MenuItem
                  key={route.id}
                  value={route.id}
                  onClick={(e) => {
                    setClient({ ...client, routeId: route.id, extension_day: route.payday });
                  }}
                >
                  {route.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" variant="filled">
            <InputLabel>Dia de Cobro</InputLabel>
            <FilledInput
              value={client.extension_day}
              onChange={(e) => setClient({ ...client, extension_day: parseInt(e.target.value) })}
              size={"small"}
              type={"number"}
            />
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
};

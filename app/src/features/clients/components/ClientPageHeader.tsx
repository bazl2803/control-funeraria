import {
  Box,
  Paper,
  IconButton,
  Fab,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import React from "react";
import ClientNotes from "./ClientNotes";
import ClientPolicies from "./ClientPolicies";
import { Client } from "../api/Client";
import { useQueries } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { Route } from "@/features/routes/api/Route";
import { useNavigate } from "react-router-dom";
import { ClientModal } from "./ClientDialog/ClientModal";

interface Props {
  client?: Client;
  filters?: (filterObj: {
    route: String;
    status: String;
    modality: String;
  }) => void;
}

export const ClientPageHeader = (props: Props) => {
  //Dialog State
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const [routes] = useQueries({
    queries: [
      {
        queryKey: ["Route"],
        queryFn: () => api.get("/routes").then((res) => res.data as Route[]),
      },
    ],
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "repeat(2, auto)",
        gridTemplateColumns: "auto auto 1fr",
        alignItems: "center",
        paddingX: 3,
        pt: 2,
        gap: 2,
      }}
      component={Paper}
      elevation={2}
      zIndex={1}
    >
      {/* Back Button */}
      <span>
        <IconButton>
          <IconArrowLeft />
        </IconButton>
      </span>

      {/* Action Button */}
      <Fab
        sx={{ gridColumn: 1, gridRow: 2, position: "relative", top: "50%" }}
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate("/clients/new");
        }}
      >
        <IconPlus />
      </Fab>

      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={600}
        gridColumn={2}
        gridRow={2}
        mb={4}
      >
        Clientes
      </Typography>

      {/* Toolbar */}
      <Stack
        direction={"row"}
        spacing={1}
        gridColumn={3}
        justifyContent={"end"}
        mt={0}
      >
        <ClientPolicies policies={props.client?.policy} />
        <ClientNotes notes={props.client?.notes} />
      </Stack>

      {/* Filters */}
      <Stack
        direction={"row"}
        justifyContent={"end"}
        gridRow={2}
        gridColumn={3}
        spacing={2}
      >
        <FormControl sx={{ width: 200 }} variant="filled">
          <InputLabel id="routes-label">Ruta</InputLabel>
          <Select
            labelId="routes-label"
            id="routes"
            variant="filled"
            size="small"
            defaultValue={""}
          >
            <MenuItem />
            {routes.data?.map((route) => (
              <MenuItem key={route.id} value={route.id}>
                {route.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 200 }} variant="filled">
          <InputLabel id="status-label">Estado</InputLabel>
          <Select
            labelId="status-label"
            id="routes"
            variant="filled"
            size="small"
            displayEmpty
            margin="dense"
            defaultValue={""}
          >
            <MenuItem />
            <MenuItem value="Activo">En Pago</MenuItem>
            <MenuItem value="Cancelado">Cancelados</MenuItem>
            <MenuItem value="Retirado">Retirados</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

import {
  Box,
  Button,
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PolicyDialog } from "@/features/policies";
import React, { useState } from "react";
import { IconCheck, IconCirclePlus } from "@tabler/icons-react";
import { Client } from "@/features/clients/api/Client";
function PolicyListItem() {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItemButton>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Stack>
          <ListItemText primary="Nº 000001" secondary="Fecha de Contrato: 26/12/2009" />
          <LinearProgress variant="determinate" title="Saldo" value={88} />
        </Stack>

        <Button onClick={() => setExpanded(!expanded)} startIcon={<IconCheck />} color="success">
          Entregado
        </Button>
        {/*Funerals List*/}
        <Collapse in={expanded}>
          <Paper sx={{ padding: "1rem", mb: 1 }}>
            <Stack spacing={0}>
              <ListItemText primary="Entregado: 24/05/2014" />
              <Typography variant="body2">Fallecido: </Typography>
              <Typography variant="body2" color={"GrayText"}>
                María del Carmen Torres
              </Typography>

              <Typography variant="body1" fontWeight={600} mt={1}>
                Traslado
              </Typography>
              <Typography variant="body2">Desde: </Typography>
              <Typography variant="body2" color={"GrayText"}>
                Hospital ISSS Sonsonate
              </Typography>

              <Typography variant="body2">Hasta: </Typography>
              <Typography variant="body2" color={"GrayText"}>
                Parque Jardín "La Generosa"
              </Typography>

              <Typography variant="body1" fontWeight={600} mt={1}>
                Servicio
              </Typography>
              <Typography variant="body2">Tipo: </Typography>
              <Typography variant="body2" color={"GrayText"}>
                Católico
              </Typography>
            </Stack>
          </Paper>
        </Collapse>
      </Stack>
    </ListItemButton>
  );
}

export const ClientPolicies = () => {
  let clientId = 1;
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const listItemId = React.useId;

  return (
    <Paper sx={{ padding: "1rem", width: "25rem", backgroundColor: "Background" }} elevation={2}>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={(_e, newValue) => setSelectedTab(newValue)}
      >
        <Tab label="Detalle" />
        <Tab label="Polizas" />
      </Tabs>

      <Stack spacing={4}>
        <List>
          <PolicyListItem />
        </List>
      </Stack>
    </Paper>
  );
};

import {
  Box,
  Button,
  Collapse,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IconCheck, IconPrinter } from "@tabler/icons-react";
import { PaymentsDialog } from "@/features/payments/components/PaymentsDialog";

function PolicyListItem(props: React.HTMLAttributes<HTMLDivElement>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItemButton onClick={(e) => props.onClick && props.onClick(e)}>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Stack>
          <ListItemText primary="Nº 000001" secondary="Fecha de Contrato: 26/12/2009" />
          <Typography variant="body2">Servicio:</Typography>
          <Typography variant="body2" color={"GrayText"}>
            Estándar Sencillo
          </Typography>
          <Typography variant="body2">Modalidad:</Typography>
          <Typography variant="body2" color={"GrayText"}>
            Pasivo
          </Typography>
          <LinearProgress
            sx={{ mt: 1 }}
            variant="determinate"
            title="Estado de Cuenta"
            value={50}
          />
          <Stack direction="row" justifyContent="space-between" my={0.5}>
            <Tooltip title="Saldo" placement="top" followCursor>
              <Typography variant="caption">$200.00</Typography>
            </Tooltip>
            <Tooltip title="Cuota" placement="top" followCursor>
              <Typography variant="caption">$5.00/mes</Typography>
            </Tooltip>
            <Tooltip title="Valor" placement="top" followCursor>
              <Typography variant="caption">$400.00</Typography>
            </Tooltip>
          </Stack>
        </Stack>

        <Button
          sx={{ backgroundColor: "rgba(30,144,255,0.15)" }}
          startIcon={<IconPrinter />}
          color="info"
          disabled
        >
          Cancelación
        </Button>
        <Button
          sx={{ backgroundColor: "rgba(75,181,67,0.15)" }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          startIcon={<IconCheck />}
          color="success"
        >
          Entregado
        </Button>
        
        {/*Funerals List*/}
        <Collapse in={expanded}>
          <Paper sx={{ padding: "1rem", mb: 1 }}>
            <Stack spacing={0}>
              <Typography variant="body2">Fecha: </Typography>
              <Typography variant="body2" color={"GrayText"}>
                24/04/2020
              </Typography>

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
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

  return (
    <Paper
      sx={{ padding: "1rem", width: "20rem", backgroundColor: "Background", overflow: "hidden" }}
      elevation={2}
    >
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Tabs
          variant="fullWidth"
          value={selectedTab}
          onChange={(_e, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="Detalle" value={0} />
          <Tab label="Polizas" value={1} />
        </Tabs>

        <PaymentsDialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
        <Stack spacing={4}>
          {selectedTab === 1 && <List>{<PolicyListItem onClick={() => setOpen(true)} />}</List>}
        </Stack>
      </Box>
    </Paper>
  );
};

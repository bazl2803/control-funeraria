import { PaymentsDialog } from "@/features/payments/components/PaymentsDialog";
import { Policy } from "@/features/policies/api/Policy";
import {
  ListItemButton,
  Stack,
  ListItemText,
  Typography,
  LinearProgress,
  Tooltip,
  Button,
  Collapse,
  Paper,
} from "@mui/material";
import { IconPrinter, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function PolicyListItem(props: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItemButton onClick={(e) => props.onClick && props.onClick(e)}>
      <PaymentsDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        policyId={0}
      />
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

        <Button sx={{ backgroundColor: "rgba(0,0,0,0.15)" }} onClick={() => setOpen(true)}>
          Mostrar Pagos
        </Button>

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

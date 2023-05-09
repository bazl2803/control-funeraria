import { PaymentsDialog } from "@/features/payments/components/PaymentsDialog";
import { Policy } from "@/features/policies/api/Policy";
import {
  ListItem,
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
import axios from "axios";
import days from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  policyId: number;
}

export function PolicyListItem(props: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // fetch Policy
  async function getPolicy(): Promise<Policy> {
    const response = await axios.get(`http://localhost:3000/api/policies/${props.policyId}`);
    return response.data;
  }

  // react query
  const { isLoading, error, data } = useQuery<Policy, Error>({
    queryKey: ["Policy"],
    queryFn: getPolicy,
  });

  return (
    <ListItem>
      {isLoading && "Loading..."}
      {error && "Failed connection"}
      {data && (
        <>
          <PaymentsDialog open={open} onClose={() => setOpen(false)} policy_id={props.policyId} />

          <Stack sx={{ width: "100%" }} spacing={1}>
            <Stack>
              <ListItemText primary={`Nº ${data?.id.toString().padStart(8, "0")}`} />

              <Typography variant="body2">Fecha de Contrato:</Typography>
              <Typography variant="body2" color={"GrayText"} mb={1}>
                {days(data?.date).locale("es").format("LL")}
              </Typography>

              <Typography variant="body2">Servicio:</Typography>
              <Typography variant="body2" color={"GrayText"} mb={1}>
                {data.service.name}
              </Typography>

              <Typography variant="body2">Modalidad:</Typography>
              <Typography variant="body2" color={"GrayText"} mb={1}>
                {data?.modality}
              </Typography>

              <LinearProgress
                sx={{ mt: 1 }}
                variant="determinate"
                title="Estado de Cuenta"
                value={50}
              />

              <Stack direction="row" justifyContent="space-between" my={0.5}>
                <Tooltip title="Saldo" placement="top" followCursor>
                  <Typography variant="caption">${data?.balance.toFixed(2)}</Typography>
                </Tooltip>

                <Tooltip title="Cuota" placement="top" followCursor>
                  <Typography variant="caption">${data?.fee.toFixed(2)}/mes</Typography>
                </Tooltip>

                <Tooltip title="Valor" placement="top" followCursor>
                  <Typography variant="caption">${data?.value.toFixed(2)}</Typography>
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

            {data.funeral ? (
              <>
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
              </>
            ) : (
              <Button color="success">Entregar Servicio</Button>
            )}
          </Stack>
        </>
      )}
    </ListItem>
  );
}

import {
  Stack,
  Typography,
  LinearProgress,
  Tooltip,
  Button,
  Collapse,
  Paper,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { PaymentsDialog } from "@/features/payments/components/PaymentsDialog";
import { Policy } from "@/features/policies/api/Policy";
import { IconPrinter, IconCheck } from "@tabler/icons-react";
import days from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  policyId: number;
}

export function PolicyListItem({ policyId }: Props) {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<Policy | null>(null);

  function fetchPolicy() {
    axios
      .get(`http://localhost:3000/api/policies/${policyId}`)
      .then((res) => setData(res.data as Policy));
  }

  useEffect(() => {
    fetchPolicy();
  }, []);

  // Calculate the progress bar value.
  function progressValue(value: number, balance: number) {
    return ((value - balance) * 100) / value;
  }

  // Calculate Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formatedDate = `${day}/${month}/${year}`;

    return formatedDate;
  };

  return (
    <>
      {data && (
        <>
          {policyId && (
            <PaymentsDialog
              open={open}
              onClose={() => {
                fetchPolicy();
                setOpen(false);
              }}
              policy_id={policyId}
            />
          )}

          <ListItemButton onClick={() => setOpenDetails(!openDetails)}>
            <Stack sx={{ width: "100%" }} spacing={1} py={1}>
              <ListItemText
                primary={`#${policyId.toString().padStart(8, "0")}`}
                color={"CaptionText"}
              />

              <Stack>
                {data.balance > 0 ? (
                  <>
                    <LinearProgress
                      variant="determinate"
                      title="Estado de Cuenta"
                      value={progressValue(data.value, data.balance)}
                    />

                    <Stack direction="row" justifyContent="space-between" my={0.5}>
                      <Tooltip title="Saldo" placement="top" followCursor>
                        <Typography variant="caption">${data.balance.toFixed(2)}</Typography>
                      </Tooltip>

                      <Tooltip title="Cuota" placement="top" followCursor>
                        <Typography variant="caption">${data.fee.toFixed(2)}/mes</Typography>
                      </Tooltip>

                      <Tooltip title="Valor" placement="top" followCursor>
                        <Typography variant="caption">${data.value.toFixed(2)}</Typography>
                      </Tooltip>
                    </Stack>
                  </>
                ) : (
                  <Button sx={{ backgroundColor: "rgba(0,0,0,0.15)" }} startIcon={<IconPrinter />}>
                    Cancelación
                  </Button>
                )}
              </Stack>

              <Collapse in={openDetails}>
                <Stack spacing={1}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Fecha:</td>
                        <td>
                          <Typography color={"GrayText"} ml={2}>
                            {data.date && formatDate(data.date.toString())}
                          </Typography>
                        </td>
                      </tr>
                      {data.service?.name && (
                        <tr>
                          <td>Servicio:</td>
                          <td>
                            <Typography color={"GrayText"} ml={2}>
                              {data.service?.name}
                            </Typography>
                          </td>
                        </tr>
                      )}
                      {data.modality && (
                        <tr>
                          <td>Modalidad:</td>
                          <td>
                            <Typography color={"GrayText"} ml={2}>
                              {data.modality}
                            </Typography>
                          </td>
                        </tr>
                      )}
                      {data.notes && (
                        <tr>
                          <td>Notas:</td>
                          <td>
                            <Typography color={"GrayText"} ml={2}>
                              {data.notes}
                            </Typography>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Buttons */}
                  <Button
                    sx={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                    onClick={() => setOpen(true)}
                  >
                    Mostrar Pagos
                  </Button>

                  {data.funeral ? (
                    <>
                      <Button
                        sx={{ backgroundColor: "rgba(0,0,0,0.15)" }}
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
                    <Button sx={{ backgroundColor: "rgba(0,0,0,0.15)" }} color="success">
                      Entregar Servicio
                    </Button>
                  )}
                </Stack>
              </Collapse>
            </Stack>
          </ListItemButton>
        </>
      )}
    </>
  );
}

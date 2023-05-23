import {
  Stack,
  Typography,
  LinearProgress,
  Tooltip,
  Button,
  ListItemButton,
  ListItemText,
  Box,
  Grid,
  IconButton,
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { PaymentsDialog } from "@/features/payments/components/PaymentsDialog";
import { Policy } from "@/features/policies/api/Policy";
import {
  IconPrinter,
  IconCheck,
  IconCoffin,
  IconCalendar,
  IconPencil,
  IconClockCode,
} from "@tabler/icons-react";
import days from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { PolicyDialog } from "./PolicyDialog";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  policyId: number;
}

export function PolicyListItem({ policyId }: Props) {
  const [data, setData] = useState<Policy | null>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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

          <PolicyDialog
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
            open={false}
          />

          <ListItemButton>
            <Stack sx={{ width: "100%" }} spacing={1} py={1}>
              <Grid alignItems={"start"} container>
                <Grid item xs>
                  <Typography variant="h5" component="div">
                    {"#" + policyId.toString().padStart(8, "0")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Editar">
                    <IconButton>
                      <IconPencil size={"1rem"} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>

              {/* Progress Bar */}
              <Stack spacing={1} paddingTop={1}>
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

                {data.balance == 0 && (
                  <Button sx={{ backgroundColor: "rgba(0,0,0,0.15)" }} startIcon={<IconPrinter />}>
                    Cancelación
                  </Button>
                )}

                <Button sx={{ backgroundColor: "rgba(0,0,0,0.15)" }} onClick={() => setOpen(true)}>
                  Mostrar Pagos
                </Button>
              </Stack>

              <div>
                <Accordion
                  expanded={expanded === "details"}
                  onChange={handleChange("details")}
                  TransitionProps={{ unmountOnExit: true }}
                >
                  <AccordionSummary>Detalles</AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gridAutoRows: "auto",
                        alignItems: "center",
                        alignContent: "center",
                        columnGap: 2,
                        rowGap: 1,
                      }}
                    >
                      {data.service?.name && (
                        <>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconCoffin size={"1rem"} color={"GrayText"} />
                            <Typography fontWeight={600} color={"GrayText"}>
                              Servicio
                            </Typography>
                          </Stack>
                          <div>{data.service?.name}</div>
                        </>
                      )}

                      {data.date && (
                        <>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconCalendar size={"1rem"} color={"GrayText"} />
                            <Typography fontWeight={600} color={"GrayText"}>
                              Contrato{" "}
                            </Typography>
                          </Stack>
                          <div>{days(new Date(data.date)).format("LL")}</div>
                        </>
                      )}

                      {data.modality && (
                        <>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconClockCode size={"1rem"} color={"GrayText"} />
                            <Typography fontWeight={600} color={"GrayText"}>
                              Modalidad
                            </Typography>
                          </Stack>
                          <div>{data.modality}</div>
                        </>
                      )}

                      {data.status && (
                        <>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconCheck size={"1rem"} color={"GrayText"} />
                            <Typography fontWeight={600} color={"GrayText"}>
                              Estado
                            </Typography>
                          </Stack>

                          <div>{data.status}</div>
                        </>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                {data.funeral && (
                  <Accordion
                    expanded={expanded === "funeral"}
                    onChange={handleChange("funeral")}
                    TransitionProps={{ unmountOnExit: true }}
                  >
                    <AccordionSummary>Funeral</AccordionSummary>
                    <AccordionDetails>
                      <Stack>
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
                    </AccordionDetails>
                  </Accordion>
                )}
                {data.notes && (
                  <Accordion
                    expanded={expanded === "notes"}
                    onChange={handleChange("notes")}
                    TransitionProps={{ unmountOnExit: true }}
                  >
                    <AccordionSummary>Notas</AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItemButton>
                          <ListItemText primary={data.notes} />
                        </ListItemButton>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>
            </Stack>
          </ListItemButton>
        </>
      )}
    </>
  );
}

import { PresentationLabel } from "@/components/PresentationLabel/PresentationLabel";
import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

export const PolicyPage = () => {
  const { id } = useParams();

  return (
    <Container sx={{ py: 1 }} maxWidth="md">
      <Stack spacing={4} justifyContent={"stretch"}>
        <Typography variant="h4" fontWeight={600}>
          {`#${id?.toString().padStart(8, "0")}`}
        </Typography>

        <Grid
          container
          component={Paper}
          variant="elevation"
          bgcolor={"#fdfdfd"}
          spacing={4}
          py={2}
        >
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={600}>
                Información del Cliente
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Estado:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="Inactivo"
                          color="error"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Nombre:
                        </Typography>
                      </TableCell>
                      <TableCell>Nombre del Cliente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>DUI:</Typography>
                      </TableCell>
                      <TableCell>00000000-0</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Teléfono
                        </Typography>
                      </TableCell>
                      <TableCell>(000) 0000-0000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Dirección:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam sit.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={600}>
                Información del Servicio
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Fecha del Contrato:
                        </Typography>
                      </TableCell>
                      <TableCell>DD/MM/YYYY</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>
                          Servicio:
                        </Typography>
                      </TableCell>
                      <TableCell>Duqueza</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>Valor:</Typography>
                      </TableCell>
                      <TableCell>$600.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>Cuota</Typography>
                      </TableCell>
                      <TableCell>$7.00/mensuales</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography color={"text.secondary"}>Saldo:</Typography>
                      </TableCell>
                      <TableCell>
                        $0.00{" "}
                        <Chip
                          sx={{ ml: 1 }}
                          label="Cancelado"
                          color="success"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

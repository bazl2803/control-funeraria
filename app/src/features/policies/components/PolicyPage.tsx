import {
  Alert,
  Box,
  Card,
  CardMedia,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IconArrowLeft, IconPrinter } from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import { PolicyPageDetails } from "./PolicyPageDetails";
import example from "@/assets/shutterstock_763141177.webp";

export const PolicyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        my: 4,
        "@media print": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          bottom: "0px",
          margin: "auto",
          marginY: "0px !important",
        },
      }}
      maxWidth="md"
    >
      <Stack spacing={4} justifyContent={"stretch"} mb={1}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} justifyContent={"start"}>
            <IconButton
              title="Atrás"
              sx={{ displayPrint: "none" }}
              onClick={() => navigate("/app")}
            >
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4" fontWeight={600}>
              {`#${id?.toString().padStart(8, "0")}`}
            </Typography>
          </Stack>

          <Stack direction={"row"} displayPrint={"none"}>
            <IconButton title="Imprimir" onClick={() => window.print()}>
              <IconPrinter />
            </IconButton>
          </Stack>
        </Stack>

        <PolicyPageDetails />

        <Alert severity="warning">Servicio no entregado</Alert>

        <Box
          sx={{
            display: "grid",
            userSelect: "none",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
          component={Paper}
          variant="elevation"
          bgcolor={"#fbfbfb"}
          gap={4}
          p={2}
        >
          <Stack>
            <Typography variant="h6" fontWeight={600}>
              Detalles del Sepelio
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>Fecha:</Typography>
                  </TableCell>
                  <TableCell>DD/MMM/YYYY</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>
                      Nombre del Fallecido:
                    </Typography>
                  </TableCell>
                  <TableCell>Nombre del Fallecido</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>
                      Parentesto:
                    </Typography>
                  </TableCell>
                  <TableCell>Lorem</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>Tipo:</Typography>
                  </TableCell>
                  <TableCell>Evángelico</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>Lugar:</Typography>
                  </TableCell>
                  <TableCell>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc porttitor dolor et diam commodo metus.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={"text.secondary"}>Hora:</Typography>
                  </TableCell>
                  <TableCell>HH:MM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={600}>
              Detalle de Ataúd
            </Typography>
            <Card>
              <CardMedia component="img" image={example} alt="coffin" />
            </Card>
            <Table size="small">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography color={"text.secondary"}>Modelo:</Typography>
                  </TableCell>
                  <TableCell>Reinosa</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography color={"text.secondary"}>Color:</Typography>
                  </TableCell>
                  <TableCell>Madera</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>

          <Stack gridColumn="span 2">
            <Typography variant="h6" fontWeight={600}>
              Mobiliario
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Artículo</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Retorno</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Sillas Plásticas</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    <Checkbox value={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lámparás Niqueladas</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Checkbox value={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Floreros Niquelados</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>
                    <Checkbox value={true} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

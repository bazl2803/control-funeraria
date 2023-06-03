import {
  Box,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardMedia,
  TableHead,
  Checkbox,
} from "@mui/material";
import example from "@/assets/shutterstock_763141177.webp";
import { Funeral } from "@/features/funerals/api/Funeral";

interface Props {
  funeral: Funeral;
}

export const PolicyPageFuneral = (props: Props) => {
  return (
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
      <Stack spacing={2}>
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
                <Typography color={"text.secondary"}>Parentesto:</Typography>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                porttitor dolor et diam commodo metus.
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

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Detalle de Ataúd
        </Typography>
        <Card elevation={1}>
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

      <Stack gridColumn="span 2" spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Mobiliario
        </Typography>

        <Table sx={{ tableLayout: "auto" }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Artículo</TableCell>
              <TableCell width={100}>Cantidad</TableCell>
              <TableCell width={10}>Retorno</TableCell>
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
  );
};

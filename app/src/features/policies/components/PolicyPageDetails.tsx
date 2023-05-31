import {
  Box,
  Paper,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";

export const PolicyPageDetails = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        userSelect: "none",
      }}
      component={Paper}
      variant="elevation"
      bgcolor={"#fbfbfb"}
      gap={4}
      p={2}
    >
      <Stack spacing={1} gridColumn={1}>
        <Typography variant="h6" fontWeight={600}>
          Información del Cliente
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Estado:</Typography>
                </TableCell>
                <TableCell>
                  <Chip label="Inactivo" color="error" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Nombre:</Typography>
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
                  <Typography color={"text.secondary"}>Teléfono</Typography>
                </TableCell>
                <TableCell>(000) 0000-0000</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography color={"text.secondary"}>Dirección:</Typography>
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

      <Stack spacing={1} gridColumn={2}>
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
                  <Typography color={"text.secondary"}>Servicio:</Typography>
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
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography color={"text.secondary"}>Saldo:</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography>$0.00</Typography>
                    <Chip
                      label="Cancelado"
                      color="success"
                      variant="outlined"
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

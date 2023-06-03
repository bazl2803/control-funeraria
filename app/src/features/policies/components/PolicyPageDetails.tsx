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
import { Policy } from "../api/Policy";
import days from "dayjs";

interface Props {
  policy: Policy;
}

export const PolicyPageDetails = (props: Props) => {
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
                  <Chip
                    label={props.policy.client.status ? "Activo" : "Inactivo"}
                    color={props.policy.client.status ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Nombre:</Typography>
                </TableCell>
                <TableCell>{props.policy.client.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>DUI:</Typography>
                </TableCell>
                <TableCell>{props.policy.client.doc_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Teléfono:</Typography>
                </TableCell>
                <TableCell>{props.policy.client.phone_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Correo:</Typography>
                </TableCell>
                <TableCell>{props.policy.client.email}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography color={"text.secondary"}>Dirección:</Typography>
                </TableCell>
                <TableCell>{props.policy.client.address}</TableCell>
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
                <TableCell>
                  {days(props.policy.date as Date).format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Servicio:</Typography>
                </TableCell>
                <TableCell>{props.policy.service?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Valor:</Typography>
                </TableCell>
                <TableCell>${props.policy.value.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color={"text.secondary"}>Cuota</Typography>
                </TableCell>
                <TableCell>${props.policy.fee.toFixed(2)}/mensuales</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography color={"text.secondary"}>Saldo:</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} alignItems={"center"}>
                    ${props.policy.balance.toFixed(2)}
                    <Chip
                      sx={{ ml: 1 }}
                      label={
                        props.policy.balance === 0 ? "Cancelado" : "En pago"
                      }
                      color={props.policy.balance === 0 ? "success" : "warning"}
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

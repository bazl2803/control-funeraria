import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import { IconReportMoney } from "@tabler/icons-react";
import React from "react";

interface Props extends DialogProps {}

export const PaymentsDialog = (props: Props) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Pagos</DialogTitle>
      <DialogContent>
        <Stack>
          <Stack direction="row" spacing={2} p={2} component={Paper}>
            <TextField label="Número" variant="filled" size="small" />
            <TextField label="Fecha" variant="filled" size="small" />
            <TextField label="Monto" variant="filled" size="small" />
            <Button startIcon={<IconReportMoney />}>Procesar</Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>NÚMERO</TableCell>
                <TableCell>FECHA</TableCell>
                <TableCell>MONTO</TableCell>
                <TableCell>ESTADO</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableHead>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

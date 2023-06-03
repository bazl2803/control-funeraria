import { Payment } from "@/features/payments/api/payment";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import days from "dayjs";

interface Props {
  payments: Payment[];
}

export const PolicyPagePayments = (props: Props) => {
  return (
    <Box component={Paper} p={2} bgcolor={"#fbfbfb"}>
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Pagos
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Factura</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.payments.map((pay) => (
              <TableRow key={pay.id}>
                <TableCell>
                  {days(pay.date as Date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{pay.number.padStart(8, "0")}</TableCell>
                <TableCell>
                  {"$" + parseFloat(pay.amount.toString()).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Box>
  );
};

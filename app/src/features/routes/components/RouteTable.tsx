import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Route } from "../api/Route";

interface Props {
  clients: [];
}

export const RouteTable = ({ clients }: Props) => {
  return (
    <TableContainer sx={{ gridColumn: 2, overflow: "auto" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cuota</TableCell>
            <TableCell>Saldo</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

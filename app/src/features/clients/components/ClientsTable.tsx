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
import { Client } from "../api/Client";
import dayjs from "dayjs";

interface Props {
  clients: Client[];
  onSelectClient: (client: Client) => void;
}

export const ClientsTable = (props: Props) => {
  const handleSelectClient = React.useCallback(
    (client: Client) => {
      props.onSelectClient(client);
    },
    [props.onSelectClient]
  );

  return (
    <Paper sx={{ padding: "1rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Creado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.clients?.map((client) => (
              <TableRow key={client.id} hover onClick={() => handleSelectClient(client)}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone_number}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  {dayjs(client.created_at).locale("es").format("llll")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

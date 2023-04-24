import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Client } from "../api/Client";
import React from "react";
import { IconDotsVertical } from "@tabler/icons-react";

export const ClientsTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [clients, setClients] = useState<Client[]>();

  async function getClients() {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setClients(response.data as Client[]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Paper sx={{ padding: "1rem" }} variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client) => (
              <TableRow>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone_number}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>{client.created_at.toLocaleDateString("es-SV")}</TableCell>
                <TableCell>
                  <IconButton onClick={handleClick}>
                    <IconDotsVertical />
                  </IconButton>
                  <Menu open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Service } from "../api/Service";
import React from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Props {
  services: Service[];
}

export const ServicesTable = ({ services }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell width={"100%"}>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Prima</TableCell>
              <TableCell>Cuota</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((Service) => (
              <TableRow>
                <TableCell>{Service.id}</TableCell>
                <TableCell>{Service.name}</TableCell>
                <TableCell align="right">{"$" + Service.price}</TableCell>
                <TableCell align="right">{"$" + Service.prime}</TableCell>
                <TableCell align="right">{"$" + Service.fee}</TableCell>
                <TableCell align="right">
                  <Stack direction={"row"} spacing={2}>
                    <Tooltip title="Editar">
                      <IconButton
                        id="service-button"
                        onClick={handleClick}
                        aria-haspopup="true"
                        aria-controls={open ? "service-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                      >
                        <IconEdit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar">
                      <IconButton
                        id="service-button"
                        onClick={handleClick}
                        aria-haspopup="true"
                        aria-controls={open ? "service-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                      >
                        <IconTrash />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

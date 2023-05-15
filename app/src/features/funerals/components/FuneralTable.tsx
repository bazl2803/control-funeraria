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
import { Funeral } from "../api/Funeral";
import React from "react";
import { IconDotsVertical } from "@tabler/icons-react";

export const FuneralsTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [funerals, setFunerals] = useState<Funeral[]>();

  async function getFunerals() {
    try {
      const response = await axios.get("http://localhost:3000/api/funerals");
      setFunerals(response.data as Funeral[]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFunerals();
  }, []);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Fallecido</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cementerio</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {funerals?.map((funeral) => (
              <TableRow>
                <TableCell>{funeral.id}</TableCell>
                <TableCell></TableCell>
                <TableCell>{funeral.burial_date.toLocaleDateString("es-SV")}</TableCell>
                <TableCell>{funeral.graveyard}</TableCell>
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

import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconMapPin, IconPlus } from "@tabler/icons-react";
import { RouteModal } from "../components/RouteModal";
import { useState } from "react";

export const Routes = () => {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        padding: 2,
        gap: 4,
        height: "100vh",
      }}
    >
      <Stack
        sx={{ gridColumn: 1, height: "100%", overflow: "auto" }}
        spacing={1}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant={"h6"}>Rutas</Typography>
          <Tooltip title="Nueva Ruta">
            <IconButton onClick={() => setOpen(true)}>
              <IconPlus size={"1rem"} />
            </IconButton>
          </Tooltip>
        </Stack>

        <RouteModal open={open} onClose={handleClose} />

        <List sx={{ flexGrow: 1 }}>
          <ListItemButton>
            <ListItemIcon>
              <IconMapPin />
            </ListItemIcon>
            <ListItemText primary={"Sonsonate"} secondary={"Sonsonate"} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconMapPin />
            </ListItemIcon>
            <ListItemText primary={"Juayúa"} secondary={"Sonsonate"} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconMapPin />
            </ListItemIcon>
            <ListItemText primary={"Sonzacate"} secondary={"Sonsonate"} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconMapPin />
            </ListItemIcon>
            <ListItemText primary={"El Polvón"} secondary={"Sonsonate"} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconMapPin />
            </ListItemIcon>
            <ListItemText primary={"Playa Dorada"} secondary={"Sonsonate"} />
          </ListItemButton>
        </List>
      </Stack>
      <TableContainer
        sx={{ gridColumn: 2, overflow: "auto" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Cuota</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};

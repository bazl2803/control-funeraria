import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { IconPlus, IconMapPin } from "@tabler/icons-react";
import { ClientModal } from "./ClientModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { Client } from "../api/Client";

export const ClientsList = () => {
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState<Client[]>([]);

  async function getRoutes() {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setRoutes(response.data as Client[]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRoutes();
  }, []);

  function handleClose() {
    setOpen(false);
    getRoutes();
  }
  return (
    <Stack sx={{ gridColumn: 1, height: "100%", overflow: "auto" }} spacing={1}>
      <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
        <Typography variant={"h6"}>Clientes</Typography>

        <Tooltip title="Nueva Ruta">
          <IconButton onClick={() => setOpen(true)}>
            <IconPlus size={"1rem"} />
          </IconButton>
        </Tooltip>
      </Stack>

      <ClientModal open={open} onClose={handleClose} />

      <List sx={{ flexGrow: 1 }}>
        {routes.map((route) => {
          return (
            <ListItemButton key={route.id}>
              <ListItemIcon>
                <IconMapPin />
              </ListItemIcon>
              <ListItemText primary={""} secondary={""} />
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  );
};

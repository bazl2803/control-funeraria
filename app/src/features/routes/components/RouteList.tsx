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
import { RouteModal } from "./RouteModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { Route } from "../api/Route";

export const RouteList = () => {
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  async function getRoutes() {
    try {
      const response = await axios.get("http://localhost:3000/api/routes");
      setRoutes(response.data as Route[]);
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
        <Typography variant={"h6"}>Rutas</Typography>

        <Tooltip title="Nueva Ruta">
          <IconButton onClick={() => setOpen(true)}>
            <IconPlus size={"1rem"} />
          </IconButton>
        </Tooltip>
      </Stack>

      <RouteModal open={open} onClose={handleClose} />

      <List sx={{ flexGrow: 1 }}>
        {routes.map((route) => {
          return (
            <ListItemButton key={route.id}>
              <ListItemIcon>
                <IconMapPin />
              </ListItemIcon>
              <ListItemText primary={route.name} secondary={route.location} />
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  );
};

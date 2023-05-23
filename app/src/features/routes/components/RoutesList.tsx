import {
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DrawerProps,
  CircularProgress,
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
} from "@mui/material";
import { IconMapPinCog, IconPencil, IconPlus } from "@tabler/icons-react";
import { RouteModal } from "./RouteModal";
import { Route } from "../api/Route";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { useState } from "react";
import { RouteTable } from "./RouteTable";

export const RoutesList: React.FC<DrawerProps> = (props) => {
  /**
   * State
   */
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  /**
   * React Query
   */
  const { data, error, isLoading, refetch } = useQuery<Route[], Error>(["routes"], async () => {
    const res = await api.get("/routes");
    return res.data;
  });

  /**
   * handleClose
   */
  function handleClose() {
    setOpen(false);
    setOpenEdit(false);
    refetch();
  }

  return (
    <Drawer anchor="right" {...props}>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(2, auto) 1fr",
          width: "24rem",
          height: "100vh",
          overflowY: "hidden",
          paddingY: 4,
          paddingX: 3,
          gap: 2,
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5" fontWeight="600">
            Rutas
          </Typography>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Editar Rutas">
              <IconButton onClick={() => setOpenEdit(true)}>
                <IconMapPinCog size={"1rem"} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Nueva Ruta">
              <IconButton onClick={() => setOpen(true)}>
                <IconPlus size={"1rem"} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <RouteModal open={open} onClose={handleClose} />
        <RouteTable open={openEdit} onClose={handleClose} />

        {isLoading && <CircularProgress />}
        {error && <Typography color="red">Error</Typography>}
        {data && (
          <>
            <FormControl sx={{ gridRow: 2 }} variant="filled" size={"small"} fullWidth>
              <InputLabel id="route_label">Ruta</InputLabel>
              <Select defaultValue="" labelId={"route_label"}>
                <MenuItem key={-1} disabled />
                {data.map((route) => (
                  <MenuItem key={route.id} value={route.id} onClick={() => setSelectedRoute(route)}>
                    {route.name}, {route.location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <List sx={{ overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
              {selectedRoute?.client?.map((client, index) => (
                <ListItemButton key={client.id}>
                  <ListItemIcon>
                    <Avatar>{index + 1}</Avatar>
                  </ListItemIcon>
                  <ListItemText primary={client.name} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

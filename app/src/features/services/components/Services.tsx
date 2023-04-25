import { useEffect, useState } from "react";
import { AppBar, Box, Button, IconButton, InputBase, Paper, Stack, Toolbar } from "@mui/material";
import { ServicesTable } from "./ServicesTable";
import { ServiceDialog } from "./ServiceDialog";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { Service } from "../api/Service";

export const Services = () => {
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState<Service[]>([]);

  async function getServices() {
    try {
      const response = await axios.get("http://localhost:3000/api/service");
      setServices(response.data as Service[]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        padding: 2,
        height: "100vh",
        gap: 2,
      }}
    >
      <Stack
        sx={{ flexGrow: 1, paddingY: "0.5rem" }}
        direction={"row"}
        spacing={4}
        justifyContent={"space-between"}
      >
        <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar" size="small" />
          <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
            <IconSearch size={"1.2rem"} />
          </IconButton>
        </Paper>
        <Button onClick={() => setOpen(true)} variant="contained">
          Nuevo
        </Button>
      </Stack>

      <ServiceDialog open={open} onClose={() => setOpen(false)} />
      <ServicesTable services={services} />
    </Box>
  );
};

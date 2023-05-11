import { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { ClientModal } from "./ClientModal";
import { IconChevronRight } from "@tabler/icons-react";
import { PoliciesList } from "@/features/clients/components/PoliciesList";
import { Client } from "@/features/clients/api/Client";
import axios from "axios";

export const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  async function getClients() {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setClients(response.data as Client[]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClients();
  }, [open]);

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        gap: 2,
        overflowY: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <AppBar
        sx={{
          "@media(prefers-color-scheme: light)": {
            backgroundColor: "white",
          },
        }}
        position={"sticky"}
      >
        <Stack
          sx={{ flexGrow: 1, paddingX: "1.2rem", paddingY: "0.5rem" }}
          direction={"row"}
          spacing={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Breadcrumbs separator={<IconChevronRight size={"1rem"} />}>
            <Link underline="hover" color="inherit" href={"/app"}>
              <Typography sx={{ textDecoration: "none" }}>Home</Typography>
            </Link>
            <Typography color="text.primary">Clientes</Typography>
          </Breadcrumbs>
          <TextField sx={{ width: "25rem" }} variant="filled" size="small" label="Buscar" />
          <Button onClick={() => setOpen(true)} variant="contained">
            Nuevo
          </Button>
        </Stack>
      </AppBar>

      <ClientModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <Container maxWidth="xl">
        <ClientsTable onSelectClient={handleSelectClient} clients={clients} />
        {selectedClient?.policy && (
          <PoliciesList
            open={selectedClient ? true : false}
            clientId={selectedClient.id ?? 0}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </Container>
    </Box>
  );
};

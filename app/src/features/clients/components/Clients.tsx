import { useCallback, useState } from "react";
import { Box, Container, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { PoliciesList } from "@/features/policies/components/PoliciesList";
import { Client } from "@/features/clients/api/Client";
import { IconAddressBook, IconEye, IconMap2, IconNotes, IconReceipt2 } from "@tabler/icons-react";
import { RoutesList } from "@/features/routes/components/RoutesList";

export const Clients = () => {
  const [policyDrawerOpen, setPolicyDrawerOpen] = useState(false);
  const [routesDrawerOpen, setRoutesDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        overflowY: "auto",
      }}
    >
      {/* Clients Table */}
      <ClientsTable onSelectClient={handleSelectClient} />

      {/* Policy Drawer */}
      {selectedClient?.policy && (
        <PoliciesList
          open={policyDrawerOpen}
          clientId={selectedClient.id ?? 0}
          onClose={() => {
            setPolicyDrawerOpen(false);
            setSelectedClient(null);
          }}
        />
      )}

      {/* Routes Drawer */}
      {selectedClient && (
        <RoutesList
          open={routesDrawerOpen}
          onClose={() => {
            setRoutesDrawerOpen(false);
            setSelectedClient(null);
          }}
        />
      )}

      {/* Sidebar */}
      <Box sx={{ gridColumn: 2, overflowY: "hidden" }}>
        <Paper sx={{ zIndex: 1101, height: "100vh" }} elevation={3}>
          <Stack spacing={2} padding={2} alignItems={"center"}>
            <Tooltip title={"Vista Detallada"} placement={"right"}>
              <IconButton disabled={selectedClient == null}>
                <IconEye />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Polizas"} placement={"right"}>
              <IconButton
                disabled={selectedClient == null}
                onClick={() => {
                  setPolicyDrawerOpen(true);
                }}
              >
                <IconReceipt2 />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Rutas"} placement={"right"}>
              <IconButton
                disabled={selectedClient == null}
                onClick={() => {
                  setRoutesDrawerOpen(true);
                }}
              >
                <IconMap2 />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Direcciones"} placement={"right"}>
              <IconButton>
                <IconAddressBook />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Notas"} placement={"right"}>
              <IconButton>
                <IconNotes />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

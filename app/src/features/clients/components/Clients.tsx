import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { Client } from "@/features/clients/api/Client";
import { ClientPageHeader } from "./ClientPageHeader";

export const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto  1fr",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <ClientPageHeader client={selectedClient} />

      {/* Clients Table */}
      <ClientsTable onSelectClient={handleSelectClient} />
    </Box>
  );
};

import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { Client } from "@/features/clients/api/Client";
import { ClientPageHeader } from "./ClientPageHeader";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { ClientModal } from "./ClientDialog/ClientModal";

export const ClientsPage = () => {
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  const { data } = useQuery<Client[], Error>(["Clients"], () =>
    api.get("/clients").then((res) => res.data)
  );

  function handleFilters(filters: {
    route: String;
    status: String; // Cancelados, En Pago, Retirados
    modality: String;
  }) {
    let clients = data;

    // filter paid clients
    if (filters.modality === "Cancelado") {
      clients?.filter((client) =>
        client.policy?.some((pol) => pol.balance === 0)
      );
    }
  }

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
      {data && (
        <>
          
          <ClientPageHeader client={selectedClient} filters={handleFilters} />
          <ClientsTable onSelectClient={handleSelectClient} clients={data} />
        </>
      )}
    </Box>
  );
};

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { PoliciesList } from "@/features/policies/components/PoliciesList";
import { Client } from "@/features/clients/api/Client";
import {
  IconAddressBook,
  IconArrowLeft,
  IconEye,
  IconMap2,
  IconNotes,
  IconReceipt2,
  IconSquareArrowLeft,
} from "@tabler/icons-react";
import { RoutesList } from "@/features/routes/components/RoutesList";
import ClientPolicies from "./ClientPolicies";
import ClientNotes from "./ClientNotes";

export const Clients = () => {
  const [policyDrawerOpen, setPolicyDrawerOpen] = useState(false);
  const [routesDrawerOpen, setRoutesDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto  1fr",
        gridTemplateColumns: "1fr auto",
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Stack
        sx={{ zIndex: 1 }}
        gridColumn={"span 2"}
        component={Paper}
        elevation={2}
        spacing={1}
        py={2}
        px={3}
      >
        <Stack
          justifyContent={"end"}
          alignItems={"center"}
          direction={"row"}
          spacing={1}
        >
          <Stack direction={"row"} spacing={2} flex={1}>
            <IconButton>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4" fontWeight={600}>
              Clientes
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <ClientPolicies policies={selectedClient?.policy} />
            <ClientNotes policies={selectedClient?.policy} />
          </Stack>
        </Stack>
      </Stack>

      {/* Clients Table */}
      <ClientsTable onSelectClient={handleSelectClient} />

      {/* Policy Drawer */}
      {selectedClient?.policy && (
        <PoliciesList
          clientId={selectedClient.id ?? 0}
          open={policyDrawerOpen}
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
    </Box>
  );
};

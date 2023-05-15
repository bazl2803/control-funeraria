import {
  Button,
  CircularProgress,
  Drawer,
  DrawerProps,
  Icon,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { PolicyListItem } from "./PolicyListItem";
import { Policy } from "@/features/policies/api/Policy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconExclamationCircle, IconPlus } from "@tabler/icons-react";

interface Props extends DrawerProps {
  clientId: number;
}

export const PoliciesList = ({ clientId, ...props }: Props) => {
  const { isLoading, data, error } = useQuery<Policy[], Error>(["client_policies"], () =>
    axios.get("http://localhost:3000/api/policies").then((res) => {
      return (res.data as Policy[]).filter((p) => p.clientId == clientId);
    })
  );

  return (
    <Drawer anchor="right" {...props}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={4}
        mt={3}
        mb={2}
      >
        <Typography variant="h5" fontWeight="600">
          Polizas
        </Typography>
        <Tooltip title="Nueva Poliza">
          <IconButton>
            <IconPlus />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack height={"100%"} width={350}>
        {isLoading && <CircularProgress />}

        {error && (
          <Stack sx={{ bgcolor: "#ff6961" }} direction="row" alignItems="center" p={2} spacing={2}>
            <IconExclamationCircle size="1.5rem" />
            <Typography>Fallo al Conectar</Typography>
          </Stack>
        )}

        {data && (
          <List sx={{ mx: 2 }}>
            {data.map((policy) => (
              <PolicyListItem key={policy.id} policyId={policy.id} />
            ))}
          </List>
        )}
      </Stack>
    </Drawer>
  );
};

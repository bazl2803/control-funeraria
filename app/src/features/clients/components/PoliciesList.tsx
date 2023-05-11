import {
  CircularProgress,
  Drawer,
  DrawerProps,
  List,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { PolicyListItem } from "./PolicyListItem";
import { Policy } from "@/features/policies/api/Policy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconExclamationCircle } from "@tabler/icons-react";

interface Props extends DrawerProps {
  clientId: number;
}

export const PoliciesList = ({ clientId, ...props }: Props) => {
  const { isLoading, data, error } = useQuery<Policy[], Error>(["client_policies"], () =>
    axios.get("http://localhost:3000/api/policies").then((res) => {
      console.log(res.data);
      return (res.data as Policy[]).filter((p) => p.clientId == clientId);
    })
  );

  return (
    <Drawer variant="temporary" anchor="right" {...props}>
      <Typography p={2}>Polizas</Typography>
      <Stack height={"100%"} width={350}>
        {isLoading && <CircularProgress />}

        {error && (
          <Stack sx={{ bgcolor: "#ff6961" }} direction="row" alignItems="center" p={2} spacing={2}>
            <IconExclamationCircle size="1.5rem" />
            <Typography>Fallo al Conectar</Typography>
          </Stack>
        )}

        {data && (
          <List>
            {data.map((policy) => (
              <PolicyListItem key={policy.id} policyId={policy.id} />
            ))}
          </List>
        )}
      </Stack>
    </Drawer>
  );
};

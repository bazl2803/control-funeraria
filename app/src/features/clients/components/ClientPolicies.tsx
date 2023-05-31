import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import { IconLicense, IconTextPlus } from "@tabler/icons-react";
import { Policy } from "@/features/policies/api/Policy";
import { useNavigate } from "react-router-dom";

interface Props {
  policies?: Policy[];
}

function progressValue(value: number, balance: number) {
  return ((value - balance) * 100) / value;
}

export default function ClientPolicies(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="Contratos">
        <span>
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            disabled={props.policies ? false : true}
          >
            <IconLicense />
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack>
          <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
            Contratos
          </Typography>
          <List>
            {props.policies?.map((policy) => (
              <ListItemButton
                key={policy.id}
                onClick={() => navigate(`/policy/${policy.id}`)}
              >
                <Stack spacing={1} pb={1}>
                  <ListItemText
                    primary={"#" + policy.id?.toString().padStart(8, "0")}
                    secondary={policy.service?.name}
                  />
                  <Stack direction={"row"} spacing={3}>
                    <Typography variant="body2">
                      Saldo: ${policy.balance}
                    </Typography>
                    <Typography variant="body2">
                      Cuota: ${policy.fee}/mes
                    </Typography>
                    <Typography variant="body2">
                      Valor: ${policy.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={progressValue(policy.value, policy.balance)}
                  />
                </Stack>
              </ListItemButton>
            ))}
          </List>
          <Button sx={{ mx: 1, mb: 1 }} startIcon={<IconTextPlus />}>
            Nuevo Contrato
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}

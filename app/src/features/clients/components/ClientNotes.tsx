import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Badge, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { IconMessage, IconMessagePlus } from "@tabler/icons-react";
import { Note } from "@/features/notes/api/Note";

interface Props {
  notes?: Note[];
}

export default function ClientNotes(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
      <Tooltip title="Notas">
        <Badge badgeContent={props.notes?.length} color="primary">
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            disabled={props.notes ? false : true}
          >
            <IconMessage />
          </IconButton>
        </Badge>
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
        <Stack spacing={1} px={2} py={1} width="20rem">
          <Typography variant="h6" sx={{ pt: 2 }}>
            Notas
          </Typography>
          <Stack spacing={1}>
            {props.notes?.map((note) => (
              <Paper sx={{ bgcolor: "lightyellow" }}>{note.text}</Paper>
            ))}
          </Stack>
          <Button sx={{ mx: 1, mb: 1 }} startIcon={<IconMessagePlus />}>
            Agregar Nota
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}

import { Box, Paper, IconButton, Fab, Typography, Stack } from "@mui/material";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import React from "react";
import ClientNotes from "./ClientNotes";
import ClientPolicies from "./ClientPolicies";
import { Client } from "../api/Client";
import { ClientModal } from "./ClientDialog/ClientModal";

interface Props {
  client?: Client;
}

export const ClientPageHeader = (props: Props) => {
  //Dialog State
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "repeat(2, auto)",
        gridTemplateColumns: "auto auto 1fr",
        alignItems: "center",
        paddingX: 3,
        pt: 2,
        gap: 2,
      }}
      component={Paper}
      elevation={2}
      zIndex={1}
    >
      {/* Back Button */}
      <span>
        <IconButton>
          <IconArrowLeft />
        </IconButton>
      </span>

      {/* Action Button */}
      <Fab
        sx={{ gridColumn: 1, gridRow: 2, position: "relative", top: "50%" }}
        color="primary"
        aria-label="add"
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconPlus />
      </Fab>

      <ClientModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={600}
        gridColumn={3}
        gridRow={2}
        mb={4}
      >
        Clientes
      </Typography>

      {/* Toolbar */}
      <Stack
        direction={"row"}
        spacing={1}
        gridColumn={4}
        justifyContent={"end"}
        mt={0}
      >
        <ClientPolicies policies={props.client?.policy} />
        <ClientNotes policies={props.client?.policy} />
      </Stack>
    </Box>
  );
};

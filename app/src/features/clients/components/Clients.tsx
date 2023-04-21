import React from "react";
import { ClientsList } from "./ClientsList";
import { Box } from "@mui/material";

export const Clients = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        padding: 2,
        gap: 4,
        height: "100vh",
      }}
    >
      <ClientsList />
    </Box>
  );
};

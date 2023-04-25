import { useState } from "react";
import { AppBar, Box, Button, IconButton, InputBase, Paper, Stack, Toolbar } from "@mui/material";
import { ClientsTable } from "./ClientsTable";
import { ClientModal } from "./ClientModal";
import { IconSearch } from "@tabler/icons-react";

export const Clients = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        padding: 2,
        height: "100vh",
        gap: 2,
      }}
    >
      <Stack
        sx={{ flexGrow: 1, paddingY: "0.5rem" }}
        direction={"row"}
        spacing={4}
        justifyContent={"space-between"}
      >
        <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar" size="small" />
          <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
            <IconSearch size={"1.2rem"} />
          </IconButton>
        </Paper>
        <Button onClick={() => setOpen(true)} variant="contained">
          Nuevo
        </Button>
      </Stack>

      <ClientModal open={open} onClose={() => setOpen(false)} />
      <ClientsTable />
    </Box>
  );
};

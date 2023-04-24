import { useState } from "react";
import { Box, Button, IconButton, InputBase, Paper, Stack } from "@mui/material";
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
        gap: 4,
        height: "100vh",
      }}
    >
      <Stack direction={"row"} spacing={4} justifyContent={"space-between"}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Nuevo
        </Button>

        <Paper
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
          variant="outlined"
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar" size="small" />
          <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
            <IconSearch size={"1.2rem"} />
          </IconButton>
        </Paper>
      </Stack>
      <ClientModal open={open} onClose={() => setOpen(false)} />
      <ClientsTable />
    </Box>
  );
};

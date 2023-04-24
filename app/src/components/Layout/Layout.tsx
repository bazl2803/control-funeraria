import React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { IconCoffin, IconDashboard, IconKey, IconMap2, IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        height: "100%",
      }}
    >
      <Stack spacing={2} padding={2} alignItems={"center"}>
        <img style={{ objectFit: "scale-down" }} src="/logo.png" alt="logo" width={"32px"} />
        <Tooltip title={"Tablero"} placement={"right"}>
          <IconButton onClick={() => navigate("/app")}>
            <IconDashboard />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Clientes"} placement={"right"}>
          <IconButton onClick={() => navigate("/clients")}>
            <IconUsers />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Rutas"} placement={"right"}>
          <IconButton onClick={() => navigate("/routes")}>
            <IconMap2 />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Servicios"} placement={"right"}>
          <IconButton onClick={() => navigate("/servicies")}>
            <IconCoffin />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Credenciales"} placement={"right"}>
          <IconButton onClick={() => navigate("/credentials")}>
            <IconKey />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{ gridColumn: 2 }}>{props.children}</Box>
    </Box>
  );
};

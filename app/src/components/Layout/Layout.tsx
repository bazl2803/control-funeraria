import React from "react";
import { Box, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import {
  IconCoffin,
  IconDashboard,
  IconKey,
  IconMap2,
  IconReceipt2,
  IconTableAlias,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        "@media(prefers-color-sheme: light)": {
          backgroundColor: "#fafafa",
        },
      }}
    >
      <Box sx={{ gridColumn: 1, overflowY: "auto" }}>{props.children}</Box>
    </Box>
  );
};

import React from "react";
import { Box, List, Paper, Stack, Tab, Tabs } from "@mui/material";
import { PolicyListItem } from "./PolicyListItem";
import { Policy } from "@/features/policies/api/Policy";

interface Props {
  policies: [];
}

export const PoliciesList = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  return (
    <Paper
      sx={{ padding: "1rem", width: "20rem", backgroundColor: "Background", overflow: "hidden" }}
      elevation={2}
    >
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack spacing={4}>
          <List>{<PolicyListItem policy={{} as Policy} />}</List>
        </Stack>
      </Box>
    </Paper>
  );
};

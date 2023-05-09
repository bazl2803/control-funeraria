import { Box, List, Paper, Stack } from "@mui/material";
import { PolicyListItem } from "./PolicyListItem";
import { Policy } from "@/features/policies/api/Policy";

interface Props {
  policies: Policy[];
}

export const PoliciesList = (props: Props) => {
  return (
    <Paper
      sx={{ padding: "1rem", width: "24em", backgroundColor: "Background", overflow: "hidden" }}
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
          <List>
            {props.policies.map((policy) => (
              <PolicyListItem key={policy.id} policyId={policy.id} />
            ))}
          </List>
        </Stack>
      </Box>
    </Paper>
  );
};

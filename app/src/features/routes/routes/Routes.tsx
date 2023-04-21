import { Box } from "@mui/material";
import { RouteTable } from "../components/RouteTable";
import { RouteList } from "../components/RouteList";

export const Routes = () => {
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
      <RouteList />
      <RouteTable clients={[]} />
    </Box>
  );
};
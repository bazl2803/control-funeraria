import {
  Alert,
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Route } from "../api/Route";
import { IconTrash } from "@tabler/icons-react";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface Props extends DialogProps {
  onClose?: () => void;
}

export const RouteTable = (props: Props) => {
  /**
   * Fetch Routes
   */
  const { data, error, isLoading, refetch } = useQuery<Route[], Error>(["routes"]);

  const mutation = useMutation({
    mutationFn: async (route: Route) => {
      const { id, ...updateFields } = route;
      delete updateFields.client;
      return await api.put(`routes/${id}`, updateFields);
    },
  });

  // Update DataGrid Row
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    mutation.mutateAsync(newRow as Route).then(() => {
      refetch();
    });
    return updatedRow;
  };

  /**
   * Close Dialog
   */
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Dialog {...props} scroll="paper" maxWidth="sm" fullWidth>
      <DialogContent>
        <Stack>
          {isLoading && <CircularProgress />}
          {error && (
            <Alert severity="error" sx={{ mt: 1.5 }}>
              No se pudo cargar las rutas
            </Alert>
          )}
          {data && (
            <>
              <AppBar position="relative">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Editar Rutas
                  </Typography>

                  <Tooltip title="Eliminar">
                    <IconButton>
                      <IconTrash />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>

              <Paper>
                <DataGrid
                  columns={[
                    { headerName: "ID", field: "id", editable: false },
                    { headerName: "Nombre", field: "name", editable: true, flex: 1 },
                    { headerName: "Ubicación", field: "location", editable: true },
                    {
                      headerName: "Día de Cobro",
                      field: "payday",
                      editable: true,
                      type: "number",
                      valueFormatter(params) {
                        return `${params.value} del mes`;
                      },
                    },
                  ]}
                  rows={data}
                  processRowUpdate={processRowUpdate}
                  sx={{ border: 0 }}
                  hideFooter
                />
              </Paper>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: "0 1.5rem 1rem" }}>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleClose}>Cerrar</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

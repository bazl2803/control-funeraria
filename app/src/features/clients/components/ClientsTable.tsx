import React from "react";
import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Fab, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ClientModal } from "./ClientModal";
import { Client } from "../api/Client";
import { api } from "@/api/axios";
import { Policy } from "@/features/policies/api/Policy";

interface Props {
  onSelectClient: (client: Client) => void;
}

export const ClientsTable = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  /**
   * React Query
   */
  const queryClient = new QueryClient();

  const { data, error, isLoading, refetch } = useQuery<Client[], Error>(["clients"], () =>
    api.get("/clients").then((res) => res.data)
  );

  // axios put client function
  const editClient = async (client: Client) => {
    const { id, ...updateFields } = client;
    delete updateFields.policy;
    delete updateFields.route;
    return await api.put(`/clients/${id}`, updateFields);
  };

  // edit client react query mutation
  const mutation = useMutation({
    mutationFn: editClient,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["client", { id: variables.id }], data);
    },
  });

  // Update DataGrid Row
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    mutation.mutateAsync(newRow as Client).then(() => {
      refetch();
    });
    return updatedRow;
  };

  const handleSelectClient = React.useCallback(
    (client: Client) => {
      props.onSelectClient(client);
    },
    [props.onSelectClient]
  );

  return (
    <>
      <ClientModal
        open={open}
        onClose={() => {
          setOpen(false);
          refetch();
        }}
      />

      <Tooltip title="Nuevo Cliente">
        <Fab sx={{ position: "fixed", bottom: 8, right: 8 }} onClick={() => setOpen(true)}>
          <IconPlus />
        </Fab>
      </Tooltip>

      {error && <Typography color={"red"}>Error</Typography>}

      {data && (
        <DataGrid
          sx={{
            border: "none",
            padding: 1,
            width: "-webkit-fill-available",
            overflowX: "auto",
          }}
          columns={[
            {
              field: "id",
              headerName: "Id",
              editable: false,
              width: 20,
            },
            {
              field: "name",
              headerName: "Nombre",
              editable: true,
              width: 200,
            },
            {
              field: "phone_number",
              headerName: "Teléfono",
              editable: true,
              width: 130,
            },
            {
              field: "address",
              headerName: "Dirección",
              editable: true,
              minWidth: 250,
              flex: 1,
            },
            {
              field: "route",
              headerName: "Ruta",
              editable: false,
              width: 150,
              valueGetter(params) {
                const { route } = params.row;
                return `${route?.name}, ${route?.location}`;
              },
            },
            {
              field: "status",
              headerName: "Estado",
              type: "boolean",
              editable: true,
            },
            {
              field: "policy",
              headerName: "Contrato",
              type: "date",
              editable: false,
              width: 100,
              valueGetter(params) {
                const row = params.row as Client;
                if (row) {
                  return row.policy?.slice(0, 1)[0].date ?? "";
                }
              },
              valueFormatter: (params) => dayjs(params.value).locale("es-SV").format("L"),
            },
            {
              field: "actions",
              type: "actions",
              align: "right",
              width: 50,
              getActions: (params) => [
                <GridActionsCellItem
                  icon={<IconTrash />}
                  label="Eliminar"
                  title="Eliminar"
                  onClick={() =>
                    axios
                      .delete(`http://localhost:3000/api/clients/${params.id}`)
                      .then(() => refetch())
                  }
                />,
              ],
            },
          ]}
          rows={data}
          loading={isLoading}
          onRowClick={(params) => handleSelectClient(params.row)}
          processRowUpdate={processRowUpdate}
          autoPageSize
          pagination
        />
      )}
    </>
  );
};

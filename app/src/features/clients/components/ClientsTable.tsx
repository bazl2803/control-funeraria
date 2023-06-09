import React from "react";
import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Fab, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Client } from "../api/Client";
import { api } from "@/api/axios";
import { Policy } from "@/features/policies/api/Policy";

interface Props {
  onSelectClient: (client: Client) => void;
  clients: Client[];
}

export const ClientsTable = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  /**
   * React Query
   */
  const queryClient = new QueryClient();

  const { refetch } = useQuery<Client[], Error>(["clients"], () =>
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
      {props.clients && (
        <DataGrid
          sx={{
            border: "none",
            padding: 1,
            paddingTop: 3,
            width: "-webkit-fill-available",
            overflowX: "auto",
            bgcolor: "#f5f6f7",
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
              headerName: "Saldo",
              type: "number",
              editable: false,
              width: 100,
              valueGetter(params) {
                const row = params.row as Client;
                if (row) {
                  return row.policy?.slice(0, 1)[0].balance ?? "";
                }
              },
              valueFormatter: (params) => "$" + params.value.toFixed(2),
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
          rows={props.clients}
          key={"id"}
          onRowClick={(params) => handleSelectClient(params.row)}
          processRowUpdate={processRowUpdate}
          autoPageSize
          pagination
        />
      )}
    </>
  );
};

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IconListDetails, IconMapPin, IconPlus, IconTrash } from "@tabler/icons-react";
import { Fab, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ClientModal } from "./ClientModal";
import { Client } from "../api/Client";

interface Props {
  onSelectClient: (client: Client) => void;
}

export const ClientsTable = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const { data, error, isLoading, refetch } = useQuery<Client[], Error>(["clients"], () =>
    axios.get("http://localhost:3000/api/clients").then((res) => res.data)
  );

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
            height: "97vh",
            width: "-webkit-fill-available",
            "@media(prefers-color-scheme: dark)": {
              backgroundColor: "#222",
            },
          }}
          columns={[
            {
              field: "id",
              headerName: "Id",
              editable: false,
            },
            {
              field: "name",
              headerName: "Nombre",
              editable: true,
              flex: 1,
            },
            {
              field: "phone_number",
              headerName: "Teléfono",
              editable: true,
            },
            {
              field: "address",
              headerName: "Dirección",
              editable: true,
              flex: 1,
            },
            {
              field: "created_at",
              headerName: "Creación",
              type: "date",
              editable: false,
              valueFormatter: (params) => dayjs(params.value).locale("es-SV").format("ddd LL"),
            },
            {
              field: "actions",
              type: "actions",
              align: "right",
              getActions: (params) => [
                <GridActionsCellItem
                  icon={<IconTrash />}
                  label="Eliminar"
                  title="Eliminar"
                  onClick={() => axios.delete(`http://localhost:3000/api/clients/${params.id}`)}
                />,
              ],
            },
          ]}
          rows={data}
          loading={isLoading}
          onRowClick={(params) => handleSelectClient(params.row)}
          autoPageSize
          pagination
        />
      )}
    </>
  );
};

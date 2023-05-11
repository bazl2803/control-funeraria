import React from "react";
import { Client } from "../api/Client";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { IconListDetails, IconReceipt, IconTrash } from "@tabler/icons-react";

interface Props {
  clients: Client[];
  onSelectClient: (client: Client) => void;
}

export const ClientsTable = (props: Props) => {
  const handleSelectClient = React.useCallback(
    (client: Client) => {
      props.onSelectClient(client);
    },
    [props.onSelectClient]
  );

  return (
    <DataGrid
      sx={{
        border: "none",
        padding: 1,
        "@media(prefers-color-scheme: dark)": {
          backgroundColor: "#222",
        },
      }}
      hideFooter
      autoHeight
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
          headerName: "Fecha",
          type: "date",
          editable: true,
          width: 200,
          valueFormatter: (params) => dayjs(params.value).locale("es-SV").format("ddd LL"),
        },
        {
          field: "actions",
          type: "actions",
          getActions: (params) => [
            <GridActionsCellItem
              icon={<IconListDetails />}
              label="Polizas"
              title="Polizas"
              onClick={() => handleSelectClient(params.row)}
            />,
            <GridActionsCellItem
              icon={<IconTrash />}
              label="Eliminar"
              title="Eliminar"
              //onClick={() => handleSelectClient(params.row)}
            />,
          ],
        },
      ]}
      rows={props.clients}
    />
  );
};

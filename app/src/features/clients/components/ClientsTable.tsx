import React from "react";
import { Client } from "../api/Client";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

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
      onRowClick={(params) => handleSelectClient(params.row)}
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
          field: "created_at",
          headerName: "Fecha",
          type: "date",
          editable: true,
          width: 200,
          valueFormatter: (params) => dayjs(params.value).locale("es-SV").format("ddd LL"),
        },
      ]}
      rows={props.clients}
    />
  );
};

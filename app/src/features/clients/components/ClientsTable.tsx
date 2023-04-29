import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import React, {useCallback} from "react";
import {Client} from "../api/Client";

interface Props {
    clients: Client[]
    onSelectClient: (client: Client) => void
}

export const ClientsTable = (props: Props) => {
    const handleSelectClient = useCallback((client: Client) => {
        props.onSelectClient(client)
    }, [props.onSelectClient])

    return (
        <Paper sx={{padding: "1rem"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.clients?.map((client) => (
                            <TableRow key={client.id} onClick={() => handleSelectClient(client)}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell>{client.phone_number}</TableCell>
                                <TableCell>{client.status}</TableCell>
                                <TableCell>{client.created_at.toLocaleDateString("es-SV")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

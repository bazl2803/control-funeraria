import {
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import {Item} from "../api/Item";
import {IconEdit, IconTrash} from "@tabler/icons-react";

interface Props {
    items: Item[];
}

export const ItemsTable = ({items}: Props) => {
    return (
        <Paper
            sx={{padding: "1rem",}}
            elevation={2}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell width={"100%"}>Nombre</TableCell>
                            <TableCell>Existencia</TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items?.map((item) => (
                            <TableRow hover={true}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{item.stock}</TableCell>
                                <TableCell align="right">
                                    <Stack direction={"row"} spacing={2}>
                                        <Tooltip title="Editar">
                                            <IconButton id="item-button" aria-haspopup="true">
                                                <IconEdit/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Eliminar">
                                            <IconButton id="item-button" aria-haspopup="true">
                                                <IconTrash/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

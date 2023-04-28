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
import React from "react";
import {Service} from "../api/Service";
import {IconEdit, IconTrash} from "@tabler/icons-react";

interface Props {
    services: Service[];
}

export const ServicesTable = ({services}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper
            sx={{padding: "1rem"}}
            elevation={2}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell width={"100%"}>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Prima</TableCell>
                            <TableCell>Cuota</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id} hover={true}>
                                <TableCell>{service.id}</TableCell>
                                <TableCell>{service.name}</TableCell>
                                <TableCell align="right">{"$" + service.price}</TableCell>
                                <TableCell align="right">{"$" + service.prime}</TableCell>
                                <TableCell align="right">{"$" + service.fee}</TableCell>
                                <TableCell align="right">
                                    <Stack direction={"row"} spacing={2}>
                                        <Tooltip title="Editar">
                                            <IconButton
                                                id="service-button"
                                                onClick={handleClick}
                                                aria-haspopup="true"
                                                aria-controls={open ? "service-menu" : undefined}
                                                aria-expanded={open ? "true" : undefined}
                                            >
                                                <IconEdit/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Eliminar">
                                            <IconButton
                                                id="service-button"
                                                onClick={handleClick}
                                                aria-haspopup="true"
                                                aria-controls={open ? "service-menu" : undefined}
                                                aria-expanded={open ? "true" : undefined}
                                            >
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

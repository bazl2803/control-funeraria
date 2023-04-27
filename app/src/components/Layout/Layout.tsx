import React from "react";
import {Box, IconButton, Paper, Stack, Tooltip} from "@mui/material";
import {
    IconCoffin,
    IconDashboard,
    IconKey,
    IconMap2,
    IconReceipt2,
    IconTableAlias,
    IconUsers
} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                height: "100%",
                overflowX: "hidden",
                "@media(prefers-color-sheme: light)": {
                    backgroundColor: "#fafafa"
                }
            }}
        >
            <Paper sx={{zIndex: 1101}} elevation={3}>
                <Stack spacing={2} padding={2} alignItems={"center"}>
                    <img
                        style={{objectFit: "scale-down", padding: "1rem 0"}}
                        src="/logo.png"
                        alt="logo"
                        width={"48px"}
                    />
                    <Tooltip title={"Tablero"} placement={"right"}>
                        <IconButton onClick={() => navigate("/app")}>
                            <IconDashboard/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Clientes"} placement={"right"}>
                        <IconButton onClick={() => navigate("/clients")}>
                            <IconUsers/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Rutas"} placement={"right"}>
                        <IconButton onClick={() => navigate("/routes")}>
                            <IconMap2/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Polizas"} placement={"right"}>
                        <IconButton onClick={() => navigate("/policies")}>
                            <IconReceipt2/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Inventario"} placement={"right"}>
                        <IconButton onClick={() => navigate("/items")}>
                            <IconTableAlias/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Servicios"} placement={"right"}>
                        <IconButton onClick={() => navigate("/services")}>
                            <IconCoffin/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Credenciales"} placement={"right"}>
                        <IconButton onClick={() => navigate("/credentials")}>
                            <IconKey/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Paper>
            <Box sx={{gridColumn: 2,}}>
                {props.children}
            </Box>
        </Box>
    );
};

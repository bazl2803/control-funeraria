import {useState} from "react";
import {Box, Button, CircularProgress, Container, Paper, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        setTimeout(() => {
            navigate("/app")
        }, 3000)
    }

    const [loading, setLoading] = useState(false);
    return (
        <Container>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
                 width={"100%"} height={"100vh"}>
                <Stack spacing={4} alignItems={"center"}>
                    <img src={'./logo (2).png'} alt={"logo"} width={150}/>

                    <Paper sx={{display: "flex", padding: "1rem"}}>
                        <Stack sx={{width: "20rem"}} spacing={4}>
                            <TextField type={"email"} size={"small"} label={"Nombre de usuario"}/>
                            <TextField type={"password"} size={"small"} label={"Contraseña"}/>
                            <Button variant={"contained"}
                                    fullWidth
                                    onClick={() => {
                                        setLoading(true)
                                        handleLogin()
                                    }}>
                                Iniciar Sesión
                            </Button>

                        </Stack>
                    </Paper>
                    {loading && <CircularProgress/>}
                </Stack>
            </Box>
        </Container>
    );
};
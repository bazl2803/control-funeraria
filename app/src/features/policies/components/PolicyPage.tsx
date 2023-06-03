import {
  Alert,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IconArrowLeft, IconPrinter } from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import { PolicyPageDetails } from "./PolicyPageDetails";
import { PolicyPageFuneral } from "./PolicyPageFuneral";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { Policy } from "../api/Policy";
import { PolicyPagePayments } from "./PolicyPagePayments";

export const PolicyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<Policy, Error>(
    ["policy"],
    async () => (await api.get(`policies/${id}`)).data
  );
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">Ha habido un error</Alert>}

      {data && (
        <Container
          sx={{
            my: 4,
            "@media print": {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0px",
              bottom: "0px",
              margin: "auto",
              marginY: "0px !important",
            },
          }}
          maxWidth="md"
        >
          <Stack spacing={4} justifyContent={"stretch"} mb={1}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} spacing={2} justifyContent={"start"}>
                <IconButton
                  title="Atrás"
                  sx={{ displayPrint: "none" }}
                  onClick={() => navigate("/app")}
                >
                  <IconArrowLeft />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                  {`#${id?.toString().padStart(8, "0")}`}
                </Typography>
              </Stack>

              <Stack direction={"row"} displayPrint={"none"}>
                <IconButton title="Imprimir" onClick={() => window.print()}>
                  <IconPrinter />
                </IconButton>
              </Stack>
            </Stack>

            <PolicyPageDetails policy={data} />
            {data.payment && <PolicyPagePayments payments={data.payment} />}

            {data.funeral ? (
              <PolicyPageFuneral funeral={data.funeral} />
            ) : (
              <Alert severity="warning">Servicio no entregado</Alert>
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

import { api } from "@/api/axios";
import { useMutation, useQueries } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { Route } from "@/features/routes/api/Route";
import { Service } from "@/features/services/api/Service";

type FormValues = {
  name: string; //
  doc_id: string; //
  type: string; //
  job?: string; //
  incomes?: number;
  extension_day?: number;
  status: boolean; //
  routeId?: number; //
  route_index?: number;
  method: string; //
  phone_number?: string; //
  email?: String; //
  address?: string; //
  created_at: Date;
  policy: {
    create: {
      serviceId: number;
      date?: Date;
      balance: number;
      value: number;
      fee: number;
      prime: number;
      status?: string;
      modality?: string;
    };
  };
  notes?: {
    create: {
      text?: String;
    };
  };
};

export const CreateClientForm = () => {
  /*-- React Router Dom -- useNavigate */
  const navigate = useNavigate();

  /* -- React Hook Form -- handleSubmit */
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  /* -- React Query -- queries */
  const [routes, services] = useQueries({
    queries: [
      {
        queryKey: ["routes"],
        queryFn: async () => (await api.get("/routes")).data as Route[],
      },
      {
        queryKey: ["services"],
        queryFn: async () => (await api.get("/services")).data as Service[],
      },
    ],
  });

  /*-- React Query -- Create Client Mutation */
  const createClient = useMutation({
    mutationFn: async (newClient) => {
      console.log(newClient);
      await api.post("/clients", newClient);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (dataForm: any, event) => {
    dataForm.policy.create.balance = dataForm.policy.create.value;
    dataForm.created_at = new Date();
    dataForm.status = true;
    createClient.mutateAsync(dataForm);
    //navigate("/app");
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={2} p={2}>
        <Stack direction={"row"} spacing={1}>
          <IconButton
            title="Atrás"
            sx={{ displayPrint: "none" }}
            onClick={() => navigate("/app")}
          >
            <IconArrowLeft />
          </IconButton>
          <Typography variant="h4" fontWeight={600}>
            Nuevo Cliente
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Stack sx={{ bgcolor: "#fbfbfb" }} spacing={2}>
              <Typography
                variant="h6"
                fontWeight={600}
                gridColumn={"span 2"}
                justifySelf={"start"}
              >
                Datos del Cliente
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  justifyItems: "end",
                  gap: 4,
                }}
              >
                <FormControl fullWidth size="small" error={errors.type && true}>
                  <InputLabel id="type-label" variant="filled">
                    Tipo
                  </InputLabel>
                  <Select
                    {...register("type", { required: true })}
                    labelId="type-label"
                    variant="filled"
                    defaultValue={""}
                  >
                    <MenuItem defaultChecked value={""} disabled />
                    <MenuItem value={"Persona"}>Persona</MenuItem>
                    <MenuItem value={"Empresa"}>Empresa</MenuItem>
                  </Select>
                </FormControl>

                <Controller
                  name="doc_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="filled" fullWidth>
                      <InputLabel htmlFor="DUI">DUI</InputLabel>
                      <FilledInput
                        name="doc_id"
                        size="small"
                        id="DUI"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  )}
                />

                <TextField
                  sx={{ gridColumn: "span 2" }}
                  {...register("name")}
                  variant="filled"
                  label="Nombre"
                  fullWidth
                  size="small"
                />

                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="phone-label">Teléfono</InputLabel>
                  <FilledInput
                    {...register("phone_number")}
                    type="tel"
                    size="small"
                    id="phone-label"
                  />
                </FormControl>

                <TextField
                  {...register("email")}
                  variant="filled"
                  label="Correo Electrónico"
                  type="email"
                  size="small"
                  fullWidth
                />

                <TextField
                  {...register("address")}
                  sx={{ gridColumn: "span 2" }}
                  variant="filled"
                  label="Dirección"
                  multiline
                  rows={2}
                  fullWidth
                />

                <FormControl variant="filled" fullWidth>
                  <InputLabel id="routes-label">Ruta</InputLabel>
                  <Select
                    {...register("routeId")}
                    labelId="routes-label"
                    variant="filled"
                    size="small"
                    defaultValue={-1}
                    fullWidth
                  >
                    <MenuItem disabled />
                    {routes.data
                      ?.sort((a, b) => a.payday - b.payday)
                      .map((route) => (
                        <MenuItem key={route.id} value={route.id}>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            spacing={1}
                            width={"100%"}
                          >
                            <Typography>{route.name}</Typography>
                            <Typography>{route.payday} del mes</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Controller
                  name="extension_day"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <FormControl size="small" variant="filled" fullWidth>
                      <InputLabel>Día de Prórroga</InputLabel>
                      <FilledInput
                        size={"small"}
                        type={"number"}
                        inputProps={{ min: 1, max: 30 }}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                  )}
                />
              </Box>
            </Stack>

            <Stack sx={{ bgcolor: "#fbfbfb" }} spacing={2}>
              <Typography variant="h6" fontWeight={600} justifySelf={"start"}>
                Información de Servicio
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  justifyItems: "end",
                  gap: 4,
                  mt: 1,
                }}
              >
                <TextField
                  {...register("job")}
                  variant="filled"
                  label="Profesión"
                  size={"small"}
                  fullWidth
                />

                <Controller
                  name="incomes"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <FormControl size="small" variant="filled" fullWidth>
                      <InputLabel>Ingresos</InputLabel>
                      <FilledInput
                        size={"small"}
                        type={"number"}
                        inputProps={{ min: 0 }}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="start">
                            /mensuales
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                />

                <FormControl variant="filled" size={"small"} fullWidth>
                  <InputLabel>Método de Cobro</InputLabel>
                  <Select
                    {...register("method", { required: true })}
                    defaultValue=""
                  >
                    <MenuItem disabled>Método de Pago</MenuItem>
                    <MenuItem value="Ruta">Ruta</MenuItem>
                    <MenuItem value="Oficina">Oficina</MenuItem>
                    <MenuItem value="Banco">Banco</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="filled" size={"small"} fullWidth>
                  <InputLabel id="modality-label">Modalidad de Pago</InputLabel>
                  <Select
                    {...register("policy.create.modality")}
                    labelId={"modality-label"}
                    defaultValue=""
                  >
                    <MenuItem value="" disabled>
                      Modalidad de Pago
                    </MenuItem>
                    <MenuItem value="Pasivo">Pasivo</MenuItem>
                    <MenuItem value="Crédito">Crédito</MenuItem>
                    <MenuItem value="Contado">Contado</MenuItem>
                    <MenuItem value="Reservado">Reservado</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="filled" size={"small"} fullWidth>
                  <InputLabel id="route_label">Servicio</InputLabel>
                  <Select
                    {...register("policy.create.serviceId", { required: true })}
                    defaultValue=""
                    labelId={"route_label"}
                    displayEmpty
                    size="small"
                  >
                    <MenuItem disabled>Servicio</MenuItem>
                    {services.data &&
                      services.data.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"1fr 100px 100px"}
                            width={"100%"}
                            pr={2}
                          >
                            <Typography>{service.name}</Typography>
                            <Typography align="right">
                              ${" "}
                              {parseFloat(service.price.toString()).toFixed(2)}
                            </Typography>
                            <Typography
                              style={{ paddingLeft: 24 }}
                              align="left"
                            >
                              $ {parseFloat(service.fee.toString()).toFixed(2)}
                              /mes
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Stack direction={"row"} spacing={1}>
                  <Controller
                    name="policy.create.value"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <FormControl size="small" variant="filled" fullWidth>
                        <InputLabel>Valor</InputLabel>
                        <FilledInput
                          size={"small"}
                          type={"number"}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="policy.create.prime"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <FormControl size="small" variant="filled" fullWidth>
                        <InputLabel>Prima</InputLabel>
                        <FilledInput
                          size={"small"}
                          type={"number"}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="policy.create.fee"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <FormControl size="small" variant="filled" fullWidth>
                        <InputLabel>Cuota</InputLabel>
                        <FilledInput
                          size={"small"}
                          type={"number"}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="start">
                              /mes
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />
                </Stack>
              </Box>
            </Stack>

            <Stack sx={{ bgcolor: "#fbfbfb" }} spacing={2}>
              <Typography variant="h6" fontWeight={600} justifySelf={"start"}>
                Notas
              </Typography>

              <TextField
                {...register("notes.create.text")}
                label="Nota"
                variant="filled"
                rows={3}
                multiline
                size="small"
                defaultValue={undefined}
              />
            </Stack>

            <Button sx={{ alignSelf: "end" }} variant="contained" type="submit">
              Guardar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

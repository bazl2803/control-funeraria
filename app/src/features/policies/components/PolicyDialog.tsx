import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Service } from "@/features/services/api/Service";
import { useMutation, useQueries } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { useForm } from "react-hook-form";

interface Props extends DialogProps {
  onClose: () => void;
  client_id?: number;
  policy_id?: number;
}

export const PolicyDialog: React.FC<Props> = (props) => {
  // React Query
  const [services] = useQueries({
    queries: [
      {
        queryKey: ["services", 1],
        queryFn: () => api.get(`/services`).then((res) => res.data as Service[]),
      },
      {
        queryKey: ["policy", 0],
        queryFn: () => {
          return props.policy_id
            ? api.get(`/policies/${props.policy_id}`).then((res) => res.data)
            : [];
        },
      },
    ],
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit changes
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      return await api.put(`/policies/${props.policy_id}`, formData);
    },
  });

  const submit = (formData: any) => {
    const dataObj = { ...formData };
    mutation.mutateAsync(dataObj);
  };

  return (
    <Dialog {...props} fullWidth>
      <DialogTitle my={2}>Poliza</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={4}>
            <Stack direction={"row"} spacing={2}>
              <FormControl variant="filled" size={"small"} fullWidth>
                <InputLabel>Método de Cobro</InputLabel>
                <Select defaultValue="" {...register("method", { required: true })}>
                  <MenuItem disabled>Método de Pago</MenuItem>
                  <MenuItem value="Ruta">Ruta</MenuItem>
                  <MenuItem value="Oficina">Oficina</MenuItem>
                  <MenuItem value="Banco">Banco</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="filled" size={"small"} fullWidth>
                <InputLabel>Modalidad de Pago</InputLabel>
                <Select defaultValue="" {...register("modality", { required: true })}>
                  <MenuItem value="" disabled>
                    Modalidad de Pago
                  </MenuItem>
                  <MenuItem value="Pasivo">Pasivo</MenuItem>
                  <MenuItem value="Crédito">Crédito</MenuItem>
                  <MenuItem value="Contado">Contado</MenuItem>
                  <MenuItem value="Reservado">Reservado</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <FormControl variant="filled" size={"small"}>
              <InputLabel variant="filled" id="service_label">
                Servicio
              </InputLabel>
              <Select
                defaultValue=""
                labelId="service_label"
                displayEmpty
                {...register("serviceId", { required: true })}
              >
                <MenuItem disabled>Servicio</MenuItem>
                {services.data?.map((service) => (
                  <MenuItem value={service.id} key={service.id}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "60% 1fr",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ gridColumn: "1" }}>{service.name}</Typography>
                      <Typography sx={{ gridColumn: "2" }} color={"text.secondary"}>
                        Precio: $ {service.price}.00
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction={"row"} spacing={1}>
              <FormControl size="small" variant="filled" fullWidth>
                <InputLabel>Valor</InputLabel>
                <FilledInput
                  size={"small"}
                  type={"number"}
                  inputProps={{ min: 1 }}
                  {...register("value", { required: true, min: 1 })}
                  error={errors.value ? true : false}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                <FormHelperText error={errors.value ? true : false}>
                  {errors.value ? "Requerido" : ""}
                </FormHelperText>
              </FormControl>

              <FormControl size="small" variant="filled" fullWidth>
                <InputLabel>Prima</InputLabel>
                <FilledInput
                  size={"small"}
                  type={"number"}
                  inputProps={{ min: 1 }}
                  {...register("prime", { required: true })}
                  error={errors.value ? true : false}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                <FormHelperText error={errors.value ? true : false}>
                  {errors.value ? "Requerido" : ""}
                </FormHelperText>
              </FormControl>

              <FormControl size="small" variant="filled" fullWidth>
                <InputLabel>Cuota</InputLabel>
                <FilledInput
                  size={"small"}
                  type={"number"}
                  inputProps={{ min: 1 }}
                  {...register("fee", { required: true })}
                  error={errors.value ? true : false}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  endAdornment={<InputAdornment position="start">/mensuales</InputAdornment>}
                />
                <FormHelperText error={errors.value ? true : false}>
                  {errors.value ? "Requerido" : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="end" spacing={1} mt={4}>
            <Button variant="outlined">Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit(submit)}>
              Guardar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

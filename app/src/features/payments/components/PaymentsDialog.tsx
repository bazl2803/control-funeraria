import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import { IconExclamationCircle, IconPlus } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Payment } from "../api/payment";
import dayjs from "dayjs";
import React from "react";

interface Props extends DialogProps {
  onClose?: () => void;
  policy_id: number;
}

export const PaymentsDialog = (props: Props) => {
  const queryClient = new QueryClient();
  const { isLoading, data, error, refetch } = useQuery(["payments"], () =>
    axios.get("http://localhost:3000/api/payments").then((res) => res.data)
  );

  const editPayment = async (payment: Payment) => {
    const { id, ...updateFields } = payment;
    return await axios.put(`http://localhost:3000/api/payments/${id}`, updateFields);
  };

  const mutation = useMutation({
    mutationFn: editPayment,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["payment", { id: variables.id }], data);
    },
  });

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    mutation.mutateAsync(newRow as Payment).then(() => {
      console.table(newRow);
      refetch();
    });
    return updatedRow;
  };

  // react-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // onSubmit Function
  const onSubmit = async (data: any) => {
    const paymentObj = { ...data, policyId: props.policy_id, status: 0 };
    console.log(paymentObj);
    await axios
      .post("http://localhost:3000/api/payments/", paymentObj)
      .then((response) => response.data);
    reset();
    refetch();
  };

  // handleClose
  function handleClose(): void {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Dialog {...props} scroll="body" maxWidth="md" fullWidth>
      <DialogTitle>Pagos</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              component={Paper}
              spacing={2}
              p={2}
            >
              <TextField
                label="Número"
                variant="filled"
                size="small"
                fullWidth
                {...register("number", { required: true })}
                error={errors.number ? true : false}
                helperText={errors.number ? "Requerido" : ""}
              />

              <Controller
                name="date"
                rules={{ required: true }}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    disableFuture
                    format="LL"
                    label="Fecha"
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        size: "small",
                        fullWidth: true,
                        error: errors.date ? true : false,
                        helperText: errors.date ? "Requerido" : "",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="amount"
                rules={{ required: true, min: 1 }}
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <FormControl sx={{ width: 300 }} size="small" variant="filled">
                    <InputLabel shrink>Monto</InputLabel>
                    <FilledInput
                      {...field}
                      size={"small"}
                      type={"number"}
                      onChange={(e) => field.onChange(e.target.value)}
                      inputProps={{ min: 1 }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                )}
              />

              <Tooltip title="Agregar">
                <IconButton onClick={handleSubmit(onSubmit)}>
                  <IconPlus />
                </IconButton>
              </Tooltip>
            </Stack>
          </form>

          {!error && data ? (
            <DataGrid
              sx={{ height: 400, width: "100%" }}
              columns={[
                { field: "id", headerName: "Id" },
                { field: "number", headerName: "Número", editable: true, width: 150 },
                {
                  field: "date",
                  headerName: "Fecha",
                  editable: true,
                  valueFormatter: (params) => dayjs(params.value).locale("es").format("LL"),
                  width: 150,
                },
                { field: "amount", headerName: "Monto", editable: true },
              ]}
              rows={data}
              sortModel={[{ field: "date", sort: "desc" }]}
              localeText={{ noRowsLabel: "Sin datos" }}
              loading={isLoading}
              processRowUpdate={processRowUpdate}
              hideFooter
            />
          ) : (
            <Stack
              sx={{ bgcolor: "#ff6961" }}
              direction="row"
              alignItems="center"
              p={2}
              spacing={2}
            >
              <IconExclamationCircle size="1.5rem" />
              <Typography>Fallo al Conectar</Typography>
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "0 1.5rem 1rem" }}>
        <Button onClick={() => handleClose()}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

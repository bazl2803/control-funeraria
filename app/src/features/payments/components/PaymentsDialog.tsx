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
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import {
  IconArrowBackUp,
  IconExclamationCircle,
  IconPlus,
  IconSquareForbid2,
  IconTrash,
} from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Payment } from "../api/payment";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Policy } from "@/features/policies/api/Policy";

interface Props extends DialogProps {
  onClose?: () => void;
  policy_id: number;
}

export const PaymentsDialog: React.FC<Props> = (props) => {
  /**
   * React Query
   */
  const queryClient = new QueryClient();

  // get payments
  const { isLoading, data, refetch } = useQuery(["payments"], () =>
    axios.get("http://localhost:3000/api/payments").then((res) => {
      const filteredPayments = (res.data as Payment[]).filter(
        (pay) => pay.policyId == props.policy_id
      );
      return filteredPayments;
    })
  );

  // axios put payments function
  const editPayment = async (payment: Payment) => {
    const { id, ...updateFields } = payment;
    return await axios.put(`http://localhost:3000/api/payments/${id}`, updateFields);
  };

  // edit payment react query mutation
  const mutation = useMutation({
    mutationFn: editPayment,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["payment", { id: variables.id }], data);
    },
  });

  // Update DataGrid Row
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    mutation.mutateAsync(newRow as Payment).then(() => {
      refetch();
    });
    return updatedRow;
  };

  /**
   * React Hook Form
   */
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * Methods
   */
  // onSubmit
  const onSubmit = async (dataForm: any) => {
    const paymentObj = { ...dataForm, policyId: props.policy_id, status: true };
    await axios.post("http://localhost:3000/api/payments/", paymentObj).then((response) => {
      response.data;
    });
    reset();
    refetch();
  };

  // handleClose
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  // Calculate Policy Balance
  const setBalance = async (payments: Array<Payment>) => {
    const payAmount: number = payments
      .filter((pay) => pay.status)
      .reduce((accummulate, pay) => {
        return accummulate + parseFloat(pay.amount.toString());
      }, 0);

    const policy = (await axios.get(`http://localhost:3000/api/policies/${props.policy_id}`))
      .data as Policy;

    await axios.put(`http://localhost:3000/api/policies/${props.policy_id}`, {
      balance: policy.value - payAmount,
    });
  };

  useEffect(() => {
    let paymentsArray: Payment[] = [];
    if (data) {
      paymentsArray = data as Payment[];
    }
    setBalance(paymentsArray);
  }, [data]);

  return (
    <Dialog {...props} scroll="body" maxWidth="md" fullWidth>
      <DialogTitle>Pagos</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 2 }}>
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

          {data ? (
            <DataGrid
              columns={[
                { field: "id", headerName: "Id" },
                {
                  field: "number",
                  headerName: "Factura",
                  editable: true,
                  width: 150,
                  valueFormatter: (params) => params.value.padStart(8, 0),
                },
                {
                  field: "date",
                  headerName: "Fecha",
                  type: "date",
                  editable: true,
                  width: 200,
                  flex: 1,
                  valueFormatter: (params) => dayjs(params.value).locale("es-SV").format("ddd LL"),
                },
                {
                  field: "status",
                  headerName: "Estado",
                  type: "boolean",
                },
                {
                  field: "amount",
                  headerName: "Monto",
                  type: "number",
                  editable: true,
                  valueFormatter(params) {
                    return new Intl.NumberFormat("es-SV", {
                      style: "currency",
                      currency: "USD",
                    }).format(params.value);
                  },
                },
                // ACTIONS
                {
                  field: "actions",
                  type: "actions",
                  align: "right",
                  flex: 1,
                  getActions: (params) => [
                    <GridActionsCellItem
                      icon={<IconSquareForbid2 />}
                      label="Anular"
                      title="Anular"
                      onClick={() => {
                        axios
                          .put(`http://localhost:3000/api/payments/${params.id}`, {
                            status: false,
                          })
                          .then(() => refetch());
                      }}
                    />,
                    <GridActionsCellItem
                      icon={<IconArrowBackUp />}
                      label="Revertir"
                      title="Revertir"
                      onClick={() =>
                        axios
                          .put(`http://localhost:3000/api/payments/${params.id}`, { status: true })
                          .then(() => refetch())
                      }
                    />,
                    <GridActionsCellItem
                      icon={<IconTrash />}
                      label="Eliminar"
                      title="Eliminar"
                      onClick={() =>
                        axios
                          .delete(`http://localhost:3000/api/payments/${params.id}`)
                          .then(() => refetch())
                      }
                    />,
                  ],
                },
              ]}
              rows={data}
              localeText={{ noRowsLabel: "Sin datos" }}
              processRowUpdate={processRowUpdate}
              loading={isLoading}
              autoHeight
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

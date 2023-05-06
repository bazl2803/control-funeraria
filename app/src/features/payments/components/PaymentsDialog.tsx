import {
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
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { IconPlus } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";

interface Props extends DialogProps {
  onClose?: () => void;
}

export const PaymentsDialog = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  function handleClose(): void {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Dialog {...props} maxWidth="md" scroll="body" fullWidth>
      <DialogTitle>Pagos</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={2}
              p={2}
              component={Paper}
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
                    disableFuture
                    format="LL"
                    label="Fecha"
                    slotProps={{
                      textField: {
                        variant: "filled",
                        size: "small",
                        fullWidth: true,
                        error: errors.date ? true : false,
                        helperText: errors.date ? "Requerido" : "",
                      },
                    }}
                    {...field}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />

              <Controller
                name="amount"
                rules={{ required: true }}
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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>Número</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableHead>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: "0 1.5rem 1rem" }}>
        <Button onClick={() => handleClose()}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

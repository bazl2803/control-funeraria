import { useEffect, useState } from "react";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Service } from "../api/Service";
import axios from "axios";
import { IconCirclePlus } from "@tabler/icons-react";

interface Props {
  serviceId: string;
}

export const ServiceDetail = (props: Props) => {
  const [service, setService] = useState<Service>();

  async function getService() {
    try {
      const response = await axios.get(`http://localhost:3000/api/service/1`);
      setService(response.data as Service);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getService();
  }, []);

  return (
    <Paper sx={{ padding: "1rem" }} elevation={2}>
      <Stack>
        <Typography variant="h6">Mobiliario</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Sillas" />
            <FormControl sx={{ width: "120px" }} size="small" variant="filled">
              <InputLabel>Cantidad</InputLabel>
              <FilledInput defaultValue={1} type="number" size="small" inputProps={{ min: 1 }} />
            </FormControl>
          </ListItem>
        </List>

        <Button variant="text" startIcon={<IconCirclePlus />}>
          Agregar artículo
        </Button>
      </Stack>
    </Paper>
  );
};

import { Stack, Typography } from "@mui/material";

type Props = {
  primary: String;
  secondary: String;
  direction?: "row" | "column";
};

export const PresentationLabel = (props: Props) => {
  return (
    <Stack
      direction={props.direction ?? "row"}
      spacing={4}
      alignItems={"start"}
    >
      <Typography color={"text.secondary"}>
        {props.primary}
      </Typography>
      <Typography>{props.secondary}</Typography>
    </Stack>
  );
};

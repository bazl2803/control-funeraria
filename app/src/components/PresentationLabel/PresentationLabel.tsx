import { Stack, Typography } from "@mui/material";

type Props = {
  primary: String;
  secondary: String;
  direction?: "row" | "column";
};

export const PresentationLabel = (props: Props) => {
  return (
    <Stack
      direction={props.direction ?? "column"}
      alignItems={"start"}
      justifyContent={"start"}
    >
      <Typography color={"text.secondary"}>
        {props.primary}
      </Typography>
      <Typography>{props.secondary}</Typography>
    </Stack>
  );
};

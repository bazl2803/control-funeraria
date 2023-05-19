import React from "react";
import { IMaskInput } from "react-imask";

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneMask = React.forwardRef<HTMLElement, Props>(function PhoneMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(5\03) 0000-0000"
      placeholder="(503) 0000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

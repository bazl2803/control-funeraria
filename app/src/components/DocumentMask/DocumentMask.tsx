import React from "react";
import { IMaskInput } from "react-imask";

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const DocumentMask = React.forwardRef<HTMLElement, Props>(function PhoneMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000000-0"
      placeholder="00000000-0"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

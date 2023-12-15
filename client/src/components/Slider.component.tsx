import React from "react";
import MuiSlider from "@mui/material/Slider";
import InputLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

export function Slider({
  wrapperClassName = "",
  className = "",
  label,
  value,
  onChange,
  disabled = false,
  valueLabelDisplay = "auto",
  size,
}: {
  wrapperClassName?: string;
  className?: string;
  label?: string;
  value?: number;
  onChange?: (value: number) => any;
  disabled?: boolean;
  valueLabelDisplay?: "on" | "off" | "auto";
  size?: "medium" | "small";
}) {
  const sliderId = React.useId();
  const labelId = `label-${sliderId}`;

  const handleChange = React.useCallback(
    (_e: any, value: any) => {
      onChange?.(value);
    },
    [onChange]
  );

  return (
    <FormControl className={wrapperClassName}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSlider
        id={sliderId}
        className={className}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        valueLabelDisplay={valueLabelDisplay}
        size={size}
      />
    </FormControl>
  );
}

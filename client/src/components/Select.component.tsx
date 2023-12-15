import React from "react";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export function Select<TValue, TOption>({
  value,
  label,
  className,
  wrapperClassName,
  onChange,
  options,
  valueExtractor,
  itemRenderer,
  variant,
  disabled = false
}: {
  value?: TValue;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  onChange?: (value: TValue) => any;
  options?: TOption[];
  valueExtractor?: (option: TOption) => string;
  itemRenderer?: (option: TOption) => React.ReactNode;
  variant?: "standard" | "outlined" | "filled";
  disabled?: boolean;
}) {
  const selectId = React.useId();
  const labelId = `label-${selectId}`;

  const handleChange = React.useCallback(
    (e: any) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const renderedOptions = React.useMemo(() => {
    return options?.map((option) => {
      const value = valueExtractor?.(option);

      return (
        <MenuItem key={value} value={value}>
          {itemRenderer?.(option)}
        </MenuItem>
      );
    });
  }, [options, itemRenderer, valueExtractor]);

  return (
    <FormControl className={wrapperClassName}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect className={className} labelId={labelId} value={value} onChange={handleChange} variant={variant} disabled={disabled}>
        {renderedOptions}
      </MuiSelect>
    </FormControl>
  );
}

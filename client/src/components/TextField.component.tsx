import React from "react";
import MuiTextField from "@mui/material/TextField";

export function TextField({
  className,
  label,
  value,
  onChange,
  required = false,
}: {
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => any;
  required?: boolean;
}) {
  const textFieldId = React.useId();

  const handleChange = React.useCallback(
    (e: any) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const textFieldError = React.useMemo(() => required && !value, [required, value]);

  return (
    <MuiTextField
      id={textFieldId}
      className={className}
      label={label}
      value={value}
      onChange={handleChange}
      required={required}
      error={textFieldError}
    />
  );
}

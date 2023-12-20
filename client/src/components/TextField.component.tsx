import React from "react";
import MuiTextField from "@mui/material/TextField";

export function TextField({
  className,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
  onKeyDown,
}: {
  className?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => any;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  onKeyDown?: (event: React.KeyboardEvent) => any;
}) {
  const textFieldId = React.useId();

  const handleChange = React.useCallback(
    (e: any) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const textFieldError = React.useMemo(
    () => required && !value,
    [required, value]
  );

  return (
    <MuiTextField
      id={textFieldId}
      name={name}
      className={className}
      label={label}
      value={value}
      onChange={handleChange}
      required={required}
      error={textFieldError}
      placeholder={placeholder}
      type={type}
      onKeyDown={onKeyDown}
    />
  );
}

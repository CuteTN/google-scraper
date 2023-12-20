import React from "react";
import MuiButton from "@mui/material/Button";

export function Button({
  children,
  className,
  color,
  variant,
  href,
  endIcon,
  startIcon,
  disabled,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "text" | "outlined" | "contained";
  href?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (mouseEvent: React.MouseEvent) => any;
}) {
  return (
    <MuiButton
      className={className}
      color={color}
      onClick={onClick}
      variant={variant}
      href={href}
      endIcon={endIcon}
      startIcon={startIcon}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
}

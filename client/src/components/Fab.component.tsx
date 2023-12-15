import React from "react";
import MuiFab from "@mui/material/Fab";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "./Tooltip.component";

export function Fab({
  children,
  className,
  style,
  color,
  variant,
  size,
  href,
  disabled,
  onClick,
  tooltip,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "circular" | "extended";
  size?: "small" | "medium" | "large";
  href?: string;
  disabled?: boolean;
  onClick?: () => any;
  style?: SxProps<Theme>;
  tooltip?: string;
}) {
  return (
    <Tooltip title={tooltip}>
      <MuiFab
        className={className}
        sx={style}
        color={color}
        onClick={onClick}
        variant={variant}
        href={href}
        disabled={disabled}
        size={size}
      >
        {children}
      </MuiFab>
    </Tooltip>
  );
}

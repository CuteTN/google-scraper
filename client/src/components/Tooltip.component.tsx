import React from "react";
import MuiTooltip from "@mui/material/Tooltip";

export type TooltipPlacement =
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

export function Tooltip({
  title,
  children,
  placement,
}: {
  children: React.ReactElement;
  title?: string;
  placement?: TooltipPlacement;
}) {
  return (
    <MuiTooltip title={title} placement={placement} arrow>
      {children}
    </MuiTooltip>
  );
}

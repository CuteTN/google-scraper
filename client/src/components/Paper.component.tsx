import React from "react";
import { SxProps } from "@mui/system";
import MuiPaper from "@mui/material/Paper";

export function Paper({
  className,
  children = "",
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: SxProps;
}) {
  return (
    <MuiPaper
      className={className}
      sx={{
        borderRadius: "16px",
        ...style ?? {},
      }}
    >
      {children}
    </MuiPaper>
  );
}

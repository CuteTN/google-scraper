import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export function Alert({
  className = "",
  title,
  description,
  severity,
}: {
  className?: string,
  title?: string;
  description?: string;
  severity?: "error" | "info" | "success" | "warning";
}) {
  return (
    <MuiAlert className={`relative ${className}`} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </MuiAlert>
  );
}

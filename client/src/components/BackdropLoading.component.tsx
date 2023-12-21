import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function BackdropLoading({
  shown = false,
  className = "",
}: {
  shown?: boolean;
  className?: string;
}) {
  return (
    <Backdrop className={className} open={shown}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

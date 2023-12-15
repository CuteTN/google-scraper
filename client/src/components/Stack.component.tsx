import React from "react";
import MuiStack from "@mui/material/Stack";

export function Stack<TItem>({
  spacing = 2,
  itemRenderer,
  items,
}: {
  items?: TItem[];
  spacing?: number;
  itemRenderer?: (item: TItem) => React.ReactNode;
}) {
  const renderedItems = React.useMemo(() => {
    return items?.map(item => itemRenderer?.(item))
  }, [items, itemRenderer]);

  return <MuiStack spacing={spacing}>
    {renderedItems}
  </MuiStack>;
}
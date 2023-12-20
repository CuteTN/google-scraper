import React from "react";
import { NavigateOptions, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "./routers"

export function useAppNavigate() {
  const rrdNavigate = useNavigate();
  
  const navigate = React.useCallback((to: keyof typeof ROUTES | number, options?: NavigateOptions & { params?: object }) => {
    if (typeof to === "number") { 
      rrdNavigate(to);
      return;
    }

    const { params, ...rrdOptions } = options ?? {};
    const path = generatePath(ROUTES[to].path!, params);
    rrdNavigate(path, rrdOptions)
  }, [rrdNavigate]);

  return navigate;
}
import React from "react";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { Button } from "../../components/Button.component";
import { HomeIcon } from "../../components/Icons.components";
import { Typography } from "../../components/Typography.component";

export function NotFoundPage() {
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();

  const handleBackHome = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate("home")
  }, [navigate])

  return (
    <div className="flex flex-col mt-5 ml-5 gap-3">
      <Typography className="w-fit" variant="h4">{`404 - ${fm(
        "common.nothingHere"
      )}`}</Typography>

      <Button
        className="w-fit"
        variant="contained"
        color="primary"
        href="/"
        startIcon={<HomeIcon />}
        onClick={handleBackHome}
      >
        <Typography className="whitespace-nowrap" variant="body1">
          {fm("common.backHome")}
        </Typography>
      </Button>
    </div>
  );
}

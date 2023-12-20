import React from "react";
import { useAuth } from "./authentication.provider";
import { Typography } from "../../components/Typography.component";
import { useAppI18n } from "../i18n/I18nProvider.context";
import { useAppNavigate } from "../routers/navigate.hook";

export function PageGuard({ children }: { children: React.ReactElement }) {
  const { isSignedIn } = useAuth();
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();

  const handleNavigateToSignIn = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate("signIn");
    },
    [navigate]
  );

  return isSignedIn ? (
    children
  ) : (
    <div className="flex min-h-screen justify-center mt-5">
      <Typography variant="h6">
        {fm("common.please")}&nbsp;
        <a
          className="text-pink-400 underline underline-offset-1"
          href="/sign-in"
          onClick={handleNavigateToSignIn}
        >
          {fm("common.signIn")}
        </a>
        &nbsp;
        {fm("common.toContinue")}
      </Typography>
    </div>
  );
}

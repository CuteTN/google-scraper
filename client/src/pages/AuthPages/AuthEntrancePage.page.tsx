import React from "react";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { Paper } from "../../components/Paper.component";
import { TextField } from "../../components/TextField.component";
import { Typography } from "../../components/Typography.component";
import { Button } from "../../components/Button.component";
import { signUpApi } from "../../apis/authentication.apis";
import { useAuth } from "../../common/authentication/authentication.provider";
import { useLocation } from "react-router-dom";

export function AuthEntrancePage({ page }: { page: "signIn" | "signUp" }) {
  const location = useLocation();
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = React.useState<string>(
    location?.state?.username ?? ""
  );
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleNavigateToSignUp = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(page === "signIn" ? "signUp" : "signIn");
    },
    [navigate, page]
  );

  const handleSubmit = React.useCallback(() => {
    if (!username) {
      setErrorMessage(fm("errorMessages.usernameIsRequired"));
      return;
    }
    if (!password) {
      setErrorMessage(fm("errorMessages.passwordIsRequired"));
      return;
    }

    setErrorMessage("");
    if (page === "signIn") {
      signIn(username, password)
        .then(() => {
          navigate("home");
        })
        .catch((e) => {
          const message = e?.response?.data?.message;
          setErrorMessage(message ?? "Unknown error.");
        });
    } else {
      signUpApi(username, password)
        .then(() => {
          navigate("signIn", { state: { username } });
        })
        .catch((e) => {
          const message = e?.response?.data?.message;
          setErrorMessage(message ?? "Unknown error.");
        });
    }
  }, [username, password, navigate, page, signIn, fm]);

  const handleTextFieldsKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.code === "Enter") {
      handleSubmit();
    }
  }, [handleSubmit])

  return (
    <div className="flex min-h-screen align-middle justify-center">
      <Paper className="flex w-96 h-fit align-middle justify-center mt-24">
        <div className="flex w-[80%] mt-8 flex-col text-center">
          <Typography variant="h6">
            {page === "signIn" ? fm("common.signIn") : fm("common.signUp")}
          </Typography>

          <div className="flex mt-5 mb-5 flex-col gap-2 text-left">
            <TextField
              className="w-full"
              name="username"
              label={fm("common.username")}
              placeholder={fm("common.username")}
              value={username}
              onChange={setUsername}
              onKeyDown={handleTextFieldsKeyDown}
            />
            <TextField
              className="w-full"
              name="password"
              label={fm("common.password")}
              placeholder={fm("common.password")}
              value={password}
              onChange={setPassword}
              type="password"
              onKeyDown={handleTextFieldsKeyDown}
            />

            {errorMessage && (
              <Typography variant="body1" color="error" fontWeight={"bold"}>
                {`${fm("common.error")}: ${errorMessage}`}
              </Typography>
            )}
          </div>

          <div className="mb-2 text-left underline text-pink-400 underline-offset-1">
            <a
              href={page === "signIn" ? "sign-up" : "sign-in"}
              onClick={handleNavigateToSignUp}
            >
              {page === "signIn"
                ? fm("common.createNewAccount")
                : fm("common.alreadyHaveAccount")}
            </a>
          </div>

          <div className="flex mb-10 justify-end">
            <Button variant="contained" onClick={handleSubmit}>
              {fm("common.ok")}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

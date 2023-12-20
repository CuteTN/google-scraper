import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Select } from "./Select.component";
import { useAppTheme } from "../common/themes/Theme.context";
import { useAppI18n } from "../common/i18n/I18nProvider.context";
import { AppThemeOptions } from "../common/themes/themes/AppTheme.model";
import { Button } from "./Button.component";
import { useAuth } from "../common/authentication/authentication.provider";
import { SignInIcon, SignOutIcon } from "./Icons.components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function Navbar() {
  const { fm, allLanguages, languageId, selectLanguage } = useAppI18n();
  const { themeId, selectTheme, themes } = useAppTheme();
  const { isSignedIn, user, signOut } = useAuth();
  const [userMenuAnchorElement, setUserMenuAnchorElement] =
    React.useState<null | HTMLElement>(null);

  const handleCloseUserMenu = React.useCallback(() => {
    setUserMenuAnchorElement(null);
  }, []);

  const handleSignOut = React.useCallback(() => {
    signOut();
    handleCloseUserMenu();
  }, [handleCloseUserMenu, signOut]);

  const languageOptions = React.useMemo(() => {
    return Object.entries(allLanguages).map(([key, value]) => ({
      id: key,
      name: value.languageName,
      imgSrc: value.languageImgSrc,
    }));
  }, [allLanguages]);

  const themeItemRenderer = React.useCallback(
    (theme: AppThemeOptions) => {
      return (
        <div className="flex items-center">
          {theme.iconRenderer()}
          <span className="ml-2">{theme.nameGetter(fm)}</span>
        </div>
      );
    },
    [fm]
  );

  const languageItemRenderer = React.useCallback(
    (language: { name: string; imgSrc: string }) => {
      return (
        <div className="flex items-center">
          <img className="h-4" alt={language.name} src={language.imgSrc} />
          <span className="ml-2">{language.name}</span>
        </div>
      );
    },
    []
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex mt-2 gap-2 flex-nowrap">
        <div className="flex-1">
          <Typography
            className="hidden lg:flex flex-1 self-center whitespace-nowrap text-ellipsis"
            component="div"
            variant="h6"
          >
            🐏 Quan Tien Nghia - Google Scraper
          </Typography>
        </div>

        {isSignedIn ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setUserMenuAnchorElement(e.currentTarget as any)}
            >
              <Typography
                className="whitespace-nowrap text-ellipsis"
                component="div"
                variant="body1"
              >
                {user?.username}
              </Typography>
            </Button>
            <Menu
              anchorEl={userMenuAnchorElement}
              open={!!userMenuAnchorElement}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleSignOut}>
                <SignOutIcon className="mr-2"/>
                {fm("common.signOut")}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            href="/sign-in"
            startIcon={<SignInIcon />}
          >
            <Typography
              className="whitespace-nowrap text-ellipsis"
              component="div"
              variant="body1"
            >
              {fm("common.signIn")}
            </Typography>
          </Button>
        )}

        <Select
          label={fm("common.theme")}
          className="w-44"
          options={themes}
          value={themeId}
          valueExtractor={(theme) => theme.id}
          itemRenderer={themeItemRenderer}
          onChange={selectTheme}
        />

        <Select
          label={fm("common.language")}
          className="w-40"
          options={languageOptions}
          value={languageId}
          valueExtractor={(language) => language.id}
          itemRenderer={languageItemRenderer}
          onChange={selectLanguage}
        />
      </Toolbar>
    </AppBar>
  );
}

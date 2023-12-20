import React, { useEffect } from "react";
import { TypeUser } from "../../models/users.model";
import { signInApi } from "../../apis/authentication.apis";
import { TokenService } from "./token.service";

const AuthenticationContext = React.createContext<{
  isSignedIn: boolean;
  user: TypeUser | null;
  signIn: (username: string, password: string) => Promise<void>;
  signedInErrorMessage?: string;
}>(undefined as any);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<TypeUser | null>(null);
  const [signedInErrorMessage, setSignedInErrorMessage] = React.useState<string | undefined>();

  useEffect(() => {
    const listener = TokenService.onAccessTokenChange((newToken) => {
      if (!newToken) setUser(null);
    })

    return () => {
      TokenService.offAccessTokenChange(listener);
    }
  }, []);

  const signIn = React.useCallback(async (username: string, password: string) => {
    try {
      const res = await signInApi(username, password);
      setUser(res.data.user);
      TokenService.accessToken = res.data.accessToken;
      setSignedInErrorMessage(undefined);
    }
    catch (error: any) {
      setSignedInErrorMessage(error?.response?.message ?? "Unknown error.");
    }
  }, []);

  const contextValue = React.useMemo(() => {
    return {
      user,
      signIn,
      signedInErrorMessage,
      isSignedIn: !!user,
    }
  }, [user, signIn, signedInErrorMessage]);

  return <AuthenticationContext.Provider value={contextValue}>
    {children}
  </AuthenticationContext.Provider>
}

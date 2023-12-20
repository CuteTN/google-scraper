import React, { useEffect } from "react";
import { TypeUser } from "../../models/users.model";
import { signInApi } from "../../apis/authentication.apis";
import { TokenService } from "./token.service";
import { jwtDecode } from "jwt-decode";

const AuthenticationContext = React.createContext<{
  isSignedIn: boolean;
  user: TypeUser | null;
  signIn: (username: string, password: string) => Promise<void>;
  signedInErrorMessage?: string;
}>(undefined as any);

function decodeUserFromToken(token: string): TypeUser | null {
  if (!token) return null;

  try {
    const payload = jwtDecode(token);

    return {
      id: (payload as any).userId,
      username: (payload as any).username,
    };
  } catch {
    return null;
  }
}

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<TypeUser | null>(
    decodeUserFromToken(TokenService.accessToken)
  );
  const [signedInErrorMessage, setSignedInErrorMessage] = React.useState<
    string | undefined
  >();

  useEffect(() => {
    const listener = TokenService.onAccessTokenChange((newToken) => {
      if (newToken) setUser(decodeUserFromToken(newToken));
    });

    return () => {
      TokenService.offAccessTokenChange(listener);
    };
  }, []);

  const signIn = React.useCallback(
    async (username: string, password: string) => {
      try {
        const res = await signInApi(username, password);
        const token = res.data.accessToken;
        TokenService.accessToken = token;

        setSignedInErrorMessage(undefined);
      } catch (error: any) {
        setSignedInErrorMessage(error?.response?.message ?? "Unknown error.");
        throw error;
      }
    },
    []
  );

  const contextValue = React.useMemo(() => {
    return {
      user,
      signIn,
      signedInErrorMessage,
      isSignedIn: !!user,
    };
  }, [user, signIn, signedInErrorMessage]);

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthenticationContext);
}

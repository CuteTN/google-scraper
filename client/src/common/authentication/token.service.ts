import events from "events";

const ACCESS_TOKEN_STORAGE_KEY = "gs-access-token"

export class TokenService {
  private static accessTokenChangeEventEmitter = new events.EventEmitter();

  static onAccessTokenChange = (listener: (newToken: string) => any) => {
    this.accessTokenChangeEventEmitter.on("", listener);
    return listener;
  }

  static offAccessTokenChange = (listener: (newToken: string) => any) => {
    this.accessTokenChangeEventEmitter.off("", listener);
    return listener;
  }

  static get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? "";
  }

  static set accessToken(token: string) {
    const currentToken = this.accessToken;

    if (!token) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      if (currentToken)
        this.accessTokenChangeEventEmitter.emit("", "");
    }
    else {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      if (currentToken !== token)
        this.accessTokenChangeEventEmitter.emit("", token);
    }
  } 
}
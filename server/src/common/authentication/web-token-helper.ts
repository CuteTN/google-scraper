import jwt from "jsonwebtoken";

const JWT_SECRET_KEY: string = process.env.JWT_KEY!;

export function signJwt(
  payload: Record<string, any>,
  options?: jwt.SignOptions
): string {
  return jwt.sign(payload, JWT_SECRET_KEY, options);
}

export function extractJwt(token: string, options?: jwt.VerifyOptions) {
  let payload: jwt.JwtPayload | string | undefined = undefined;
  let error: any | undefined = undefined;
  let valid = false;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY, options);
    valid = true;
  } catch (e: any) {
    error = e;
    valid = false;
  }

  return {
    error,
    payload,
    isValid: valid,
  };
}
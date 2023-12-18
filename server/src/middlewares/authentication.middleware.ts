import { RequestHandler, Request } from "express";
import { Logger } from "../common/logger/logger";
import { extractJwt } from "../common/authentication/web-token-helper";
import { UsersRepository } from "../repositories/users.repo";

const TOKEN_PAYLOAD_SYMBOL = Symbol("token-payload");
const SIGNED_IN_USER_SYMBOL = Symbol("signed-in-user");

/**
 * logging API information
 * @param req
 * @param res
 * @param next
 */
export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split?.(" ")?.[1];
    if (!token) return res.sendStatus(401);

    const verification = extractJwt(token);
    if (!verification.isValid) {
      Logger.error("Signing in failed.", verification.error);
      return res.status(401).send({ message: "The given token is not valid." });
    }

    const user = await UsersRepository.findById(
      (verification.payload as any)!.userId
    );
    if (!user) {
      return res.status(404).send({ message: "The user is not found." });
    }

    req[TOKEN_PAYLOAD_SYMBOL] = verification.payload;
    req[SIGNED_IN_USER_SYMBOL] = user;
    next();
  } catch (e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};

export function getAuthResultFromReq(req: Request): {
  signedIn: boolean;
  userId?: string;
  user?: {
    username: string;
    id: string;
  };
} {
  const payload = req[TOKEN_PAYLOAD_SYMBOL];

  const signedIn = !!payload;
  if (!signedIn) return { signedIn: false };

  const user = req[SIGNED_IN_USER_SYMBOL];
  delete user.hashedPassword;

  return {
    signedIn: true,
    userId: payload.userId,
    user: user,
  };
}

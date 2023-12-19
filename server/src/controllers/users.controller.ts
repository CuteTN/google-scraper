import { RequestHandler, Router } from "express";
import { IController } from "./controller.interface";
import {
  hashPassword,
  verifyPassword,
} from "../common/authentication/password-helper";
import { Logger } from "../common/logger/logger";
import { UsersRepository } from "../repositories/users.repo";
import { randomUUID } from "crypto";
import { signJwt } from "../common/authentication/web-token-helper";
import {
  authMiddleware,
  getAuthResultFromReq,
} from "../middlewares/authentication.middleware";

export class UsersController implements IController {
  createRouter = () => {
    const router = Router();

    router.post("/sign-up", this.signUp);
    router.post("/sign-in", this.signIn);
    router.get("/my-info", authMiddleware, this.getSignedInAccountInfo);
    return router;
  };

  signUp: RequestHandler = async (req, res) => {
    try {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      if (!(username && password)) {
        return res
          .status(400)
          .send({ message: "Username and password is required." });
      }
      
      const existingUser = await UsersRepository.findByUsername(username)
      if (existingUser) {
        return res
          .status(400)
          .send({ message: `Username ${username} is taken` });
      }

      const hashedPassword = await hashPassword(password);
      const userId = randomUUID();

      const createdUser = await UsersRepository.create({
        id: userId,
        hashedPassword,
        username,
      });

      return res.status(200).send(createdUser);
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  signIn: RequestHandler = async (req, res) => {
    try {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      if (!(username && password)) {
        return res
          .status(400)
          .send({ message: "Username and password is required." });
      }

      const user = await UsersRepository.findByUsername(username);
      if (!user) {
        return res
          .status(404)
          .send({ message: `Username ${username} is not found.` });
      }
      if (!await verifyPassword(password, user.hashedPassword)) {
        return res
          .status(401)
          .send({ message: "The provided password is incorrect." });
      }

      const accessToken = signJwt(
        {
          userId: user.id,
          username: user.username,
        },
        { expiresIn: "1h" }
      );

      return res.status(200).send({ accessToken });
    } catch (e) {
      Logger.error(e);
      return res.sendStatus(500);
    }
  };

  getSignedInAccountInfo: RequestHandler = (req, res) => {
    const { user } = getAuthResultFromReq(req);
    return res.status(200).send(user);
  };
}

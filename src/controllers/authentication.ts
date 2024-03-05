import express from "express";
import { getUserByEmail, createUser } from "../db/user";
import { random, authentication } from "../helpers";

export const register = (async (req: express.Request, res: express.Response) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      userName,
      email,
      authentication: {
        salt: salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

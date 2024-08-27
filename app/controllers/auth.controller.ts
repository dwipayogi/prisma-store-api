import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SignUp = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, address } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address
  ) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await prisma.user
    .create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        address: address,
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the user.",
      });
    });
};

export const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const user = await prisma.user
    .findUnique({
      where: { email: email },
    })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found",
        });
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ id: user.user_id }, secretKey, {
        expiresIn: 86400, // 24 hours
      });

      res.send({
        user: user,
        accessToken: token,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while signing in the user.",
      });
    });
};


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

  const customer = await prisma.customer
    .create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        address: address,
      },
    })
    .then((customer) => {
      res.json(customer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Customer.",
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

  const customer = await prisma.customer
    .findUnique({
      where: { email: email },
    })
    .then(async (customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found",
        });
      }

      const passwordIsValid = await bcrypt.compare(password, customer.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ id: customer.customer_id }, secretKey, {
        expiresIn: 86400, // 24 hours
      });

      res.send({
        customer: customer,
        accessToken: token,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while signing in the Customer.",
      });
    });
};


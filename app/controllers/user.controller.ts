import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findMany = async (req: Request, res: Response) => {
  const user = await prisma.user
    .findMany()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving users.",
      });
    });
};

export const findOne = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user
    .findUnique({
      where: {
        user_id: id,
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while retrieving user with id ${id}.`,
      });
    });
};

export const updateCust = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, password, address, phone_number } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !phone_number
  ) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const user = await prisma.user
    .update({
      where: { user_id: id },
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: address,
        phone_number: phone_number,
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while updating user with id ${id}.`,
      });
    });
};

export const deleteCust = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const user = await prisma.user
    .delete({
      where: { user_id: id },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while deleting user with id ${id}.`,
      });
    });
};

export const addToCart = async (req: Request, res: Response) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const cartItem = await prisma.cart.findFirst({
    where: {
      user_id: user_id,
      product_id: product_id,
    },
  });

  if (cartItem) {
    const updatedCart = await prisma.cart.update({
      where: {
        cart_id: cartItem.cart_id,
      },
      data: {
        quantity: cartItem.quantity + quantity,
      },
    });
    res.json(updatedCart);
  } else {
    const newCart = await prisma.cart.create({
      data: {
        quantity: quantity,
        user_id: user_id,
        product_id: product_id,
      },
    });

    res.json(newCart);
  }
};

export const viewCart = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);

  const cart = await prisma.cart
    .findMany({
      where: {
        user_id: user_id,
      },
    })
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving cart.",
      });
    });
};

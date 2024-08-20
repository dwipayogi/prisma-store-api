import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findMany = async (req: Request, res: Response) => {
  const customer = await prisma.customer
    .findMany()
    .then((customer) => {
      res.json(customer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving customers.",
      });
    });
};

export const findOne = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const customer = await prisma.customer
    .findUnique({
      where: {
        customer_id: id,
      },
    })
    .then((customer) => {
      res.json(customer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while retrieving customer with id ${id}.`,
      });
    });
};

export const createCust = async (req: Request, res: Response) => {
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

  const customer = await prisma.customer
    .create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: address,
        phone_number: phone_number,
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

  const customer = await prisma.customer
    .update({
      where: { customer_id: id },
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: address,
        phone_number: phone_number,
      },
    })
    .then((customer) => {
      res.json(customer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while updating Customer with id ${id}.`,
      });
    });
};

export const deleteCust = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const customer = await prisma.customer
    .delete({
      where: { customer_id: id },
    })
    .then((customer) => {
      res.json(customer);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while deleting Customer with id ${id}.`,
      });
    });
};

export const addToCart = async (req: Request, res: Response) => {
  const { customer_id, product_id, quantity } = req.body;

  if (!customer_id || !product_id || !quantity) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const cartItem = await prisma.cart.findFirst({
    where: {
      customer_id: customer_id,
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
        customer_id: customer_id,
        product_id: product_id,
      },
    });

    res.json(newCart);
  }
};

export const viewCart = async (req: Request, res: Response) => {
  const customer_id = parseInt(req.params.customer_id);

  const cart = await prisma.cart
    .findMany({
      where: {
        customer_id: customer_id,
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

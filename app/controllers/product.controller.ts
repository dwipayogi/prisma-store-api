import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findMany = async (req: Request, res: Response) => {
  const product = await prisma.product
    .findMany()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving products.",
      });
    });
};

export const findOne = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product
    .findUnique({
      where: {
        product_id: id,
      },
    })
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while retrieving product with id ${id}.`,
      });
    });
};

export const createProd = async (req: Request, res: Response) => {
  const { name, description, price, stock, image_url, shop_id } = req.body;

  if (!name || !description || !price || !stock) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  const product = await prisma.product
    .create({
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        image_url: image_url,
        shop_id: shop_id,
      },
    })
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Product.",
      });
    });
};

export const updateProd = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description, price, stock } = req.body;

  const product = await prisma.product
    .update({
      where: { product_id: id },
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
      },
    })
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while updating product with id ${id}.`,
      });
    });
};

export const deleteProd = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const product = await prisma.product
    .delete({
      where: { product_id: id },
    })
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurred while deleting product with id ${id}.`,
      });
    });
};

import { Router } from "express";
import {
  findMany,
  findOne,
  createProd,
  updateProd,
  deleteProd,
} from "../controllers/product.controller";

export const ProductRouter = (app: Router) => {
  app.get("/product", findMany);
  app.get("/product/:id", findOne);
  app.post("/product/add", createProd);
  app.put("/product/update/:id", updateProd);
  app.delete("/product/delete/:id", deleteProd);
};

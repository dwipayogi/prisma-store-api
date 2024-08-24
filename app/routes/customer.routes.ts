import { Router } from "express";
import {
  findMany,
  findOne,
  updateCust,
  deleteCust,
  addToCart,
  viewCart,
} from "../controllers/customer.controller";

export const CustomerRouter = (app: Router) => {
  app.get("/customer", findMany);
  app.get("/customer/:id", findOne);
  app.put("/customer/update/:id", updateCust);
  app.delete("/customer/delete/:id", deleteCust);
  app.post("/customer/addToCart", addToCart);
  app.get("/customer/viewCart/:customer_id", viewCart);
};

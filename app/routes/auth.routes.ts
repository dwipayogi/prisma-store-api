import { Router } from "express";
import {
  SignUp,
  SignIn
} from "../controllers/auth.controller";

export const AuthRouter = (app: Router) => {
  app.post("/signup", SignUp);
  app.post("/signin", SignIn);
};
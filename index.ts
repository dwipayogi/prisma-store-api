import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// Import Route
import { CustomerRouter } from "./app/routes/customer.routes";
import { ProductRouter } from "./app/routes/product.routes";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Define Route
CustomerRouter(app);
ProductRouter(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express, { Request, Response } from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./scripts/uploadThing";

const app = express();
app.use(express.json());

// Import Route
import { CustomerRouter } from "./app/routes/user.routes";
import { ProductRouter } from "./app/routes/product.routes";
import { AuthRouter } from "./app/routes/auth.routes";

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: { 
      callbackUrl: "http://localhost:3000/api/uploadthing/imageUploader",
    },
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Define Route
CustomerRouter(app);
ProductRouter(app);
AuthRouter(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

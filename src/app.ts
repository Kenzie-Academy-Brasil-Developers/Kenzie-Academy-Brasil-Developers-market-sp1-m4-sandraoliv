import express, { Application } from "express";
import {
  createProduct,
  deleteProduct,
  listAllProducts,
  listProductById,
  updateProduct,
} from "./logic";
import {
  ensureIdExistsMiddleware,
  ensureNameExistsMiddleware,
} from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", ensureNameExistsMiddleware, createProduct);
app.get("/products", listAllProducts);
app.get("products/product/:id", ensureIdExistsMiddleware, listProductById);
app.patch(
  "products/product/:id",
  ensureIdExistsMiddleware,
  ensureNameExistsMiddleware,
  updateProduct
);
app.delete("products/product/:id", ensureIdExistsMiddleware, deleteProduct);

app.listen(3000, () => {
  console.log("server is running ");
});
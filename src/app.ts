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
  ensureThatOnlyOneNameExistsMiddleware,
} from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", ensureNameExistsMiddleware, createProduct);
app.get("/products", listAllProducts);
app.get("/products/:id", ensureIdExistsMiddleware, listProductById);
app.patch(
  "/products/:id",
  ensureIdExistsMiddleware,
  ensureThatOnlyOneNameExistsMiddleware,
  updateProduct
);
app.delete("/products/:id", ensureIdExistsMiddleware, deleteProduct);

app.listen(3000, () => {
  console.log("server is running ");
});

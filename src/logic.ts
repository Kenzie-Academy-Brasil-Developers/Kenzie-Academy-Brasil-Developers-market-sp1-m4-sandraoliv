import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const createProduct = (req: Request, res: Response): Response => {
  const data = res.locals.product.productInfo;

  const newProduct: IProduct = {
    id: new Date().getTime(),
    ...data,
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

export const listAllProducts = (req: Request, res: Response): Response => {
  return res.status(200).json(market);
};

export const listProductById = (req: Request, res: Response): Response => {
  const index = res.locals.product.productIndex;
  return res.json(market[index]);
};

export const updateProduct = (req: Request, res: Response) => {};

export const deleteProduct = (req: Request, res: Response) => {
  const index = res.locals.product.productIndex;
  market.splice(index, 1);
  return res.status(204).send();
};

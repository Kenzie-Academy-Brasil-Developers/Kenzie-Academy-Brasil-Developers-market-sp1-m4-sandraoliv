import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProductRequest } from "./interfaces";

export const ensureIdExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(req.params.id);

  const findIndex = market.findIndex((product) => product.id === id);
  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals.product = {
    productId: id,
    productIndex: findIndex,
  };
  return next();
};

export const ensureNameExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productData: IProductRequest = req.body;

  const productExists = market.some(
    (product: IProductRequest) => product.name === productData.name
  );
  if (productExists) {
    return res.status(409).json({ message: "Product already registered." });
  }

  res.locals.product = {
    productInfo: productData,
  };

  return next();
};

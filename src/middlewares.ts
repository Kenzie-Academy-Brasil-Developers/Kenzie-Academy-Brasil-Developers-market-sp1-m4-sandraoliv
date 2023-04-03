import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const ensureIdExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { id } = req.params;

  const findIndex = market.findIndex((product) => product.id === parseInt(id));
  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals.findIndex = findIndex;

  return next();
};

export const ensureNameExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productData = req.body;
  let verificationProductName;
  productData.forEach((element: IProduct) => {
    verificationProductName = market.find((product) => {
      return product.name === element.name;
    });
  });

  if (verificationProductName) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

export const ensureThatOnlyOneNameExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { name } = req.body;

  let verificationProductName = market.find((product) => {
    return product.name === name;
  });

  if (verificationProductName) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

import { Request, Response } from "express";
import { market, sequentialId } from "./database";
import { ICleaningProduct, IFoodProduct, IProduct } from "./interfaces";

export const createProduct = (req: Request, res: Response): Response => {
  const body = req.body;
  const ProductsContainer: Array<IProduct> = [];

  body.forEach((element: IFoodProduct | ICleaningProduct) => {
    const productIdCounter = sequentialId.length + 1;
    const newProduct: IProduct = {
      id: productIdCounter,
      name: element.name,
      price: element.price,
      weight: element.weight,
      calories: element.calories,
      section: element.section,
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };
    sequentialId.push(productIdCounter);
    ProductsContainer.push(newProduct);
    market.push(newProduct);
  });
  const total = market.reduce(
    (previosValue, currentValue) => previosValue + currentValue.price,
    0
  );
  const marketProducts = {
    total: total,
    marketProducts: ProductsContainer,
  };
  return res.status(201).json(marketProducts);
};

export const listAllProducts = (req: Request, res: Response): Response => {
  const total = market.reduce(
    (previosValue, currentValue) => previosValue + currentValue.price,
    0
  );
  const marketProducts = {
    total: total,
    marketProducts: market,
  };
  return res.status(200).json(marketProducts);
};

export const listProductById = (req: Request, res: Response): Response => {
  const index = res.locals.findIndex;
  return res.json(market[index]);
};

export const updateProduct = (req: Request, res: Response) => {
  const index = res.locals.findIndex;

  const newProduct = req.body;

  market[index] = {
    ...market[index],
    ...newProduct,
  };

  return res.status(200).json(market[index]);
};

export const deleteProduct = (req: Request, res: Response) => {
  const index = res.locals.findIndex;
  market.splice(index, 1);
  return res.status(204).send();
};

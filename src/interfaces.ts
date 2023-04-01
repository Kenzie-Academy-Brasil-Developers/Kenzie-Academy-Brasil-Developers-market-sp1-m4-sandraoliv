export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: " food " | "cleaning";
  expirationDate: Date;
}
export type IProductRequest = Omit<IProduct, "id" | "expirationDate">;

export interface IFoodProduct extends IProduct {
  calories: number;
}

export type ICleaningProduct = IProduct;

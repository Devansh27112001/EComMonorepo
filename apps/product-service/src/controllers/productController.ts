import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const product = await prisma.product.create({ data });
  res.status(201).json({ message: "Product created successfully" });
};
export const updateProduct = async (req: Request, res: Response) => {};
export const deleteProduct = async (req: Request, res: Response) => {};
export const getProduct = async (req: Request, res: Response) => {};
export const getProducts = async (req: Request, res: Response) => {};

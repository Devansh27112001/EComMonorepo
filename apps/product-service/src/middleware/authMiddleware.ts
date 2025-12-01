import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return response
      .status(401)
      .json({ message: "You must be signed in to access this resource." });
  }

  request.userId = userId;
  next();
};

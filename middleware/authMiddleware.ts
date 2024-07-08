import { Request, Response, NextFunction } from "express";
import {
  ApiError,
  HttpStatusCode,
  ErrorResponseBody,
} from "../entities/ApiError";
const admin = require("../config/firebaseConfig");
const jwt = require("jsonwebtoken");

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        "ebuddytestminardi" as string,
        async (err: any, decoded: any) => {
          if (err) {
            res.status(HttpStatusCode.UNAUTHORIZED).json(
              new ErrorResponseBody({
                statusCode: HttpStatusCode.UNAUTHORIZED,
                message: "Unauthorized",
              })
            );
          }
          return next();
        }
      );
    } else {
      res.status(HttpStatusCode.UNAUTHORIZED).json(
        new ErrorResponseBody({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: "Unauthorized",
        })
      );
    }
  } catch (error) {
    res.status(HttpStatusCode.UNAUTHORIZED).json(
      new ErrorResponseBody({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: "Unauthorized",
      })
    );
  }
};

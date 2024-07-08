import { Request, Response, NextFunction } from "express";
import { User } from "../../repository/userCollection";
import {
  ApiError,
  HttpStatusCode,
  ErrorResponseBody,
} from "../../entities/ApiError";
const admin = require("../../config/firebaseConfig");
const jwt = require("jsonwebtoken");

export const userController = {
  //login
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body;
      const decodeValue = await admin.auth().verifyIdToken(accessToken);
      const user = await admin.auth().getUser(decodeValue.uid);

      // find user from db firestore
      const userExist = await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      //if user not exist, create new user
      if (!userExist.exists) {
        await admin.firestore().collection("users").doc(user.uid).set({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        await admin.firestore().collection("users").doc(user.uid).update({
          name: user.displayName,
          email: user.email,
        });
      }

      const token = jwt.sign(
        { email: decodeValue.email },
        "ebuddytestminardi",
        { expiresIn: "1h" }
      );
      res.json({
        statusCode: HttpStatusCode.OK,
        message: "Login success",
        token: token,
        expiresIn: 3600,
      });
      next();
    } catch (error) {
      next(error);
    }
  },

  //fetching users data
  fetchUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      console.log("token", token);
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
          } else {
            const user: User[] = [];
            const users = await admin.firestore().collection("users").get();
            users.forEach((doc: any) => {
              user.push(doc.data());
            });
            res.json({
              statusCode: HttpStatusCode.OK,
              data: user,
            });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  },

  //updating user data
  updateUser: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const token = req?.headers?.authorization?.split(" ")[1];
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
            next();
          } else {
            const user = await admin
              .firestore()
              .collection("users")
              .doc(id)
              .get();
            if (!user.exists) {
              res.status(HttpStatusCode.NOT_FOUND).json({
                statusCode: HttpStatusCode.NOT_FOUND,
                message: "User not found",
              });
            } else {
              const newUser = {
                name: name,
                id: user.data().id,
                email: user.data().email,
              };
              await admin.firestore().collection("users").doc(id).update(newUser);
              res.json({
                statusCode: HttpStatusCode.OK,
                message: "User updated",
                user: newUser,
              });
            }
            next();
          }
        }
      );
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER,
        "Internal server error"
      );
    }
  },
};

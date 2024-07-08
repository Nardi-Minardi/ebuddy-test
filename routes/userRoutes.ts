import { userController } from "../controller/userController/userController";
import { Express } from "express";
import { apiServer } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRoutes = (app: Express) => {
  const api = new apiServer(app);

  api.post("/api/login", userController.login);
  api.get("/api/users", authMiddleware, userController.fetchUsers);
  api.put("/api/user/:id", authMiddleware, userController.updateUser);
};

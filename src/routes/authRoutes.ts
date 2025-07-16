import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { upload } from "../middlewares/upload";

const authRoutes = Router();

authRoutes.post("/register", upload.single("profilePhoto"), AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/users", AuthController.getAllUsers); // Assuming you want to add a route to get all users

export default authRoutes;
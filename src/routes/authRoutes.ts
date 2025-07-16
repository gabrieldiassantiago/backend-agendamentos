import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { upload } from "../middlewares/upload";

const authRoutes = Router();

authRoutes.post("/register", upload.single("profilePhoto"), AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/users", AuthController.getAllUsers);

export default authRoutes;
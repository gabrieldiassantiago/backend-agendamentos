import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { upload } from "../middlewares/upload";
import { validateSchema } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/authSchemas";

const authRoutes = Router();

authRoutes.post("/register", upload.single("profilePhoto"), validateSchema(registerSchema), AuthController.register);
authRoutes.post("/login", validateSchema(loginSchema), AuthController.login);

export default authRoutes;
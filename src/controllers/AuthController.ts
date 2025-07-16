import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import { uploadFileToFirebase } from "../utils/firebaseUpload";
import { LoginSchema, RegisterSchema } from "../schemas/authSchemas";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body as RegisterSchema;

    try {
      const userExists = await authService.checkUserExists(email);
      
      if (userExists) {
        return res.status(400).json({ error: "Usuario ja existe" });
      }

      let profilePhotoUrl: string | undefined;
      if (req.file) {
        profilePhotoUrl = await uploadFileToFirebase(req.file);
      }

      const user = await authService.register(name, email, password, profilePhotoUrl);
      res.status(201).json(user);

    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  // static async getAllUsers(req: Request, res: Response) {
  //   try {
  //     const users = await authService.getAllUsers();
  //     res.status(200).json(users);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginSchema;

    try {
      const token = await authService.login(email, password);
      res.status(200).json(token);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

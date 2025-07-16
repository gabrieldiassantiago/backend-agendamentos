import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import fs from 'fs';


const authService = new AuthService();



export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const filePath = req.file?.path;

    try {
      const user = await authService.register(name, email, password, filePath);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
      if (filePath &&  fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove the uploaded file if registration fails
      }
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await authService.login(email, password);
      res.status(200).json(token);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
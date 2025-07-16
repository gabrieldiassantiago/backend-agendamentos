import { AuthService } from "../services/authService";
import { Request, Response } from "express";


const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await authService.register(name, email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
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
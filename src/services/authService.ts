import * as bcript from 'bcryptjs';
import { AuthRepository } from '../repositories/authRepository';
import jwt from 'jsonwebtoken';


export class AuthService {

    private userRepo: AuthRepository

    constructor() {
        this.userRepo = new AuthRepository
    }

    async register(name: string, email: string, password: string) {

        const userExists = await this.userRepo.findByEmail(email);

        if (userExists) {
            throw new Error("Usuario ja existe");
        }

        const hashedPassword = await bcript.hash(password, 10);
        
        const user = await this.userRepo.createUser({
            name,
            email,
            password: hashedPassword
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    async login(email:string, password: string) {
      const user = await this.userRepo.findByEmail(email);

      if (!user) {
          throw new Error("Usuario nao encontrado");
      }

      const isPasswordValid = await bcript.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Senha invalida");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        return { token };
    }
}

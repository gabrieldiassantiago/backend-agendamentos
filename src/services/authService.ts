import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/authRepository';
import jwt from 'jsonwebtoken';

export class AuthService {
    private userRepo: AuthRepository

    constructor() {
        this.userRepo = new AuthRepository()
    }

    async checkUserExists(email: string): Promise<boolean> {
        const user = await this.userRepo.findByEmail(email);
        return !!user;
    }

    async register(name: string, email: string, password: string, photoUrl?: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await this.userRepo.createUser({
            name,
            email,
            password: hashedPassword,
            profilePhoto: photoUrl || "https://example.com/default-profile-photo.png"
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto
        }
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("Usuario nao encontrado");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
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

    async getAllUsers() {
        return this.userRepo.findAll();
    }
}
import { prisma } from '../prisma/client'

interface User {
    name: string;
    email: string;
    password: string;
}

export class AuthRepository {
    
    async createUser(data: User) {
        const user = await prisma.user.create({
            data
        });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    }

    async findAll() {
        const users = await prisma.user.findMany();
        return users;
    }

     
}
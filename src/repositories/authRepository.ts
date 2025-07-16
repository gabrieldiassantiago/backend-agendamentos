import { prisma } from '../prisma/client';

export class AuthRepository {
  async createUser(data: { name: string; email: string; password: string, profilePhoto?: string }) {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return await prisma.user.findMany();
  }
}

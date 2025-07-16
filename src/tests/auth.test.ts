import { AuthService } from '../services/authService';
import { AuthRepository } from '../repositories/authRepository';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../repositories/authRepository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockAuthRepository = AuthRepository as jest.MockedClass<typeof AuthRepository>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepo: jest.Mocked<AuthRepository>;

  beforeEach(() => {

    jest.clearAllMocks();
    
    mockUserRepo = new mockAuthRepository() as jest.Mocked<AuthRepository>;
    
    authService = new AuthService();
    
    // Substituir o repository privado pelo mock
    (authService as any).userRepo = mockUserRepo;
  });

  describe('register', () => {
    const mockUserData = {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123'
    };

    const mockCreatedUser = {
      id: 'user-123',
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'hashedPassword',
      profilePhoto: 'https://example.com/default-profile-photo.png',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('deve registrar um usuário com sucesso', async () => {
      // Arrange
      mockUserRepo.findByEmail.mockResolvedValue(null);
      mockBcrypt.hash.mockResolvedValue('hashedPassword' as never);
      mockUserRepo.createUser.mockResolvedValue(mockCreatedUser);

      // Act
      const result = await authService.register(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password
      );

      // Assert
      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(mockBcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(mockUserRepo.createUser).toHaveBeenCalledWith({
        name: mockUserData.name,
        email: mockUserData.email,
        password: 'hashedPassword',
        profilePhoto: 'https://example.com/default-profile-photo.png'
      });
      expect(result).toEqual({
        id: mockCreatedUser.id,
        name: mockCreatedUser.name,
        email: mockCreatedUser.email,
        profilePhoto: mockCreatedUser.profilePhoto
      });
    });

    it('deve registrar um usuário com foto personalizada', async () => {
      // Arrange
      const customPhotoUrl = 'https://firebase.com/custom-photo.jpg';
      mockUserRepo.findByEmail.mockResolvedValue(null);
      mockBcrypt.hash.mockResolvedValue('hashedPassword' as never);
      mockUserRepo.createUser.mockResolvedValue({
        ...mockCreatedUser,
        profilePhoto: customPhotoUrl
      });

      // Act
      const result = await authService.register(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password,
        customPhotoUrl
      );

      // Assert
      expect(mockUserRepo.createUser).toHaveBeenCalledWith({
        name: mockUserData.name,
        email: mockUserData.email,
        password: 'hashedPassword',
        profilePhoto: customPhotoUrl
      });
      expect(result.profilePhoto).toBe(customPhotoUrl);
    });

    it('deve lançar erro se usuário já existe', async () => {
      // Arrange
      mockUserRepo.findByEmail.mockResolvedValue(mockCreatedUser);

      // Act & Assert
      await expect(
        authService.register(mockUserData.name, mockUserData.email, mockUserData.password)
      ).rejects.toThrow('Usuario ja existe');

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(mockBcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserRepo.createUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const mockUser = {
      id: 'user-123',
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'hashedPassword',
      profilePhoto: 'https://example.com/photo.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('deve fazer login com sucesso', async () => {
      // Arrange
      const email = 'joao@email.com';
      const password = 'senha123';
      const mockToken = 'jwt-token-123';
      
      mockUserRepo.findByEmail.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(true as never);
      mockJwt.sign.mockReturnValue(mockToken as never);

      // Act
      const result = await authService.login(email, password);

      // Assert
      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith(email);
      expect(mockBcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(mockJwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );
      expect(result).toEqual({ token: mockToken });
    });

    it('deve lançar erro se usuário não existe', async () => {
      // Arrange
      mockUserRepo.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(
        authService.login('joao@email.com', 'senha123')
      ).rejects.toThrow('Usuario nao encontrado');

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('joao@email.com');
      expect(mockBcrypt.compare).not.toHaveBeenCalled();
      expect(mockJwt.sign).not.toHaveBeenCalled();
    });

    it('deve lançar erro se senha está incorreta', async () => {
      // Arrange
      mockUserRepo.findByEmail.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(false as never);

      // Act & Assert
      await expect(
        authService.login('joao@email.com', 'senhaErrada')
      ).rejects.toThrow('Senha invalida');

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('joao@email.com');
      expect(mockBcrypt.compare).toHaveBeenCalledWith('senhaErrada', mockUser.password);
      expect(mockJwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('checkUserExists', () => {
    it('deve retornar true se usuário existe', async () => {
      // Arrange
      const mockUser = { id: 'user-123', email: 'joao@email.com' };
      mockUserRepo.findByEmail.mockResolvedValue(mockUser as any);

      // Act
      const result = await authService.checkUserExists('joao@email.com');

      // Assert
      expect(result).toBe(true);
      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('joao@email.com');
    });

    it('deve retornar false se usuário não existe', async () => {
      // Arrange
      mockUserRepo.findByEmail.mockResolvedValue(null);

      // Act
      const result = await authService.checkUserExists('joao@email.com');

      // Assert
      expect(result).toBe(false);
      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('joao@email.com');
    });
  });

  describe('getAllUsers', () => {
    it('deve retornar todos os usuários', async () => {
      // Arrange
      const mockUsers = [
        { id: 'user-1', name: 'João', email: 'joao@email.com' },
        { id: 'user-2', name: 'Maria', email: 'maria@email.com' }
      ];
      mockUserRepo.findAll.mockResolvedValue(mockUsers as any);

      // Act
      const result = await authService.getAllUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(mockUserRepo.findAll).toHaveBeenCalled();
    });
  });
});
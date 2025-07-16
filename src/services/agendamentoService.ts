import { Agendamento } from '../generated/prisma';
import { AgendamentoRepository } from '../repositories/agendamentoRepository';
import { AuthRepository } from '../repositories/authRepository';
import { criarAgendamentoData } from '../types/Agendamento';

export class AgendamentoService {
  constructor(
    private agendamentoRepository: AgendamentoRepository,
    private userRepository: AuthRepository
  ) {}

  async criarAgendamento(data: Omit<criarAgendamentoData, 'userName'>): Promise<Agendamento> {
    
    const user = await this.userRepository.findById(data.userId);

    if (!user) throw new Error('Usuário não encontrado');

    return await this.agendamentoRepository.criarAgendamento({
      ...data,
      userName: user.name 
    });
  }
}

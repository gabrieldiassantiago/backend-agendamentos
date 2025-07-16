// src/controllers/AgendamentoController.ts
import { Request, Response } from 'express';
import { AgendamentoService } from '../services/agendamentoService';
import { AgendamentoRepository } from '../repositories/agendamentoRepository';
import { AuthRepository } from '../repositories/authRepository';

const agendamentoService = new AgendamentoService(
  new AgendamentoRepository(),
  new AuthRepository()
);

export class AgendamentoController {
  static async criar(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { date, titulo, descricao } = req.body;

      const agendamento = await agendamentoService.criarAgendamento({
        date: new Date(date),
        titulo,
        descricao,
        userId
      });

      res.status(201).json(agendamento);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import {authMiddleware } from '../middlewares/auth';

const agendamentosRoutes = Router();

agendamentosRoutes.post('/', authMiddleware, AgendamentoController.criar);

export default agendamentosRoutes;

import { Router } from 'express';
import {authMiddleware } from '../middlewares/auth';
import { AgendamentoController } from '../controllers/agendamentoController';

const agendamentosRoutes = Router();

agendamentosRoutes.post('/', authMiddleware, AgendamentoController.criar);

export default agendamentosRoutes;

import express from 'express';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/auth';
import agendamentosRoutes from './routes/agendamentoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/agendamentos', authMiddleware, agendamentosRoutes );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
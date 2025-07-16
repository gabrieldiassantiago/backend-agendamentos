import { prisma } from "../prisma/client";
import { Agendamento } from "../generated/prisma";
import { atualizarAgendamento, criarAgendamentoData } from "../types/Agendamento";

export class AgendamentoRepository {

    async criarAgendamento(agendamento: criarAgendamentoData): Promise<Agendamento> {
       const novoAgendamento = await prisma.agendamento.create({
            data: {
                date: agendamento.date,
                descricao: agendamento.descricao,
                userId: agendamento.userId,
                titulo: agendamento.titulo,
                userName: agendamento.userName
            }
        });
        return novoAgendamento;
    }

    async buscarAgendamentosPorUsuario(userId: string): Promise<Agendamento[]> {
        return await prisma.agendamento.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                date: 'asc'
            }
        });
    }

    async buscarAgendamentoPorId(id: number): Promise<Agendamento | null> {
        return await prisma.agendamento.findUnique({
            where: {
                id: id
            }
        });
    }

    async atualizarAgendamento(id: number, dadosAtualizacao: atualizarAgendamento): Promise<Agendamento> {
        return await prisma.agendamento.update({
            where: {
                id: id
            },
            data: dadosAtualizacao
        });
    }

    async deletarAgendamento(id: number): Promise<void> {
        await prisma.agendamento.delete({
            where: {
                id: id
            }
        });
    }

    async listarTodosAgendamentos(): Promise<Agendamento[]> {
        return await prisma.agendamento.findMany({
            orderBy: {
                date: 'asc'
            }
        });
    }
}

   



 

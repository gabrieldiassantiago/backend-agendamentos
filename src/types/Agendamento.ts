export interface criarAgendamentoData {
  date: Date;
  titulo: string;
  descricao: string;
  userId: string;
  userName: string;
}



export interface atualizarAgendamento {
    date?: Date;
    descricao?: string;
    titulo?: string;
    userName?: string;
}

export interface buscarAgendamentosPorUsuario {
    userId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    titulo?: string;
}

# Contribuindo para o Projeto

## 🤝 Como Contribuir

Obrigado por considerar contribuir para este projeto! Aqui estão algumas diretrizes para ajudar você a começar.

### 📋 Pré-requisitos

- Node.js (versão 18+)
- npm ou yarn
- Git

### 🚀 Configuração do Ambiente de Desenvolvimento

1. **Fork o repositório**
2. **Clone seu fork:**
   ```bash
   git clone https://github.com/seu-usuario/estudos-typescript.git
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Configure o banco de dados:**
   ```bash
   cp .env.example .env
   npx prisma migrate dev
   ```

### 🔀 Processo de Contribuição

1. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Faça suas alterações seguindo os padrões:**
   - Use TypeScript
   - Siga a arquitetura em camadas existente
   - Adicione testes para novas funcionalidades
   - Mantenha o código limpo e bem documentado

3. **Execute os testes:**
   ```bash
   npm test
   ```

4. **Commit suas mudanças:**
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```

5. **Push para sua branch:**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abra um Pull Request**

### 📝 Padrões de Código

- **TypeScript**: Use tipagem estrita
- **ESLint**: Siga as regras configuradas
- **Prettier**: Formate o código automaticamente
- **Commits**: Use conventional commits

### 🐛 Reportando Bugs

Para reportar um bug, abra uma issue incluindo:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Informações do ambiente (OS, Node.js version)

### 💡 Sugestões de Features

Para sugerir novas funcionalidades:
- Abra uma issue com o label "enhancement"
- Descreva claramente a funcionalidade
- Explique por que seria útil
- Sugira uma implementação se possível

### 🏗️ Arquitetura do Projeto

```
src/
├── controllers/    # Controladores HTTP
├── services/      # Lógica de negócio
├── repositories/  # Acesso a dados
├── routes/        # Definição de rotas
├── types/         # Tipos TypeScript
└── prisma/        # Cliente Prisma
```

### ✅ Checklist para Pull Requests

- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem conflitos com a branch main
- [ ] Mensagem de commit clara

### 🎯 Áreas para Contribuição

- **Autenticação**: Melhorias no sistema de auth
- **Validação**: Adicionar validação robusta
- **Testes**: Aumentar cobertura de testes
- **Documentação**: Melhorar documentação
- **Performance**: Otimizações de performance

### 📚 Recursos Úteis

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### 📞 Ajuda

Se precisar de ajuda, sinta-se à vontade para:
- Abrir uma issue com sua dúvida
- Entrar em contato através do GitHub

Obrigado por contribuir! 🚀

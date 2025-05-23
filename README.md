# 📚 Sistema de Cadastro e Notas de Alunos

Este é um sistema web completo para **cadastrar alunos**, **registrar notas por disciplina**, **visualizar médias** e **gerenciar** os dados dos estudantes. Utiliza uma **API RESTful** sem banco de dados real, com dados armazenados em memória ou via JSON Server. A interface é feita com **HTML, CSS simples e JavaScript puro**.

---

## ✨ Funcionalidades

- ✅ Cadastro de novos alunos
- ✅ Listagem de todos os alunos com média
- ✅ Registro de notas por disciplina
- ✅ Visualização de detalhes e histórico de notas
- ✅ Edição e exclusão de alunos
- ✅ Validação de disciplinas com lista fixa

---

## 🚀 Deploys

- 🔗 Backend (Render): [https://api-nota-faculdade.onrender.com/docs/](https://api-nota-faculdade.onrender.com/docs/)
- 🌐 Frontend (Vercel): [https://api-nota-faculdade.vercel.app](https://api-nota-faculdade.vercel.app)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black&style=for-the-badge)

---

## 📁 Estrutura do Projeto

```
API-NOTA-FACULDADE/
│
├── backend/                 # Código do servidor Node.js
│   ├── index.js             # Arquivo principal da API (Express)
│   ├── package.json         # Configurações e dependências do Node
│   └── package-lock.json    # Versões exatas das dependências
│
├── frontend/                # Interface do usuário
│   ├── index.html           # Página principal com os formulários
│   ├── scripts.js           # Lógica JavaScript (interações, fetch, etc.)
│   └── style.css            # Estilos básicos da interface
│
├── .gitignore               # Arquivos/formatos ignorados pelo Git
└── README.md                # Documentação do projeto

```

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git https://github.com/JackCoder0/api-nota-faculdade.git
```

### 2. Instalar o projeto na máquina

```bash
cd .\backend\
npm install
```

### 3. Rodar o backend

```bash
npm run start
```

A API estará disponível em: `http://localhost:3000`

### 4. Abrir o frontend

Abra o arquivo `index.html` no navegador ou use uma extensão como "Live Server" no VS Code.

---

## 📄 Endpoints da API

| Método | Endpoint                     | Descrição                      |
|--------|------------------------------|--------------------------------|
| GET    | `/students`                  | Lista todos os alunos          |
| GET    | `/students/:id`              | Retorna um aluno pelo ID       |
| POST   | `/students`                  | Cria um novo aluno             |
| PUT    | `/students/:id`              | Atualiza os dados de um aluno  |
| DELETE | `/students/:id`              | Remove um aluno                |
| POST   | `/students/:id/grades`       | Registra nota de disciplina    |
| GET    | `/subjects`                  | Lista de disciplinas permitidas|

---

## 🧪 Exemplo de `aluno`

```json
{
  "id": 1,
  "name": "Nome do Aluno",
  "email": "email@gmail.com",
  "matricula": "00000000",
  "grades": [
    {
      "subject": "História",
      "grade": 10
    },
    {
      "subject": "Geografia",
      "grade": 5
    },
    {
      "subject": "Artes",
      "grade": 10
    },
    {
      "subject": "Geografia",
      "grade": 7
    },
    {
      "subject": "Português",
      "grade": 8
    }
  ],
  "average": 8
}
```

---

## 🙋‍♀️ Contribuindo

Contribuições são bem-vindas!  
Para isso:

1. Faça um fork do projeto
2. Crie uma branch com sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha nova funcionalidade'`)
4. Push para sua branch (`git push origin minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

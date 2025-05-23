const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Notas de Alunos",
      version: "1.0.0",
      description: "Documentação da API para gerenciamento de alunos e notas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let students = [];
let currentId = 1;

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Lista todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 */
app.get("/students", (req, res) => {
  res.json(students);
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 */
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  student ? res.json(student) : res.status(404).json({ error: "Aluno não encontrado" });
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Cria um novo aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               matricula:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno criado
 */
app.post("/students", (req, res) => {
  const { name, email, matricula } = req.body;
  const newStudent = { id: currentId++, name, email, matricula, grades: [] };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza os dados de um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               matricula:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 */
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    const { name, email, matricula } = req.body;
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.matricula = matricula ?? student.matricula;
    res.json(student);
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Aluno removido
 *       404:
 *         description: Aluno não encontrado
 */
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    students.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
});

/**
 * @swagger
 * /students/{id}/grades:
 *   post:
 *     summary: Registra uma nota para um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Nota registrada e média atualizada
 *       404:
 *         description: Aluno não encontrado
 */
app.post("/students/:id/grades", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Aluno não encontrado" });

  const { subject, grade } = req.body;
  student.grades.push({ subject, grade });

  const average = student.grades.reduce((acc, g) => acc + g.grade, 0) / student.grades.length;
  student.average = parseFloat(average.toFixed(2));

  res.json(student);
});

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Lista todas as disciplinas disponíveis
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 */
app.get("/subjects", (req, res) => {
  const subjects = [
    "Matemática",
    "Português",
    "História",
    "Geografia",
    "Ciências",
    "Inglês",
    "Educação Física",
    "Artes"
  ];

  res.json(subjects);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger em: http://localhost:${PORT}/docs`);
});

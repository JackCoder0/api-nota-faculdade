const API_URL = "http://localhost:3000";

// CADASTRAR NOVO ALUNO
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const matricula = document.getElementById("matricula").value;
  const email = document.getElementById("email").value;

  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, matricula, email })
    });

    if (!response.ok) throw new Error("Erro ao cadastrar aluno");

    alert("Aluno cadastrado!");
    document.getElementById("form-cadastro").reset();
    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar aluno.");
  }
});

// LISTAR ALUNOS
async function carregarAlunos() {
  try {
    const response = await fetch(`${API_URL}/students`);
    const alunos = await response.json();
    const tbody = document.getElementById("lista-alunos");
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${aluno.name}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.email}</td>
        <td>${aluno.average ?? '-'}</td>
        <td>
          <button onclick="verDetalhes(${aluno.id})">Detalhes</button>
          <button onclick="editarAluno(${aluno.id})">Editar</button>
          <button onclick="excluirAluno(${aluno.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
  }
}
// REGISTRAR NOTA
document.getElementById("form-nota").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("student-id").value;
  const subject = document.getElementById("subject").value;
  const grade = parseFloat(document.getElementById("grade").value);

  try {
    const response = await fetch(`${API_URL}/students/${id}/grades`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, grade })
    });

    if (!response.ok) throw new Error("Erro ao registrar nota");

    const data = await response.json();
    alert(`Nota registrada! Nova média: ${data.average}`);
    document.getElementById("form-nota").reset();
    carregarAlunos();
    verDetalhes(id);
  } catch (error) {
    console.error(error);
    alert("Erro ao registrar nota.");
  }
});

// VER DETALHES DO ALUNO
async function verDetalhes(id) {
  try {
    const response = await fetch(`${API_URL}/students/${id}`);
    const aluno = await response.json();

    document.getElementById("detalhes-aluno").style.display = "block";
    document.getElementById("info-aluno").innerText = `Nome: ${aluno.name}\nMédia: ${aluno.average ?? '-'}`;

    const ul = document.getElementById("lista-notas");
    ul.innerHTML = "";
    aluno.grades.forEach(g => {
      const li = document.createElement("li");
      li.textContent = `${g.subject}: ${g.grade}`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar detalhes do aluno:", error);
  }
}
// EXCLUIR ALUNO
async function excluirAluno(id) {
  if (!confirm("Deseja excluir este aluno?")) return;

  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error();

    alert("Aluno excluído!");
    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir aluno.");
  }
}

// EDITAR ALUNO
async function editarAluno(id) {
  const nome = prompt("Novo nome:");
  const email = prompt("Novo e-mail:");
  const matricula = prompt("Nova matrícula:");

  if (!nome || !email || !matricula) return alert("Todos os campos são obrigatórios!");

  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, email, matricula })
    });

    if (!response.ok) throw new Error("Erro ao atualizar aluno");

    alert("Aluno atualizado!");
    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar aluno.");
  }
}

// CARRREGAR DISCIPLINAS
async function carregarDisciplinas() {
  const subjectSelect = document.getElementById("subject");
  try {
    const response = await fetch(`${API_URL}/subjects`);
    const subjects = await response.json();

    subjectSelect.innerHTML = "<option value=''>Selecione uma disciplina</option>";
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectSelect.appendChild(option);
    });
  } catch (error) {
    subjectSelect.innerHTML = "<option value=''>Erro ao carregar</option>";
    console.error("Erro ao carregar disciplinas:", error);
  }
}

// Inicializa
carregarAlunos();
carregarDisciplinas();
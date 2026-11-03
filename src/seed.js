import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { Aluno } from "./models/Aluno.js";

const alunosIniciais = [
  {
    ra: "1",
    nome: "João",
    disciplinas: [
      { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
      { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
    ],
  },
  {
    ra: "2",
    nome: "Maria",
    disciplinas: [
      { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
    ],
  },
  {
    ra: "3",
    nome: "Pedro",
    disciplinas: [
      { codigo: "POR101", nome: "Português", professor: "Prof. Beatriz" },
    ],
  },
];

try {
  await connectDatabase();
  await Aluno.init();
  for (const aluno of alunosIniciais) {
    await Aluno.updateOne(
      { ra: aluno.ra },
      { $setOnInsert: aluno },
      { upsert: true, runValidators: true },
    );
  }
  console.log(
    `Carga inicial concluída. Total de alunos: ${await Aluno.countDocuments()}`,
  );
} catch {
  console.error(
    "Falha na carga inicial. Verifique a configuração e o acesso ao MongoDB.",
  );
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}

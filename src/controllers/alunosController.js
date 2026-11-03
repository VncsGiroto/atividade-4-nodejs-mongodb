import { Aluno } from "../models/Aluno.js";
import { HttpError } from "../middlewares/errors.js";
import {
  validateBody,
  requiredText,
  parseDisciplinas,
} from "../middlewares/validation.js";

export async function findAluno(ra) {
  const aluno = await Aluno.findOne({ ra });
  if (!aluno) throw new HttpError(404, "Aluno não encontrado");
  return aluno;
}

export async function listar(req, res) {
  const filtro = {};
  if (req.query.nome !== undefined) {
    const nome = requiredText(req.query.nome, "Filtro nome");
    // Tratar a pesquisa como texto literal, não como expressão regular do usuário.
    filtro.nome = {
      $regex: nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    };
  }
  if (req.query.disciplina !== undefined) {
    filtro["disciplinas.codigo"] = requiredText(
      req.query.disciplina,
      "Filtro disciplina",
    );
  }
  res.status(200).json(await Aluno.find(filtro).sort({ ra: 1 }));
}

export async function buscar(req, res) {
  res.status(200).json(await findAluno(req.params.ra));
}

export async function cadastrar(req, res) {
  validateBody(req.body, ["ra", "nome", "disciplinas"]);
  const aluno = await Aluno.create({
    ra: requiredText(req.body.ra, "RA"),
    nome: requiredText(req.body.nome, "Nome"),
    disciplinas: parseDisciplinas(req.body.disciplinas),
  });
  res
    .location(`/alunos/${encodeURIComponent(aluno.ra)}`)
    .status(201)
    .json(aluno);
}

export async function atualizar(req, res) {
  validateBody(req.body, ["nome"]);
  const nome = requiredText(req.body.nome, "Nome");
  const aluno = await Aluno.findOneAndUpdate(
    { ra: req.params.ra },
    { $set: { nome } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!aluno) throw new HttpError(404, "Aluno não encontrado");
  res.status(200).json(aluno);
}

export async function excluir(req, res) {
  const aluno = await Aluno.findOneAndDelete({ ra: req.params.ra });
  if (!aluno) throw new HttpError(404, "Aluno não encontrado");
  res
    .status(200)
    .json({ mensagem: "Aluno e suas disciplinas excluídos com sucesso" });
}

export async function resumo(req, res) {
  const aluno = await findAluno(req.params.ra);
  res.status(200).json({
    ra: aluno.ra,
    nome: aluno.nome,
    totalDisciplinas: aluno.disciplinas.length,
    professores: [...new Set(aluno.disciplinas.map((d) => d.professor))],
  });
}

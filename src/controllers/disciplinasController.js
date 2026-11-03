import { Aluno } from "../models/Aluno.js";
import { findAluno } from "./alunosController.js";
import { HttpError } from "../middlewares/errors.js";
import {
  validateBody,
  requiredText,
  parseDisciplina,
} from "../middlewares/validation.js";

export async function listar(req, res) {
  const aluno = await findAluno(req.params.ra);
  res.status(200).json(aluno.disciplinas);
}

export async function adicionar(req, res) {
  const disciplina = parseDisciplina(req.body);
  // O predicado e o $push são atômicos no documento: duas requisições
  // concorrentes não conseguem inserir o mesmo código para este aluno.
  const aluno = await Aluno.findOneAndUpdate(
    {
      ra: req.params.ra,
      "disciplinas.codigo": { $ne: disciplina.codigo },
    },
    { $push: { disciplinas: disciplina } },
    { returnDocument: "after", runValidators: true },
  );
  if (!aluno) {
    await findAluno(req.params.ra);
    throw new HttpError(409, "Disciplina já cadastrada para este aluno");
  }
  res.status(201).json(disciplina);
}

export async function atualizar(req, res) {
  validateBody(req.body, ["nome", "professor"]);
  const nome = requiredText(req.body.nome, "Nome da disciplina");
  const professor = requiredText(req.body.professor, "Professor");
  const aluno = await Aluno.findOneAndUpdate(
    {
      ra: req.params.ra,
      "disciplinas.codigo": req.params.codigo,
    },
    {
      $set: {
        "disciplinas.$.nome": nome,
        "disciplinas.$.professor": professor,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!aluno) {
    await findAluno(req.params.ra);
    throw new HttpError(404, "Disciplina não encontrada");
  }
  res
    .status(200)
    .json(aluno.disciplinas.find((d) => d.codigo === req.params.codigo));
}

export async function excluir(req, res) {
  const aluno = await Aluno.findOneAndUpdate(
    {
      ra: req.params.ra,
      "disciplinas.codigo": req.params.codigo,
    },
    { $pull: { disciplinas: { codigo: req.params.codigo } } },
    { returnDocument: "after" },
  );
  if (!aluno) {
    await findAluno(req.params.ra);
    throw new HttpError(404, "Disciplina não encontrada");
  }
  res.status(200).json({ mensagem: "Disciplina excluída com sucesso" });
}

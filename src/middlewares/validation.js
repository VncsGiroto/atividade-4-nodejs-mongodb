import { HttpError } from "./errors.js";

export function validateBody(body, allowed) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "O corpo deve ser um objeto JSON");
  }
  const unknown = Object.keys(body).filter((key) => !allowed.includes(key));
  if (unknown.length)
    throw new HttpError(400, `Campos não permitidos: ${unknown.join(", ")}`);
}

export function requiredText(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new HttpError(
      400,
      `${label} é obrigatório e deve ser uma string não vazia`,
    );
  }
  return value.trim();
}

export function parseDisciplina(body) {
  validateBody(body, ["codigo", "nome", "professor"]);
  return {
    codigo: requiredText(body.codigo, "Código"),
    nome: requiredText(body.nome, "Nome da disciplina"),
    professor: requiredText(body.professor, "Professor"),
  };
}

export function parseDisciplinas(value = []) {
  if (!Array.isArray(value))
    throw new HttpError(400, "Disciplinas deve ser um array");
  const disciplinas = value.map(parseDisciplina);
  if (new Set(disciplinas.map((d) => d.codigo)).size !== disciplinas.length) {
    throw new HttpError(
      409,
      "Disciplina com código repetido para o mesmo aluno",
    );
  }
  return disciplinas;
}

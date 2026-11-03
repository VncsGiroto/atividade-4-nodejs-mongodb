import mongoose from "mongoose";

const disciplinaSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, trim: true },
    nome: { type: String, required: true, trim: true },
    professor: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const alunoSchema = new mongoose.Schema(
  {
    ra: { type: String, required: true, trim: true, unique: true },
    nome: { type: String, required: true, trim: true },
    disciplinas: {
      type: [disciplinaSchema],
      default: [],
      validate: {
        validator: (disciplinas) =>
          new Set(disciplinas.map((d) => d.codigo)).size === disciplinas.length,
        message: "Um aluno não pode possuir disciplinas com códigos repetidos",
      },
    },
  },
  {
    collection: "alunos",
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

export const Aluno = mongoose.model("Aluno", alunoSchema);

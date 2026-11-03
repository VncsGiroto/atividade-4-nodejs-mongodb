import { Router } from "express";
import * as alunos from "../controllers/alunosController.js";
import * as disciplinas from "../controllers/disciplinasController.js";

export const alunosRoutes = Router();

alunosRoutes.get("/", alunos.listar);
alunosRoutes.post("/", alunos.cadastrar);
alunosRoutes.get("/:ra/resumo", alunos.resumo);
alunosRoutes.get("/:ra/disciplinas", disciplinas.listar);
alunosRoutes.post("/:ra/disciplinas", disciplinas.adicionar);
alunosRoutes.put("/:ra/disciplinas/:codigo", disciplinas.atualizar);
alunosRoutes.delete("/:ra/disciplinas/:codigo", disciplinas.excluir);
alunosRoutes.get("/:ra", alunos.buscar);
alunosRoutes.put("/:ra", alunos.atualizar);
alunosRoutes.delete("/:ra", alunos.excluir);

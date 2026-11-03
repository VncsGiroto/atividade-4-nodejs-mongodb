import express from "express";
import { alunosRoutes } from "./routes/alunosRoutes.js";
import { errorHandler } from "./middlewares/errors.js";

export const app = express();
app.disable("x-powered-by");
app.set("query parser", "simple");
app.use(express.json({ limit: "100kb" }));
app.use("/alunos", alunosRoutes);
app.use((_req, res) => res.status(404).json({ erro: "Rota não encontrada" }));
app.use(errorHandler);

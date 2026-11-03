import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { Aluno } from "./models/Aluno.js";

try {
  await connectDatabase();
  await Aluno.init();
  const port = Number(process.env.PORT || 3000);
  const server = app.listen(port, () => {
    console.log("API disponível em http://localhost:" + port);
  });
  server.on("error", async () => {
    console.error("Não foi possível iniciar o servidor. Verifique a porta.");
    await disconnectDatabase();
    process.exitCode = 1;
  });
} catch {
  console.error("Não foi possível conectar ao MongoDB. Verifique o .env e o acesso ao banco.");
  await disconnectDatabase();
  process.exitCode = 1;
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(error, _req, res, _next) {
  if (error.code === 11000)
    return res.status(409).json({ erro: "RA já cadastrado" });
  if (error.type === "entity.parse.failed")
    return res.status(400).json({ erro: "JSON inválido" });
  if (error.type === "entity.too.large")
    return res.status(400).json({ erro: "Corpo da requisição muito grande" });
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      erro: "Dados inválidos. Verifique os campos obrigatórios e seus tipos",
    });
  }
  if (error instanceof HttpError)
    return res.status(error.status).json({ erro: error.message });
  // Não expor conexão, credenciais ou stack trace na resposta.
  console.error("Falha interna:", error.name);
  return res.status(500).json({ erro: "Erro interno do servidor" });
}

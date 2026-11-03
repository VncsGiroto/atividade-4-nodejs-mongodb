# API de alunos e disciplinas

Atividade de Node.js, Express e MongoDB. Os alunos e suas disciplinas são armazenados na coleção alunos.

## Executar

Requisitos: Node.js 22 ou superior e MongoDB local ou Atlas.

```powershell
npm install
Copy-Item .env.example .env
```

Se já tiver um .env configurado, mantenha o arquivo existente. Configure nele:

```dotenv
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=escola
```

Para usar Atlas, substitua MONGODB_URI pela conexão do cluster. Configure um usuário com acesso ao banco e libere seu IP no Atlas. Para MongoDB local, mantenha o serviço em execução.

```powershell
npm run seed
npm start
```

Acesse http://localhost:3001/alunos. O comando seed cadastra três alunos iniciais, sem duplicar ou sobrescrever os que já existem. Para desenvolvimento, pode usar npm run dev.

## Rotas

| Método | Rota | Função |
| --- | --- | --- |
| GET | /alunos | Listar alunos |
| GET | /alunos/:ra | Buscar aluno |
| GET | /alunos/:ra/disciplinas | Listar disciplinas |
| GET | /alunos?nome=João | Filtrar por parte do nome, sem diferenciar maiúsculas |
| POST | /alunos | Cadastrar aluno |
| PUT | /alunos/:ra | Atualizar nome do aluno |
| DELETE | /alunos/:ra | Excluir aluno e suas disciplinas |
| POST | /alunos/:ra/disciplinas | Adicionar disciplina |
| PUT | /alunos/:ra/disciplinas/:codigo | Atualizar nome e professor da disciplina |
| DELETE | /alunos/:ra/disciplinas/:codigo | Excluir disciplina |
| GET | /alunos?disciplina=MAT101 | Filtrar por disciplina |
| GET | /alunos/:ra/resumo | Retornar RA, nome, total de disciplinas e professores distintos |

Envie os corpos como JSON. Exemplo para cadastrar aluno:

```json
{
  "ra": "4",
  "nome": "Ana",
  "disciplinas": [
    { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" }
  ]
}
```

Para atualizar aluno, envie apenas nome. Para adicionar disciplina, envie codigo, nome e professor. Para atualizar disciplina, envie apenas nome e professor.

Status: **200** para consultas, atualizações e exclusões; **201** para cadastros; **400** para dados inválidos; **404** para registros inexistentes; **409** para duplicidades. Erros retornam JSON com o campo erro.

## Evidências e entrega

Teste as rotas no Postman ou Thunder Client com a API ligada e a carga inicial feita.

Os 22 prints do Postman estão em evidencias/sucesso (12 imagens) e evidencias/erros (10 imagens), com os nomes pedidos no enunciado. Eles mostram método, URL, corpo quando houver, status e resposta JSON.

A explicação da implementação está em [RESPOSTA_TECNICA.md](RESPOSTA_TECNICA.md). A pergunta presencial não foi informada no enunciado.

Envie o projeto e as evidências ao GitHub e entregue o link na disciplina. Não publique .env, credenciais ou node_modules; esses arquivos estão no .gitignore.

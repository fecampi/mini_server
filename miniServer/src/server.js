import http from 'node:http';
import { json } from './middlewares/json.js';
import { extractQueryParams } from './utils/extractQueryParams.js'
import { clientTest } from './clientTeste.js';
import { routes } from './routes.js'

const TEST = false;

/**
 * Response Status Codes
 *
 * 200 OK: Indica que a solicitação foi bem-sucedida.
 * 201 Created: Indica que a solicitação foi bem-sucedida e resultou na criação de um novo recurso.
 * 400 Bad Request: Indica que a solicitação do cliente não pôde ser entendida pelo servidor devido a sintaxe inválida, estrutura malformada ou outros erros do cliente.
 * 401 Unauthorized: Indica que o cliente deve se autenticar para obter a resposta solicitada.
 * 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
 * 500 Internal Server Error: Indica que ocorreu um erro interno no servidor enquanto processava a solicitação do cliente.
 */

/**
 * Função para criar um servidor HTTP.
 *
 * @param {IncomingMessage} req - Objeto de requisição recebido pelo servidor.
 * @param {ServerResponse} res - Objeto de resposta enviado pelo servidor.
 */
const server = http.createServer(async (req, res) => {
  // Obtendo o método HTTP e a URL da requisição.
  const { method, url } = req;


 console.log("AKI",req)
  //-  Middlewares
  // Funções que interceptam e manipulam a requisição e a resposta de uma rota
  await json(req, res);


  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {

    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }


  // Respondendo com 404 Not Found caso a rota não exista
  return res.writeHead(404).end();
});

// O servidor escuta na porta 3333.
server.listen(3333, () => {
  TEST && clientTest();
});

import { RequestHandler } from './utils/RequestHandler.js';

// Simulação de cliente
export async function clientTest() {
  console.log('Iniciando simulação...');

  // POST
  const postResponse = await RequestHandler.post(
    'http://localhost:3333/users',
    { name: 'John Doe', email: 'johndoe@example.com' }
  );
  if (postResponse === null) {
    console.error('Erro na requisição POST. Abortando simulação.');
    return;
  }

  // GET
  const getResponse = await RequestHandler.get('http://localhost:3333/users');
  if (getResponse === null) {
    console.error('Erro na requisição GET. Abortando simulação.');
    return;
  }
  console.log(getResponse);
}

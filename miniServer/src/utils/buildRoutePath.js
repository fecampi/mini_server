/**
 * Constrói uma expressão regular para fazer match com um caminho de rota.
 * @param {string} path O caminho da rota com parâmetros.
 * @returns {RegExp} Expressão regular para o caminho da rota.
 */
export function buildRoutePath(path) {
    // Expressão regular para encontrar parâmetros no formato ':nomeDoParametro'
    const routeParametersRegex = /:([a-zA-Z]+)/g;

    // Substitui os parâmetros da rota por padrões de regex para capturar valores válidos.
    // Por exemplo, ':id' seria substituído por '(?<id>[a-z0-9\-_]+)'
    const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');


    const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

    // Retorna a expressão regular construída.
    return pathRegex;
}

// Função para imprimir os resultados do teste
function testBuildRoutePath(path) {
    console.log(`Path: ${path}`);
    const regex = buildRoutePath(path);
    console.log(`Regular Expression: ${regex}`);
    console.log('---');
  }
  
  // Teste 1: Caminho da rota com parâmetros simples
  testBuildRoutePath('/user/:id/profile');
  
  // Teste 2: Caminho da rota com parâmetros complexos
  testBuildRoutePath('/product/:category/:id');
  
  // Teste 3: Caminho da rota sem parâmetros
  testBuildRoutePath('/about');
  
  // Adicione mais testes conforme necessário
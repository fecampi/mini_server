//Middlewares

/**
 * Processa o corpo de uma requisição HTTP e retorna o conteúdo como um objeto JavaScript.
 * @param {http.IncomingMessage} req - O objeto de requisição HTTP.
 * @returns {Promise<object>} O conteúdo do corpo da requisição como um objeto JavaScript.
 */
export async function json(req, res) {
    // Inicializa um array para armazenar os chunks do corpo da requisição.
    const buffers = [];
  
    // Itera sobre os chunks do corpo da requisição e os armazena no array 'buffers'.
    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    // Tenta analisar os buffers como uma string JSON e retornar o objeto resultante.
    try {
      // Concatena os buffers em uma única string e a converte para um objeto JSON.
      req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
      // Retorna null caso ocorra um erro no parsing do JSON.
      req.body = null;
    }
    // Cabeçalhos (Requisição/resposta) => Metadados
    res.setHeader('Content-type', 'application/json');
  }
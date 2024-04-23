export class RequestHandler {
    /**
     * Realiza uma requisição POST para a URL especificada com os dados fornecidos.
     * @param {string} url - A URL completa da rota, incluindo o hostname e a porta.
     * @param {object} data - O objeto a ser enviado no corpo da requisição POST.
     * @returns {Promise<object>} - Uma promessa que resolve com um objeto contendo os dados da resposta da requisição POST, ou com um objeto contendo uma mensagem de erro se houver um erro.
     */
    static async post(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          return { error: `Erro na requisição POST: ${response.status}` };
        }
  
        return { data: await response.json() };
      } catch (error) {
        return { error: `Erro na requisição POST: ${error.message}` };
      }
    }
  
    /**
     * Realiza uma requisição GET para a URL especificada.
     * @param {string} url - A URL completa da rota, incluindo o hostname e a porta.
     * @returns {Promise<object>} - Uma promessa que resolve com um objeto contendo os dados da resposta da requisição GET, ou com um objeto contendo uma mensagem de erro se houver um erro.
     */
    static async get(url) {
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          return { error: `Erro na requisição GET: ${response.status}` };
        }
  
        return { data: await response.json() };
      } catch (error) {
        return { error: `Erro na requisição GET: ${error.message}` };
      }
    }
  }
  
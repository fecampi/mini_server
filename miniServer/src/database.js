import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

/**
 * Classe para gerenciar um banco de dados simulado.
 */
export class Database {
  #database = {}; // Objeto privado para armazenar os dados do banco de dados.
  databasePath; 


  /**
   * Cria uma nova instância do Database e carrega os dados do arquivo JSON.
   * Se o arquivo não existir, o banco de dados será vazio.
   * @param {string} databasePath - O caminho relativo do arquivo JSON do banco de dados.
   */
  constructor(databasePath,) {
    this.databasePath = databasePath; 
    this.#initializeDatabase();
  }

  /**
   * Inicializa ou carrega os dados do arquivo JSON do banco de dados.
   * Se o arquivo não existir, o banco de dados será vazio.
   * @private
   */

  async #initializeDatabase() {
    try {
      this.#database = await this.#readDatabaseFile();
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.#writeDatabaseFile();
      }
    }
  }
  /**
   * Lê o arquivo JSON do banco de dados e retorna os dados.
   * @returns {Object} - Dados do banco de dados.
   * @throws {Error} - Se houver um erro ao ler o arquivo.
   * @private
   */
  async #readDatabaseFile() {
    const data = await fs.readFile(this.databasePath, 'utf8');
    return JSON.parse(data);
  }

  /**
   * Persiste os dados do banco de dados no arquivo JSON.
   * @private
   */
  #writeDatabaseFile() {
    fs.writeFile(this.databasePath, JSON.stringify(this.#database));
  }

  /**
   * Retorna os dados da tabela especificada.
   * @param {string} table - Nome da tabela.
   * @returns {Array} - Dados da tabela especificada.
   */
  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
  }

  /**
   * Insere dados na tabela especificada.
   * @param {string} table - Nome da tabela.
   * @param {object} data - Dados a serem inseridos na tabela.
   * @returns {object} - Dados inseridos na tabela.
   */
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#writeDatabaseFile();
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#writeDatabaseFile();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#writeDatabaseFile();
    }
  }
}

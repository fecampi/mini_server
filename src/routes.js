import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/buildRoutePath.js'

import { Database } from './database.js';

const databasePatch = new URL('../db.json', import.meta.url);
const database = new Database(databasePatch);

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;
      console.log("aki")
      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email,
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end();
    },
  },
];

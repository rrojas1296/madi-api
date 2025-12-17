import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from 'src/config/db.config';

@Injectable()
export class KnexService {
  readonly client: Knex;

  constructor() {
    this.client = knex({
      client: 'pg',
      connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      },
    });
  }
}

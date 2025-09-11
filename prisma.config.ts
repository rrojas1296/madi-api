import path from 'path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schemas'),

  migrations: {
    path: path.join('prisma', 'migrations'),
  },
});

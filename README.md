# SuperSet

## What's inside?

This [Turborepo](https://turbo.build/) monorepo contains the following:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `database`: a [Prisma](https://prisma.io/) ORM wrapper for database access and management
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

- [Docker Compose](https://docs.docker.com/compose/) for local database
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [TypeScript](https://www.typescriptlang.org/) for static type checking

### Database

This project uses [Prisma](https://prisma.io/) to access and manage the database. Docker Compose is used to create and run a PostgreSQL server locally, which is used during development to limit read/write operations to the production database hosted on [Neon](https://neon.tech/).

```bash
cd superset
docker-compose up -d
```

Once deployed, copy the `.env.example` file to `.env` so that Prisma can access the `DATABASE_URL` environment variable.

```bash
cp .env.example .env
```

> 💡 Please visit this [page](https://www.prisma.io/docs/guides/development-environment/environment-variables/using-multiple-env-files) to learn how to configure Prisma to use multiple `.env` files.

To create and deploy migrations to the database, use [Prisma Migrate](https://www.prisma.io/migrate):

```bash
pnpm turbo db:migrate:dev
```

To push any existing migrations to the database, use one of the following commands:

```bash
pnpm turbo db:push

# OR

pnpm turbo db:migrate:deploy
```

> 💡 Please visit this [page](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate) to learn about the diferrences between `db push` and `db migrate:deploy`.

This project seeds the database by using Prisma's [seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

```bash
pnpm turbo db:seed
```

### Build

To build all of the apps and packages in this monorepo, run the following command:

```bash
pnpm turbo build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm turbo dev
```

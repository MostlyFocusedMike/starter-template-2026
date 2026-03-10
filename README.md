# Starter Template - 2026 Edition

The basic architecture should be a REST API that also hosts the react app


## Problems
Node is in mid transition from CommonJS to ESM. Something still need commonJs (like Jest),


Docker

Stack
- Backend
  - Typescript
  - Express V5
  - Prisma/postgres
  - Better Auth

- Frontend
  - React
  - React Router

# Getting started

## Prisma

```bash
# do not add --db, that's the paid platform
# Init would get you started with prisma but you already have the prisma/folder
# npx prisma init

# Run your migrations
npx prisma migrate dev --name init

# Generate the prisma client
npx prisma generate

# Seed your db
npx prisma db seed
```

In development, you can just totally forcibly reset the db by:
- deleting the migrations you don't want
- then run `npx prisma migrate reset`
- then migrate and generate


## Docker

```bash
docker compose up -d

# Go into DB
docker compose exec pg_db psql -U postgres
```


# Packages
- [tsx](https://npmx.dev/package/tsx)
  - The "best way to run typescript in Node"
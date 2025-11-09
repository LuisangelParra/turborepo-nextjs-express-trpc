# 🚀 Fullstack Turborepo Example (Next.js + Express + tRPC + Drizzle ORM)

This repository demonstrates how to structure a **modern fullstack monorepo** using [Turborepo](https://turbo.build/repo) — combining **Next.js**, **Express**, **tRPC**, and **Drizzle ORM** with a modular and scalable setup.

---

## 🧩 What's inside?

This Turborepo includes both **frontend** and **backend** apps, as well as shared packages for configuration, database access, and types.

### **Apps**

* **`web`** → A [Next.js](https://nextjs.org/) 16 App Router frontend (React 19) consuming the backend through **tRPC**
* **`server`** → An [Express](https://expressjs.com/) + [tRPC](https://trpc.io/) API server using **Drizzle ORM** to interact with a Postgres database

### **Packages**

* **`@repo/db`** → Database client and schema definitions powered by [Drizzle ORM](https://orm.drizzle.team/)
* **`@repo/api`** → Shared TypeScript types for the tRPC router (`AppRouter`)
* **`@repo/eslint-config`** → Shared ESLint configuration for consistent linting rules
* **`@repo/typescript-config`** → Centralized TypeScript configurations

Every app and package is 100% [TypeScript](https://www.typescriptlang.org/).

---

## ⚙️ Features

* **Monorepo architecture** using [Turborepo](https://turbo.build/repo)
* **tRPC** for fully type-safe API communication between frontend and backend
* **Drizzle ORM** for schema management and database migrations
* **Express backend** for complete control over your API
* **Next.js App Router frontend** with React Query + tRPC Client
* **Shared types & configs** across all workspaces
* **Local & remote caching** via Turbo

---

## 🧱 Project structure

```
apps/
 ├─ web/           # Next.js frontend
 └─ server/        # Express + tRPC backend
packages/
 ├─ db/            # Drizzle ORM config and schema
 ├─ api/           # Shared tRPC types (AppRouter)
 ├─ eslint-config/ # Shared lint rules
 └─ typescript-config/
```

---

## 🧰 Available scripts

### 🧩 Develop

Run both frontend and backend simultaneously:

```bash
pnpm dev
```

or, to start only one app:

```bash
pnpm turbo run dev --filter=web
pnpm turbo run dev --filter=server
```

### ⚙️ Build

Build all apps and packages for production:

```bash
pnpm build
```

or filter:

```bash
pnpm turbo run build --filter=web
pnpm turbo run build --filter=server
```

### 🗄️ Database

Run migrations with Drizzle:

```bash
pnpm db:generate   # generate migrations
pnpm db:migrate    # apply migrations
```

Environment variables are stored in `.env`:

```
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

---

## 🐳 Deployment

### 🧩 Option 1 — Docker Compose (recommended for local & VPS)

```yaml
version: "3.8"
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: turborepo_demo
    ports:
      - "5432:5432"

  server:
    build: ./apps/server
    ports:
      - "4000:4000"
    env_file: .env
    depends_on:
      - db

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    depends_on:
      - server
```

Run:

```bash
docker compose up --build
```

Your stack will be available at:

* Frontend → [http://localhost:3000](http://localhost:3000)
* API → [http://localhost:4000](http://localhost:4000)

---

### 🧩 Option 2 — Vercel + Railway / Render

* Deploy `apps/web` to **Vercel** (Next.js native)
* Deploy `apps/server` to **Railway** or **Render**
* Connect both via environment variables (`API_URL`, `DATABASE_URL`)

---

## 🧠 Tech summary

| Layer         | Tech                          | Description                    |
| ------------- | ----------------------------- | ------------------------------ |
| **Frontend**  | Next.js 16 (App Router)       | Modern React 19 frontend       |
| **Backend**   | Express + tRPC                | Type-safe API layer            |
| **Database**  | Drizzle ORM + PostgreSQL      | SQL schema & migrations        |
| **Shared**    | TypeScript + Turbo            | Modular workspace architecture |
| **Dev Tools** | ESLint, Prettier, Turbo cache | Clean and consistent dev flow  |

---

## 🧰 Useful Commands

| Command                      | Description                         |
| ---------------------------- | ----------------------------------- |
| `pnpm dev`                   | Run frontend + backend concurrently |
| `pnpm build`                 | Build all apps and packages         |
| `pnpm db:generate`           | Generate Drizzle migrations         |
| `pnpm db:migrate`            | Apply migrations to DB              |
| `pnpm turbo run lint`        | Lint all workspaces                 |
| `pnpm turbo run check-types` | Type-check all workspaces           |

---

## 🧠 Notes

* The backend (server) exposes its tRPC router via `/trpc`
* The frontend (web) consumes it via the tRPC React client (`createTRPCReact<AppRouter>`)
* Shared types live in `@repo/api`, so both apps stay in sync automatically
* `@repo/db` allows any service in the monorepo to access the same Drizzle instance

---

## 🌐 Remote Caching

You can enable [Vercel Remote Cache](https://turborepo.com/docs/core-concepts/remote-caching)
to share build artifacts across environments and CI/CD.

```bash
turbo login
turbo link
```

---

## 🧾 License

MIT © 2025 — Example maintained by **Luisangel Parra**
Inspired by [Turborepo examples](https://github.com/vercel/turbo/tree/main/examples) and [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

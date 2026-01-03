# 📚 Books Store API

A simple and type-safe **Books Store REST API** built with **Bun** and **Hono**, featuring **OpenAPI (Swagger)** documentation and **Zod-based validation**.

This project demonstrates a clean backend architecture with:
- Strong typing
- Explicit API contracts
- Auto-generated Swagger documentation
- Bearer token authentication (admin routes)

---

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Hono](https://hono.dev/)
- **Validation & Schema**: [Zod](https://zod.dev/)
- **OpenAPI / Swagger**: `@hono/zod-openapi`
- **Swagger UI**: `@hono/swagger-ui`
- **Language**: TypeScript (ESM)

---

## 📦 Dependencies Explained

### Production Dependencies

| Package | Purpose |
|------|------|
| `hono` | Lightweight, fast web framework |
| `zod` | Schema validation & type inference |
| `@hono/zod-validator` | Runtime request validation using Zod |
| `@hono/zod-openapi` | OpenAPI 3.0 generation from Zod schemas |
| `@hono/swagger-ui` | Swagger UI for API documentation |

### Development Dependencies

| Package | Purpose |
|------|------|
| `@types/bun` | Bun TypeScript types |
| `typescript` | Type checking & tooling |

---

## 📂 Project Structure (Example)

```text
src/
├── index.ts            # App entry point
├── routes/
│   └── book.route.ts   # Book routes (CRUD)
├── schemas/
│   └── book.schema.ts  # Zod schemas
├── middlewares/
    └── auth.ts         # Bearer auth middleware

````

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/komarkun/books-store.git
cd books-store
cp .env.example .env
```

### 2. Install dependencies

```bash
bun install
```

---

## ▶️ Running the App

### Development mode (with watch)

```bash
bun run dev
```

By default, the app runs on:

```text
http://localhost:3000
```

---

## 📖 API Documentation (Swagger)

Swagger UI is available at:

```text
http://localhost:3000/api/docs
```

Features:

* Auto-generated OpenAPI 3.0 spec
* Bearer token authentication support
* Live API testing

---

## 🔐 Authentication (Bearer Token)

This API uses **Bearer Token authentication** for protected routes (POST, PUT, DELETE).

### Environment Variable

Create a `.env` file:

```env
API_BEARER_TOKEN=super-secret-token
```

> ⚠️ Never commit `.env` to version control.

### Using Swagger

1. Open `/api/doc`
2. Click **Authorize**
3. Enter token:

   ```text
   super-secret-token
   ```

Swagger will automatically send:

```http
Authorization: Bearer super-secret-token
```

---

## 📌 API Conventions

### Response Shape

All responses are **wrapped** for consistency:

```json
{
  "book": {
    "id": 1,
    "title": "Atomic Habit",
    "price": 20000,
    "sumary": "..."
  }
}
```

List responses:

```json
{
  "books": [ ... ]
}
```

---

## 🧠 Design Principles

* **Contract-first API** using OpenAPI
* **Strict typing** between handler & schema
* **Middleware-based auth**
* **No runtime guesswork** — everything is explicit

---

## 🛠 Scripts

```json
{
  "dev": "bun --watch src/index.ts"
}
```

---

## 🚧 Limitations & Notes

* This project uses **in-memory data** (no database)
* Bearer token is **static** (suitable for internal/admin APIs)
* Can be upgraded to:

  * JWT authentication
  * Role-based access
  * Database (PostgreSQL, SQLite, etc.)

---

## 🧩 Future Improvements

* Pagination & filtering
* JWT with refresh tokens
* Role-based authorization
* Persistent storage
* API versioning

---

# Volta Link ⚡

Volta Link is a modern, full-stack URL shortener built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and **Atomic Design**. It strictly adheres to functional programming principles, ensuring absolute immutability and zero nested conditionals across the entire codebase.

## 🏗️ Architecture & Paradigms

The project strictly follows architectural best practices, ensuring that the core business logic is isolated from external frameworks, databases, and UI components. 

1. **Domain Layer**: Contains Entities (`ShortLink`) and Value Objects (`OriginalUrl`, `UrlCode`, `ExpirationDate`) to guarantee valid states.
2. **Application Layer**: Contains Use Cases (`ShortenUrlUseCase`, `GetOriginalUrlUseCase`, `GetHistoryUseCase`).
3. **Presentation Layer**: 
   - *Backend*: Pure JSON REST API Express Controllers (No SSR HTML).
   - *Frontend*: React Components structured using **Atomic Design** (Atoms, Molecules, Organisms, Templates, Pages).
4. **Infrastructure Layer**: Prisma/SQLite Adapters (Backend) / HTTP Fetch & LocalStorage Adapters (Frontend).
5. **Strict Functional Programming**: Zero mutability (no `let` variables, pure functions only) and flat logic (no nested `if` statements).

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, **Vite v6**, **TailwindCSS v4** (Zero-config, premium Glassmorphism design)
- **Backend**: Node.js **v24 LTS**, Express, TypeScript, **Prisma v7** (ORM with `@prisma/adapter-better-sqlite3`), SQLite
- **Code Quality**: **oxlint** (strict linting), **oxfmt** (formatting), absolute imports (`@/`) via `tsc-alias` & Vite native resolution
- **Testing**: **Vitest v4**, `@golevelup/ts-vitest` (advanced mocking), SQLite in-memory integration testing
- **Security**: Shared API Key authentication (`x-api-key`) between Frontend Gateway and Backend Middleware
- **DevOps**: Docker, Docker Compose, Makefile, deterministic builds (`npm ci`)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v24 LTS)
- Docker & Docker Compose (optional, but recommended for easy startup)

### Quick Start (Using Docker)

The easiest way to run the entire stack is using the provided Makefile:

```bash
make start
```

This will build and start the Docker containers:
- **Frontend** available at: `http://localhost:5173`
- **Backend API** available at: `http://localhost:3001`

To stop the containers:
```bash
make stop
```

### Manual Setup (Without Docker)

If you prefer to run it locally without Docker:

**1. Backend:**
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testing

Both backend and frontend contain rigorous automated tests powered by **Vitest** and `@golevelup/ts-vitest` to ensure business rules are strictly enforced via deep mocks.

**Run Backend Unit Tests:**
```bash
cd backend
npm test
```

**Run Backend Integration Tests (Prisma + SQLite on-the-fly):**
```bash
cd backend
npm run test:integration
```

**Run Frontend Tests:**
```bash
cd frontend
npm test
```

## 🧹 Linting & Formatting

The codebase uses **oxlint** and **oxfmt** with strict configurations to maintain clean code standards.

```bash
# In either backend/ or frontend/ directory
npm run lint
npm run format
```

## 🎯 Features
- **URL Shortening**: Shorten URLs with optional custom aliases.
- **Expirations**: Set optional expiration dates for short links.
- **i18n (Internationalization)**: Full English (EN) and French (FR) support with system-preference detection and manual toggle.
- **Security**: Backend API is protected by a secret API Key.
- **Local History**: Local history of recently shortened links (stored in LocalStorage).
- **Premium UI**: Responsive, high-end "Glassmorphism" UI built with TailwindCSS v4.

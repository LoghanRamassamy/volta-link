# Volta Link ⚡

Volta Link is a modern, full-stack URL shortener built with **Clean Architecture** and **Domain-Driven Design (DDD)**. 

## 🏗️ Architecture

The project strictly follows Clean Architecture principles, ensuring that the core business logic (Domain) is isolated from external frameworks, databases, and UI components. Both Frontend and Backend share the same architectural pattern.

1. **Domain Layer**: Contains Entities (`ShortLink`) and Value Objects (`OriginalUrl`, `UrlCode`, `ExpirationDate`) to guarantee immutability and valid states.
2. **Application Layer**: Contains Use Cases (`ShortenUrlUseCase`, `GetOriginalUrlUseCase`, `GetHistoryUseCase`).
3. **Presentation Layer**: Express Controllers (Backend) / React Components (Frontend).
4. **Infrastructure Layer**: Prisma/SQLite Adapters (Backend) / HTTP Fetch & LocalStorage Adapters (Frontend).

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Vite, Vanilla CSS (Glassmorphism design)
- **Backend**: Node.js, Express, TypeScript, Prisma (ORM), SQLite
- **DevOps**: Docker, Docker Compose, Makefile

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
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

Both backend and frontend contain rigorous unit tests for the Domain and Application layers to ensure business rules are enforced.

**Run Backend Tests:**
```bash
cd backend
npm test
```

**Run Frontend Tests:**
```bash
cd frontend
npm test
```

## 🎯 Features
- Shorten URLs with optional custom aliases.
- Set optional expiration dates for short links.
- Immutability and strict validation using Value Objects.
- Local history of recently shortened links (stored in LocalStorage).
- Premium, responsive "Glassmorphism" UI with dark mode aesthetics.

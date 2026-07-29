# Word games / slovní hry

# ENGLISH VERSION

# Word Games

Web application with a collection of word games inspired by popular games from New York Times: Spelling Bee, Letter Boxed, Crossclimb a Wordle.

## Technologies

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** ASP.NET Core 8, MediatR, Entity Framework Core
- **Databáze:** MySQL 8 (puzzle sets), Neo4j (dictionary)

## Running the app with Docker

### Requirements

- [Docker](https://www.docker.com/products/docker-desktop/) (including Docker Compose)

### What to do

1. Clone the repository:
   ```bash
   git clone <url-repozitáře>
   cd wordgames
   ```

2. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

3. Run the app:
   ```bash
   docker compose up --build
   ```

4. Open this URL in your browser:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5238/api

### Stopping the project

```bash
docker compose down
```

For data deletion (deletes the db):
```bash
docker compose down -v
```

## Local development (without Docker)

### Requirements

- .NET 8 SDK
- Node.js 20+
- MySQL 8
- Access to the Neo4j database

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The application expects a `.env` file in the project's root directory with variables defined in `.env.example`.

----------------------------------------------------------------------------------------------------------------------------------------

# ČESKÁ VERZE

Webová aplikace s kolekci slovních her inspirovaných populárními hrami z New York Times: Spelling Bee, Letter Boxed, Crossclimb a Wordle.

## Technologie

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** ASP.NET Core 8, MediatR, Entity Framework Core
- **Databáze:** MySQL 8 (herní sady), Neo4j (slovník)

## Spuštění pomocí Dockeru

### Požadavky

- [Docker](https://www.docker.com/products/docker-desktop/) (včetně Docker Compose)

### Postup

1. Naklonujte repozitář:
   ```bash
   git clone <url-repozitáře>
   cd wordgames
   ```

2. Vytvořte soubor `.env` z šablony:
   ```bash
   cp .env.example .env
   ```

3. Spusťte aplikaci:
   ```bash
   docker compose up --build
   ```

4. Otevřete prohlížeč na adrese:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5238/api

### Zastavení

```bash
docker compose down
```

Pro úplné vyčištění dat (smaže databázi):
```bash
docker compose down -v
```

## Lokální vývoj (bez Dockeru)

### Požadavky

- .NET 8 SDK
- Node.js 20+
- MySQL 8
- Přístup k Neo4j databázi

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikace očekává soubor `.env` v kořenovém adresáři projektu s proměnnými definovanými v `.env.example`.

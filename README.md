# Word games / slovní hry

**Live demo:** http://158.194.80.92:3000/

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

2. Run the app:
   ```bash
   docker compose up --build
   ```

3. Open this URL in your browser:
   - **Frontend:** http://localhost:3000

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
- Neo4j 5 (or use the Docker instance: `docker compose up neo4j`)

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

The application expects a `.env` file in the project's root directory with the following variables:
- `MYSQL_CONNECTION` — MySQL connection string
- `NEO4J_URI` — Neo4j bolt URI (e.g. `bolt://localhost:7687`)
- `NEO4J_USER` — Neo4j username
- `NEO4J_PASSWORD` — Neo4j password

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

2. Spusťte aplikaci:
   ```bash
   docker compose up --build
   ```

3. Otevřete prohlížeč na adrese:
   - **Frontend:** http://localhost:3000

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
- Neo4j 5 (nebo použijte Docker instanci: `docker compose up neo4j`)

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

Aplikace očekává soubor `.env` v kořenovém adresáři projektu s následujícími proměnnými:
- `MYSQL_CONNECTION` — připojovací řetězec k MySQL
- `NEO4J_URI` — Neo4j bolt URI (např. `bolt://localhost:7687`)
- `NEO4J_USER` — Neo4j uživatelské jméno
- `NEO4J_PASSWORD` — Neo4j heslo

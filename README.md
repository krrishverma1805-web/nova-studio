# Nova Studio — Digital Agency Web Application

Fullstack web application for a premium digital agency called **Nova Studio**. It features an animated client-facing website, a secure admin dashboard, real-time analytics, rate-limiting, and dual-database backing.

---

## Live Demo
A live deployment of the application can be accessed here:
- **Production Site**: [https://nova-studio-demo.vercel.app](https://nova-studio-demo.vercel.app) *(Placeholder)*
- **Admin Portal**: [https://nova-studio-demo.vercel.app/admin](https://nova-studio-demo.vercel.app/admin) *(Placeholder)*

---

## Project Overview
Nova Studio is built to demonstrate a production-ready digital agency platform. The application provides two main surfaces:
1. **Public Brand Page**: A responsive landing page showcasing the agency's services, portfolio items with client-side filtering, intersection-triggered track record counters, and a validate contact form.
2. **Administrative Workspace**: A restricted panel behind standard credential-based session auth. It features live statistics (total contacts, projects, page views, and cta interactions), a dynamic projects CRUD manager, and a search-friendly submissions viewer.

---

## Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 | App Router with Server Components for optimized data fetching |
| **Styling** | Material UI (v5) | Styled with CSS Modules for layout containment |
| **Animations** | Framer Motion | Staggered entrance transitions and intersection triggers |
| **Relational DB** | PostgreSQL | Holds services, stats, contacts, and project portfolios |
| **ORM** | Prisma ORM | DB schema definition, migrations, and querying |
| **Document DB** | MongoDB | Stores high-throughput analytics events and form logs |
| **ODM** | Mongoose | Event schemas and connections singleton |
| **Auth** | Custom JWT (jose) | HTTP-only cookie sessions for admin panel protection |
| **Validation** | Zod | Safe parsing on API routes and forms |

---

## Environment Variables
Create a `.env` file at the root of the project. The following variables are required:

| Variable | Description | Example / Placeholder |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma | `postgresql://user:pass@localhost:5432/dbname` |
| `MONGODB_URI` | MongoDB connection URI used by Mongoose | `mongodb://localhost:27017/dbname` |
| `NEXTAUTH_SECRET` | Secret key used to encrypt and sign JWT cookies | `your-32-character-secret-key-goes-here` |
| `NEXTAUTH_URL` | Base URL of the application for callbacks | `http://localhost:3000` |
| `ADMIN_USERNAME` | Administrator login username | `admin` |
| `ADMIN_PASSWORD` | Administrator login password | `adminpassword` |

---

## Local Setup instructions

### 1. Prerequisites
Ensure you have Node.js (v18+), npm, and Docker running on your system.

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/krrishverma1805-web/nova-studio.git
cd nova-studio
npm install
```

### 3. Spin up Databases
Run PostgreSQL and MongoDB services locally using the configured compose stack:
```bash
docker-compose up -d postgres mongo
```

### 4. Database Setup
Apply Prisma migrations to initialize PostgreSQL and insert initial seed data:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run the Application
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public landing page and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## API endpoint documentation

| Endpoint | Method | Description | Authentication | Cache-Control |
| :--- | :--- | :--- | :--- | :--- |
| `/api/services` | `GET` | Retrieve the list of agency services | None | `public, s-maxage=60` |
| `/api/projects` | `GET` | Query projects (supports `?category=`) | None | `public, s-maxage=60` |
| `/api/projects` | `POST` | Create a new project item | Admin Session | None |
| `/api/projects/[id]` | `DELETE` | Remove a project by ID | Admin Session | None |
| `/api/stats` | `GET` | Get general record counters | None | `public, s-maxage=60` |
| `/api/contact` | `POST` | Submit contact forms (Rate limited to 5/15m) | None | None |
| `/api/contacts` | `GET` | Retrieve list of submitted messages | Admin Session | None |
| `/api/analytics` | `POST` | Record user interaction events | None | None |

---

## Docker setup
To build and execute the entire application inside Docker containers (including the Next.js production server):
```bash
docker-compose up --build
```
This command builds the optimized multi-stage `Dockerfile`, starts all three services, and exposes the app on port `3000`.

---

## Design Decisions
1. **Flat UI Cards**: To maximize visual performance and avoid Lighthouse paint delays, cards are rendered with a flat design, explicit border bounds (`1px solid`), and clean MUI shadows rather than performance-heavy backdrop blur CSS.
2. **Force-Dynamic Rendering**: The public homepage and API routes are configured for dynamic runtime loading (`force-dynamic`) to avoid database network dependency validation during static build steps.
3. **Dual Databases**: PostgreSQL handles transactional, highly relational schemas (contacts and projects) while MongoDB houses high-volume user interactions (impressions and analytics).

---

## Known Limitations
- **In-Memory Rate Limiter**: The rate-limiter is stored in-memory. Under serverless cold starts or multi-instance load balancers, client buckets will reset. In production, this should be swapped for a Redis-backed token bucket (e.g. Upstash).
- **Vercel Database Config**: When deploying to Vercel, external database instances (e.g. Neon for Postgres, MongoDB Atlas for Mongo) must be separately provisioned and linked via environment variables.

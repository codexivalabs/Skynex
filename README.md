# SKYNEX — Mobile Repair Workshop & Institute

Full-stack Next.js site for SKYNEX, backed by MySQL, with JWT-authenticated
admin login and a WordPress-style admin panel for managing the entire site.

This build was verified end-to-end against a real MySQL database before
delivery: schema + seed load cleanly, the setup script is safe to re-run,
JWT login works, `/admin` is properly access-controlled, admin edits show
up on the public site immediately, sub-pages render seeded content, and
the newsletter form writes to the database.

## What's included

- **Public site** — homepage (Hero, Services, Why Choose Us, Location,
  Footer) plus the six pages linked from the navbar that were previously
  dead links: `/online-courses`, `/onsite`, `/ai-plus`, `/downloads`,
  `/parts-tools`, `/sourcing`. All content is pulled from MySQL; the UI
  is unchanged from the original design.
- **Admin panel** (`/admin`) — JWT-protected, WordPress-style back office
  to edit the hero section, services, "Why Choose Us" features, location
  & hours, the six sub-pages and their items, footer/nav links, social
  links, site settings, and view newsletter subscribers.
- **MySQL database** — full schema in `db/schema.sql`, starting content
  in `db/seed.sql` (mirrors what was originally hardcoded).
- **JWT authentication** — `lib/auth.js` (jsonwebtoken + bcrypt),
  `proxy.js` (Next.js's route-protection layer, guarding `/admin/*` and
  `/api/admin/*`).

## Requirements

- Node.js 20+
- MySQL 8.0+ (or MariaDB 10.6+)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your real MySQL credentials
   and a real JWT secret:

   ```bash
   cp .env.example .env
   ```

   Generate a strong `JWT_SECRET` with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

   `ADMIN_USERNAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` are only
   used once, by the setup script below, to create your first admin
   login. **Change the password after your first login.**

3. **Create the database and load starting content**

   Make sure MySQL is running, then:

   ```bash
   npm run db:setup
   ```

   This creates the `skynex` database, all tables, seeds the starting
   content (matching the site's original hardcoded content), and creates
   your first admin user. It's safe to run more than once — it won't
   duplicate content or overwrite an existing admin account.

4. **Run the app**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` for the site and
   `http://localhost:3000/admin/login` for the admin panel.

5. **Add your logo**

   The navbar/footer expect a logo at `/logo.png` (i.e.
   `public/logo.png`) — this was a placeholder in the original code too,
   so drop your actual logo file into a `public/` folder at the project
   root, or change the "Logo URL" field in **Admin → Settings** to point
   wherever you host it.

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.jsx                 Homepage (server component, fetches from MySQL)
  [slug]/page.jsx           The 6 sub-pages (online-courses, onsite, ai-plus,
                             downloads, parts-tools, sourcing)
  admin/
    login/page.jsx          Admin login (public)
    (dashboard)/            Everything under /admin/* except /admin/login
  api/
    auth/                   login, logout, me, password
    public/                 read-only endpoints used by the public site
    admin/                  authenticated CRUD endpoints for every content type
components/                 Public site components (Navbar, Hero, Services, ...)
components/admin/           Admin panel UI (sidebar, form primitives, CrudManager)
lib/
  db.js                     MySQL connection pool
  auth.js                   JWT + bcrypt helpers
  content.js                Data access layer (all SQL lives here)
  icon-map.js                lucide-react icon lookup for DB-stored icon names
  theme-colors.js            Fixed Tailwind gradient/badge classes for DB-stored colors
db/
  schema.sql                 Full MySQL schema
  seed.sql                    Starting content
scripts/
  setup-db.js                 Runs schema + seed + creates the first admin
proxy.js                      Route protection for /admin/* and /api/admin/*
```

## Notes

- **Colors**: service/feature "color theme" fields store a fixed palette
  key (e.g. `blue-500` / `indigo-600`) rather than free text, because
  Tailwind only generates CSS for class names it can see in the source
  at build time — see the comment in `lib/theme-colors.js`.
- **Sub-pages have no offline fallback**: the homepage falls back to
  built-in default content if the database is briefly unreachable, but
  the six sub-pages are fully database-driven and will 404 if MySQL is
  down, since they have no equivalent hardcoded content to fall back to.
- **Re-running `npm run db:setup`** is safe — it checks for existing data
  before seeding and for an existing admin before creating one.

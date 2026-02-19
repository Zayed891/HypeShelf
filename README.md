# HypeShelf

> Your personal curator for the digital age. Discover, share, and track the content that actually matters.

HypeShelf is a community-driven recommendation platform where authenticated users can share movies, books, tools, music, and games they're genuinely hyped about.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Next.js 16](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Auth | [Clerk](https://clerk.com/) |
| Backend / DB | [Convex](https://convex.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/HypeShelf.git
cd HypeShelf
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=your-deployment-name
```

> **Admin email**: Set `ADMIN_EMAIL` in your **Convex dashboard** → Settings → Environment Variables. The user with this email is auto-promoted to admin on sign-in.

### 3. Start Convex Dev Server

```bash
npx convex dev
```

### 4. Start the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
HypeShelf/
├── app/
│   ├── page.tsx           # Landing page
│   ├── feed/page.tsx      # Authenticated feed
│   ├── add/page.tsx       # Add recommendation form
│   └── admin/page.tsx     # Admin dashboard
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── DashboardFeed.tsx
│   ├── RecommendationCard.tsx
│   ├── SignInBanner.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── button.tsx
│       └── toast.tsx       # Custom toast notification system
├── convex/
│   ├── schema.ts           # Database schema
│   ├── users.ts            # User sync, role management
│   └── recommendations.ts  # CRUD + admin actions
└── types/
    └── index.ts            # Shared TypeScript types (UserRole, Genre)
```

---

## Features

- 🔐 **Authentication** via Clerk (Google, email, etc.)
- 📬 **Recommendations feed** with genre + staff pick filters
- ⭐ **Staff Picks** — admins can badge notable recommendations
- 🛡️ **Role-Based Access Control** — `admin` and `user` roles enforced on the backend
- 📱 **Fully responsive** — mobile hamburger menu, adaptive layouts
- 🚦 **Rate limiting** — max 10 posts/hour per user on the backend

---

## Admin Access

1. Set `ADMIN_EMAIL` in the Convex dashboard environment variables.
2. Sign in with that email — you'll be auto-promoted to admin.
3. Access `/admin` to manage users and roles.

---

## Deployment

### Convex (Backend)
```bash
npx convex deploy
```

### Vercel (Frontend)
Push to your connected GitHub repo. Vercel will auto-build and deploy.

**Required Vercel env vars:**
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CONVEX_DEPLOYMENT`

---

## Security Notes

- All role checks are enforced **server-side** in Convex mutations — not just in the UI.
- Admins cannot demote themselves (backend guard in `updateRole`).
- The `create` mutation is rate-limited to **10 posts/hour** per user.
- Protected routes enforced via `middleware.ts`.

---

## License

MIT

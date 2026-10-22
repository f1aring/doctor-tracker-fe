# Doctor Tracker

Doctor Tracker is an administrative web application for managing doctors and their patients. It includes authentication, doctor and patient records, filtering, and dashboard analytics.

## Tech Stack

### Frontend

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4 and Base UI
- TanStack Query and TanStack Table
- Redux Toolkit
- Axios and Recharts
- React Hook Form, Zod, Sonner, and Lucide React

### Backend

The frontend expects a REST API. Configure its base URL using `NEXT_PUBLIC_API_URL`. Authentication expects `/auth/login`, `/auth/me`, `/auth/refresh`, and `/auth/logout`. The backend should set `access_token` and `refresh_token` as `HttpOnly` cookies on login, rotate the access cookie on refresh, and clear both cookies on logout. The frontend sends cookies with API requests and retries a failed request once after refreshing; it never reads or stores token values in JavaScript. The backend must validate authorization on every protected endpoint.

For cross-origin frontend/API deployments, configure CORS to allow the exact frontend origin and credentials. Set cookies with `Secure` in production and an appropriate `SameSite` policy for the deployment domains.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file from the example and set the API URL:

```bash
Copy-Item .env.example .env.local
```

`NEXT_PUBLIC_API_URL` defaults to `http://localhost:5000/api/v1`. Update it in `.env.local` if the backend uses another address. Do not commit `.env.local`.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```

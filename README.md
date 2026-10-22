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

The frontend expects a REST API. Configure its base URL using `NEXT_PUBLIC_API_URL`. Authentication expects `/auth/login`, `/auth/me`, and `/auth/logout`; the backend should set and validate the `doctor_tracker_session` cookie.

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

# MentorConnect Frontend

MentorConnect Frontend is the React application for a full-stack mentor-mentee platform. It provides role-based dashboards for mentees and mentors, mentor discovery, AI mentor matching, mentorship booking, session management, chat, profile management, authentication, OTP verification, and Google Calendar connection UI.

This repository contains the Vite React application consumed by users in the browser. It connects to the MentorConnect backend API through Axios and uses React Query, Redux Toolkit, Tailwind CSS, React Router, Stream Chat, React Hook Form, and Zod.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Application Architecture](#application-architecture)
- [User Roles](#user-roles)
- [Main User Flows](#main-user-flows)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing Overview](#routing-overview)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Feature Modules](#feature-modules)
- [Testing](#testing)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [Backend Repository](#backend-repository)

## Project Overview

MentorConnect helps mentees find suitable mentors and manage mentorship journeys. Mentors can create professional profiles, add expertise, create plans, accept mentorship requests, schedule sessions, and communicate with mentees.

The frontend is responsible for:

- Rendering the user interface.
- Handling client-side routes.
- Managing login state.
- Calling backend APIs.
- Displaying loading, error, and success states.
- Providing role-based navigation.
- Integrating Stream Chat in the browser.
- Displaying AI-powered mentor search results.

## Core Features

### Public Pages

- Landing page.
- Login page.
- Signup page.
- OTP verification page.
- Forgot password page.
- Reset password page.

### Authentication

- Signup and OTP verification.
- Login and logout.
- Session restoration using `/auth/me`.
- Protected routes for authenticated users.
- Public route redirection when already logged in.
- Mentor-only and mentee-only route guards.

### Mentee Features

- Mentee dashboard.
- Mentor discovery page.
- Mentor search and filtering.
- Mentor detail page.
- Mentor plan viewing.
- Mentorship booking.
- Mentorship overview page.
- Upcoming session widgets.
- Chat page.
- AI mentor match page.
- Mentee profile view and edit pages.

### Mentor Features

- Mentor dashboard.
- Mentor onboarding flow.
- Mentor profile view and edit pages.
- Expertise management.
- Plan management.
- Availability control.
- Active mentees overview.
- Mentorship request management.
- Session scheduling, rescheduling, cancellation, and completion.
- Chat page.
- Google Calendar connection UI.

### AI Mentor Match

- Mentee enters a natural language prompt.
- Frontend sends the prompt to the backend.
- Backend ranks mentors using Gemini/OpenAI.
- Frontend displays matched mentors and match reasons.

### Chat

- Uses Stream Chat.
- Frontend gets a chat token from the backend.
- Frontend connects the logged-in user to Stream.
- Each mentorship can have a chat channel.
- Users can select mentorship conversations and send messages.

### Session Management

- Mentor can create sessions for mentorships.
- Mentor can reschedule, cancel, and complete sessions.
- Mentee and mentor dashboards can show upcoming sessions.
- Session forms are validated with Zod.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI Library | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Global State | Redux Toolkit, React Redux |
| Server State | TanStack React Query |
| API Client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Chat | Stream Chat, Stream Chat React |
| Testing | Vitest, fast-check |
| Deployment | Docker, Nginx |

## Application Architecture

```text
Browser
  |
  v
React + Vite Frontend
  |
  | Axios requests with credentials
  v
MentorConnect Backend API
  |
  v
PostgreSQL + External Services
```

Important frontend responsibilities:

- `React` renders UI components.
- `React Router` controls which page appears for each URL.
- `Redux` stores the logged-in user and authentication status.
- `React Query` manages backend data fetching and cache refresh.
- `Axios` sends HTTP requests to the backend.
- `Tailwind CSS` handles styling through utility classes.
- `Stream Chat React` renders the chat interface.

## User Roles

### Mentee

Mentees can:

- Browse mentors.
- View mentor details.
- Book mentorships.
- Track mentorships and sessions.
- Chat with mentors.
- Use AI mentor matching.
- Manage their profile.

### Mentor

Mentors can:

- Complete onboarding.
- Edit mentor profile.
- Add expertise.
- Create and manage plans.
- View mentees.
- Manage mentorship requests.
- Schedule and manage sessions.
- Connect Google Calendar.
- Chat with mentees.

## Main User Flows

### Signup Flow

```text
Signup form
  -> POST /auth/signup
  -> OTP sent to email
  -> OTP page
  -> POST /auth/verify-signup-otp
  -> Backend sets auth cookie
  -> Redux stores user
  -> User is redirected by role
```

### Login Flow

```text
Login form
  -> POST /auth/login
  -> Backend validates credentials
  -> Backend sets auth cookie
  -> Frontend calls /auth/me
  -> Redux stores user
  -> User enters mentor or mentee dashboard
```

### Mentee Booking Flow

```text
Mentee opens mentors page
  -> React Query fetches mentors
  -> Mentee opens mentor details
  -> React Query fetches mentor plans
  -> Mentee books a plan
  -> POST /mentorships
  -> Mentorship appears in mentee dashboard
```

### Mentor Session Flow

```text
Mentor opens sessions page
  -> React Query fetches mentorships and sessions
  -> Mentor selects a mentee or request
  -> Mentor schedules a session
  -> POST /sessions
  -> Upcoming sessions refresh
```

### AI Match Flow

```text
Mentee enters prompt
  -> POST /ai/mentor-search
  -> Backend sends context to Gemini/OpenAI
  -> Backend returns ranked mentors
  -> Frontend displays match cards
```

### Chat Flow

```text
User opens chat page
  -> GET /chat/token
  -> Frontend connects Stream Chat user
  -> User selects mentorship
  -> POST /chat/channel if needed
  -> Stream channel opens
```

## Environment Variables

Create a `.env` file in the frontend root.

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

Notes:

- All frontend environment variables must start with `VITE_`.
- Do not put backend secrets in frontend `.env`.
- `VITE_STREAM_API_KEY` is safe to expose because Stream Chat also requires backend-generated user tokens.
- Gemini/OpenAI keys must stay on the backend.
- Stream API secret must stay on the backend.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kshitij-y/m-frontend.git
cd m-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` in the root folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

### 4. Start the development server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173
```

Make sure the backend `CLIENT_URL` matches the frontend URL used during local development.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production frontend |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run frontend tests |
| `npm run test:watch` | Run tests in watch mode |

## Routing Overview

Routes are defined in:

```text
src/app/router.jsx
```

### Public Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Login |
| `/signup` | Signup |
| `/verify-otp` | OTP verification |
| `/forgot-password` | Forgot password |
| `/reset-password` | Reset password |

### Mentor Routes

| Route | Page |
| --- | --- |
| `/mentor/onboarding` | Mentor onboarding |
| `/mentor/dashboard` | Mentor dashboard |
| `/mentor/sessions` | Session management |
| `/mentor/chat` | Mentor chat |
| `/mentor/profile` | Mentor profile |
| `/mentor/profile/edit` | Edit mentor profile |

### Mentee Routes

| Route | Page |
| --- | --- |
| `/mentee/dashboard` | Mentee dashboard |
| `/mentee/mentors` | Mentor discovery |
| `/mentee/mentors/:mentorId` | Mentor details |
| `/mentee/mentorships` | My mentorships |
| `/mentee/chat` | Mentee chat |
| `/mentee/ai-match` | AI mentor match |
| `/mentee/profile` | Mentee profile |
| `/mentee/profile/edit` | Edit mentee profile |

## State Management

### Redux Toolkit

Redux is used for global authentication state.

Important file:

```text
src/redux/auth/authSlice.js
```

It stores:

- `user`
- `isAuthenticated`
- `isLoading`

Common actions:

- `setUser`
- `clearUser`
- `setLoading`

### React Query

React Query is used for server state, meaning data that comes from the backend.

Important file:

```text
src/query/queryKeys.js
```

React Query handles:

- loading states
- error states
- caching
- automatic refresh after mutations
- invalidating old data after updates

## API Layer

The Axios instance is defined in:

```text
src/api/axios.js
```

The reusable request wrapper is defined in:

```text
src/api/request.js
```

The API layer uses:

```js
withCredentials: true
```

This is important because authentication uses HTTP-only cookies set by the backend.

## Feature Modules

The frontend uses a feature-based folder structure.

```text
src/features/
  ai-match/
  auth/
  calendar/
  chat/
  mentee/
  mentor/
  mentors/
  mentorships/
  sessions/
  users/
```

### `auth`

Handles signup, OTP verification, login, logout, forgot password, and reset password API calls.

### `mentee`

Contains mentee dashboard, mentor discovery, mentor details, mentorships, AI match, chat, and profile pages.

### `mentor`

Contains mentor dashboard, profile, sessions, chat, and mentor-specific components.

### `mentors`

Contains shared mentor profile, plan, expertise, onboarding, and mentor listing logic.

### `mentorships`

Contains mentorship booking and mentorship status update logic.

### `sessions`

Contains session APIs, hooks, components, modal forms, and validation schemas.

### `chat`

Contains Stream Chat token and channel logic, plus the main `MentorshipChat` component.

### `ai-match`

Contains AI mentor search API, hook, and mentor match card UI.

### `calendar`

Contains Google Calendar connection status and disconnect UI logic.

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

The project includes Vitest configuration and session form schema tests.

## Docker

Build the Docker image:

```bash
docker build -t mentorconnect-frontend .
```

Run the container:

```bash
docker run -p 3000:80 mentorconnect-frontend
```

The Dockerfile builds the Vite app and serves the production files with Nginx.

Nginx is configured to support client-side routing by falling back to `index.html`.

## Project Structure

```text
m-frontend/
  public/
  src/
    api/
      axios.js
      request.js
    app/
      providers.jsx
      router.jsx
      store.js
    components/
      ui/
      onboarding/
    features/
      ai-match/
      auth/
      calendar/
      chat/
      mentee/
      mentor/
      mentors/
      mentorships/
      sessions/
      users/
    layouts/
    pages/
    query/
    redux/
    routes/
    styles/
    utils/
  package.json
  vite.config.js
  dockerfile
  nginx.conf
```

## Backend Repository

Backend repository:

```text
https://github.com/kshitij-y/backend
```

The frontend expects the backend API base URL to be:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For a complete local setup, run the backend first, then start the frontend.

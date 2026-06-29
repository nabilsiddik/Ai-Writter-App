# Ai Doc Writter - Automate document writting publish to platforms

## Description

Ai Doc Writter is such a platform that generates content using LLM depending on users topic and detailed prompt and then export to different kind of documents like PDF, Word, Google docs, Google Sheets etc or upload directly to platforms like Google Drive, Woocommerce and so one.

It saves users time effort by generating high quality content using LLMs like Open Ai, Claude, Gemini, Lama etc and automate repetitive work.

It focuses on subscription based SASS model built with Node.js, Express.js, Typescript, Next.js, Langgraph.js.

## Project Links

### Live Demo

- **Frontend:** https://assignment-writer-app.vercel.app
- **Backend API:** https://assignment-writer-server.onrender.com

### GitHub

- **Frontend Repository:** https://github.com/nabilsiddik/Assignment-Writer-App
- **Backend Repository:** https://github.com/nabilsiddik/Assignment-Writer-Server

## Key Features

- **AI Content Generation:** High quality content generation using LLMs like Open Ai, Claude, Gemini, Lama etc and automate repetitive work.
- **Dynamic Tool Registry:** Very Scalable code to add new document types in langgraph in minutes without logic changes.
- **Multi-Format Export:** Binary streaming for `.docx`, HTML-to-PDF via Puppeteer, and Google Docs, google drive, google sheet, woocommerce API integration.
- **Subscription Lifecycle:** Full Stripe subscription implemented with different type plans.
- **Authentication & Authorization:** JWT access token and refresh token based authentication and role based authorization and redirect with email and reset password otp verification proccess.
- **Rate Limit:** Upstash Redis for global rate-limiting depending on subscription plans.
- **Middleware:** Different type of middlewares to make the platform fully secured like checkAuth, checkSubscriptionPlan, checkRateLimit etc.
- **Storage Integration:** Upload document to cloudinary, delete from cloudinary if necessary to save cost.
- **Advance Dashboard Analytics:** Unlike random dashbaord analytics, it includes deep details like how many tokens are using for each input and output and cost for each response. Platform revenue based on subscriptions and LLM cost etc.

## Tools & Technologies

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Framework:** Express.js, Next.js
- **Database:** PostgreSQL (Prisma ORM)
- **AI Stack:** LangChain, LangGraph JS, Claude 3.5 (Anthropic), Open Ai, Gemini, Lama etc.
- **Security:** JWT, OAuth 2.0 (Google)
- **Payments:** Stripe API
- **Rate Limit:** Upstash Redis
- **Storage:** Cloudinary, Google Drive
- **HTML to PDF:** Puppeteer
- **Animation & Icon:** Framer motion, Lucid React, React Icon Library

## API Endpoints

### User Management

| Method   | Endpoint                  | Description                                 |
| :------- | :------------------------ | :------------------------------------------ |
| `POST`   | `/user/register`          | Register a new user with profile image      |
| `GET`    | `/user`                   | Get all users (Admin, Super Admin)          |
| `GET`    | `/user/profile`           | Get authenticated user's profile            |
| `GET`    | `/user/me`                | Get authenticated user information          |
| `GET`    | `/user/:id`               | Get user details by ID (Admin, Super Admin) |
| `PATCH`  | `/user/:id`               | Update authenticated user's profile         |
| `DELETE` | `/user/delete`            | Delete authenticated user's account         |
| `PATCH`  | `/user/soft-delete/:id`   | Soft delete a user (Admin, Super Admin)     |
| `PATCH`  | `/user/update-status/:id` | Update user status (Admin, Super Admin)     |

---

### Authentication

| Method  | Endpoint                  | Description                          |
| :------ | :------------------------ | :----------------------------------- |
| `POST`  | `/auth/login`             | Login with email and password        |
| `POST`  | `/auth/verify-email`      | Verify email OTP                     |
| `POST`  | `/auth/resend-otp`        | Resend email verification OTP        |
| `POST`  | `/auth/forgot-password`   | Send password reset email            |
| `POST`  | `/auth/reset-password`    | Reset password                       |
| `PATCH` | `/auth/change-password`   | Change authenticated user's password |
| `GET`   | `/auth/google`            | Trigger Google OAuth 2.0 Flow        |
| `GET`   | `/auth/google/callback`   | Google OAuth callback                |
| `GET`   | `/auth/facebook`          | Trigger Facebook OAuth Flow          |
| `GET`   | `/auth/facebook/callback` | Facebook OAuth callback              |
| `GET`   | `/auth/github`            | Trigger GitHub OAuth Flow            |
| `GET`   | `/auth/github/callback`   | GitHub OAuth callback                |

---

### AI Document Generation

| Method | Endpoint                                     | Description                          |
| :----- | :------------------------------------------- | :----------------------------------- |
| `GET`  | `/document`                                  | Get all generated documents          |
| `GET`  | `/document/my-generations`                   | Get authenticated user's generations |
| `GET`  | `/document/generation-details/:generationId` | Get generation details               |
| `POST` | `/document/generate-content`                 | Generate AI document/content         |
| `POST` | `/document/:id/generate-pdf`                 | Generate PDF document                |
| `POST` | `/document/:id/export-google-docs`           | Export document to Google Docs       |
| `POST` | `/document/:id/download-docx`                | Download document as Word (.docx)    |
| `POST` | `/document/:id/save-to-drive`                | Save document to Google Drive        |
| `POST` | `/document/:id/publish-woo`                  | Publish document to WooCommerce      |
| `POST` | `/document/connect-woocommerce`              | Connect WooCommerce store            |
| `GET`  | `/document/my-woo-store`                     | Get connected WooCommerce store      |

---

### Stripe Subscription

| Method | Endpoint                      | Description                                 |
| :----- | :---------------------------- | :------------------------------------------ |
| `POST` | `/stripe/create-subscription` | Create Stripe subscription checkout session |

---

### Admin Dashboard

| Method | Endpoint                    | Description                     |
| :----- | :-------------------------- | :------------------------------ |
| `GET`  | `/admin/dashboard-stats`    | Get admin dashboard statistics  |
| `GET`  | `/admin/financial-overview` | Get financial overview          |
| `GET`  | `/admin/users`              | Get all users                   |
| `GET`  | `/admin/users/:id`          | Get single user details         |
| `GET`  | `/admin/subscriptions`      | Get all subscriptions           |
| `GET`  | `/admin/subscriptions/:id`  | Get single subscription details |
| `GET`  | `/admin/transactions`       | Get all transactions            |
| `GET`  | `/admin/transactions/:id`   | Get single transaction details  |
| `GET`  | `/admin/documents`          | Get all generated documents     |
| `GET`  | `/admin/documents/:id`      | Get single generated document   |

## Backend Folder Structure

```text
src/
├── app/
│   ├── ai/                     # AI prompts, agents & generation logic
│   ├── config/                 # Environment configuration
│   ├── errorHelpers/           # Global error handling utilities
│   ├── interfaces/             # Shared TypeScript interfaces
│   ├── middlewares/            # Authentication, validation & custom middlewares
│   ├── modules/
│   │   ├── admin/              # Admin APIs (Dashboard, Users, Documents)
│   │   ├── analysis/           # AI content analysis module
│   │   ├── assignment/         # Document generation & export
│   │   ├── auth/               # Authentication & OAuth
│   │   ├── stripe/             # Stripe subscription & payment
│   │   └── user/               # User management
│   ├── routes/                 # Application route registry
│   └── utils/                  # File upload, helpers & integrations
├── generated/                  # Prisma generated client
├── lib/                        # Shared libraries & external clients
├── types/                      # Global TypeScript types
├── app.ts                      # Express application
├── server.ts                   # Application entry point
├── prisma.config.ts            # Prisma configuration
└── render-build.ts             # Render deployment build script
```

## Frontend Folder Structure

```text
app/
├── (mainLayout)/               # Shared public layout
├── favicon.ico
├── globals.css
└── layout.tsx                  # Root layout

animations/                     # Framer Motion animations

components/                     # Reusable UI components

config/                         # Frontend configuration

hooks/                          # Custom React hooks

lib/                            # Utilities & helper functions

public/                         # Static assets

services/
├── admin/                      # Admin API services
├── ai/                         # AI generation services
├── auth/                       # Authentication services
├── generation/                 # Document generation services
├── subscription/               # Stripe subscription services
└── user/                       # User-related services

types/                          # Global TypeScript types

zod/                            # Zod validation schemas

proxy.ts                        # API proxy configuration

next.config.ts                  # Next.js configuration

package.json                    # Project dependencies
```

## Backend Installation Guide

```bash
# Clone the repository
git clone https://github.com/your-username/repo-name.git

# Navigate to the project directory
cd project-folder

# Install dependencies
npm install

# Install Puppeteer Chrome
npx puppeteer browsers install chrome

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Environment variables
PORT=
NODE_ENV=
DATABASE_URL=

# AI Models
GEMINI_API_KEY=
FREEMODEL_API_KEY=
OPENROUTER_API_KEY=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# SECURITY
SALT_ROUND=

# CLIENT
CLIENT_URL=

# JWT
JWT_ACCESS_SECRET=
JWT_ACCESS_SECRET_EXPIRES_IN=

JWT_REFRESH_SECRET=
JWT_REFRESH_SECRET_EXPIRES_IN=

JWT_RESET_PASS_SECRET=
JWT_RESET_PASS_SECRET_EXPIRES_IN=

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PREMIUM_PRICE_ID=

# EMAIL SENDER
EMAIL_SENDER_EMAIL=
EMAIL_SENDER_APP_PASS=

# SOCIAL LOGIN
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

## Frontend Installation Guide

```bash
# Clone the repository
git clone https://github.com/your-username/repo-name.git

# Navigate to the project directory
cd project-folder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Environment variables
NEXT_PUBLIC_SERVER_URL=
NODE_ENV=

# jwt
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=
```

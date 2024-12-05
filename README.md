# PSuarezDev Academy: Next.js 14, TypeScript, PostgreSQL, Prisma, Tailwind, Python, Stripe

**PSuarezDev Academy is an innovative online learning platform designed to provide an accessible, intuitive and personalised educational experience. This project aims to facilitate both access to courses and the management of educational content, integrating a role-based system that allows administrators, instructors and students to interact effectively.
With a modern interface and advanced functionalities, PSuarezDev Academy seeks to position itself as a practical and scalable solution for digital education in a dynamic and constantly evolving environment.**

## Prerequisites

**Node version v22.x.x**
<br />
**Python version 3.x.x**

## Features
  * User-friendly platform with role-based access (Admin, Instructor, User).
  * Modern interface built with Tailwind CSS.
  * Integration with Stripe for payment processing.
  * Secure authentication using JSON Web Tokens (JWT).
  * Scalable database architecture using PostgreSQL and Prisma ORM.

## Setting up the project

### Cloning the repository

```shell
git clone https://github.com/psuarezdev/psuarezdev-academy.git
```

### Install packages

```shell
npm i -E
```

### Setup .env file

```js
NODE_ENV=development  
BASE_URL="http://localhost:3000"  
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db_name>?schema=public"  
JWT_SECRET=your_jwt_secret  
STRIPE_SECRET_KEY=your_stripe_secret_key  
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret  
CLOUDINARY_API_SECRET=your_cloudinary_secret_key
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Setup Prisma

```shell
npx prisma migrate dev --name init
```

### Start the app

```shell
npm run dev
```
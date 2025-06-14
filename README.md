# 📰 Full Blog Platform

A complete, modern blog platform built with **Next.js**, **Drizzle ORM**, and **PostgreSQL**, featuring powerful authentication, dynamic routing, full admin control, and full-text search.

---

## ✨ Features

### 🔐 Authentication System
- Full auth system using **JWT** with a custom **Drizzle adapter**
- Secure **register**, **login**, **logout**, and **token refresh**
- **Route protection** with Next.js Middleware

### 🧠 Global State & Theme
- **Zustand** for global state management
- **Light/Dark theme toggle** using `next-themes` + TailwindCSS

### 📝 Forms & Validation
- **React Hook Form** + **Zod** for robust forms
- Seamless UX with:
  - `useFormState` & `useFormStatus` (Server Actions)
  - Optimistic UI updates
  - Auto-generated slugs

### 🛠️ CRUD Operations with Drizzle + ISR
- **Create**, **edit**, and **delete** blog posts
- Built with `generateStaticParams()` and **Incremental Static Regeneration (ISR)**
- Admin approval system for publishing content

### 🔍 Full-Text Search
- Advanced search using **PostgreSQL ILIKE** or `tsvector`
- **Debounced search input** for performance
- UI feedback for no-results scenarios

### 🧭 Routing & Layout
- **Dynamic routes**: `/post/[slug]`
- Custom **404 page**
- Fully featured **header** and **dashboard layout**

---

## 🧰 Tech Stack

- **Next.js**
- **PostgreSQL**
- **Drizzle ORM**
- **TailwindCSS**
- **Zustand**
- **React Hook Form**
- **Zod**
- **next-themes**

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/full-blog-platform.git
   cd full-blog-platform]
2. **Clone the repository**
   ```bash
   pnpm install
3. **Set up your `.env` file**
2. **Run the development server**
   ```bash
   pnpm dev

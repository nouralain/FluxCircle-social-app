# SocialApp 📱
A modern social media application built with React.js, focusing on performance, form validation, and efficient data fetching.

## 🚀 Tech Stack
* **Framework:** [React.js](https://reactjs.org/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Server State / Caching:** [TanStack Query (React Query)](https://tanstack.com/query)
* **Form Handling:** [React Hook Form](https://react-hook-form.com/)
* **Validation:** [Zod](https://zod.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

## Auth Flow

1. User logs in → API returns JWT token
2. Token is saved in localStorage
3. Axios interceptor attaches token to every request automatically
4. Protected routes check token via `ProtectedRoute` component

---

## ✨ Key Features
- [x] User Authentication (Login / Register)
- [x] Protected Routes
- [x] Create / View Posts
- [x] Like & Comment on Posts
- [x] User Profile Page
- [x] Responsive Design

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/nouralain/FluxCircle-social-app.git
cd social-app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Start the dev server
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://linked-posts.routemisr.com
```

---

## Project Structure

```
src/
├── api/                  # Axios instance & API functions
│   ├── axiosInstance.js
│   ├── auth.api.js
│   └── posts.api.js
│
├── components/           # Reusable UI components
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Avatar.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── posts/
│       ├── PostCard.jsx
│       └── PostForm.jsx
│
├── pages/                # Route-level pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   └── usePosts.js
│
├── schemas/              # Zod validation schemas
│   ├── loginSchema.js
│   └── registerSchema.js
│
├── routes/               # Route definitions & guards
│   ├── AppRouter.jsx
│   └── ProtectedRoute.jsx
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---




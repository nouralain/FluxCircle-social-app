# FluxCircle 📱
A modern social media application built with React.js, focusing on performance, form validation, and efficient data fetching.

## 🌐 Live Demo
[View Live](https://your-deploy-link.com)

---

## 🚀 Tech Stack
* **Framework:** [React.js](https://reactjs.org/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Server State / Caching:** [TanStack Query (React Query)](https://tanstack.com/query)
* **Form Handling:** [React Hook Form](https://react-hook-form.com/)
* **Validation:** [Zod](https://zod.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [HeroUI](https://heroui.com/)
* **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

---

## ✨ Features
- [x] User Authentication (Login / Register)
- [x] Protected Routes
- [x] Landing Page
- [x] Create / View Posts
- [x] Like & Comment on Posts
- [x] Comment Pagination (Load More)
- [x] Post Details Page
- [x] Feed / Community / My Posts / Saved tabs
- [x] Bookmarks / Saved Posts
- [x] User Profile Page
- [x] Change Password
- [x] Responsive Design

---

## 📸 Screenshots


---

## Auth Flow

1. User logs in → API returns JWT token
2. Token is saved in localStorage
3. Axios interceptor attaches token to every request automatically
4. Protected routes check token via `ProtectedRoute` component

---

## Installation
```bash
# 1. Clone the repo
git clone https://github.com/nouralain/FluxCircle-social-app.git
cd FluxCircle-social-app

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
│   ├── auth.api.js
│   └── axios.js
│
├── assets/
│
├── components/           # Reusable UI components
│   ├── Shared/
│   │   ├── postsQueries/
│   │   │   ├── Community.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── MyPosts.jsx
│   │   │   └── Saved.jsx
│   │   ├── AllComments.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── CreateComment.jsx
│   │   ├── CreatePost.jsx
│   │   ├── GradientCircle.jsx
│   │   ├── icon.jsx
│   │   ├── InfoCard.jsx
│   │   ├── LikesModal.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── MobileScreen.jsx
│   │   ├── Post.jsx
│   │   ├── PostSkeleton.jsx
│   │   ├── StaticPost.jsx
│   │   └── TopComment.jsx
│   ├── footer/
│   │   └── Footer.jsx
│   └── navbar/
│       └── AppNavbar.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── layouts/
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── landing.jsx
│   ├── home.jsx
│   ├── error.jsx
│   ├── notification.jsx
│   ├── postDetails.jsx
│   └── Profile.jsx
│
├── routes/
│   ├── AppRouter.jsx
│   ├── ProtectedAuthRoute.jsx
│   └── ProtectedRoute.jsx
│
├── schemas/
│   ├── loginSchema.js
│   └── registerSchema.js
│
├── utilities/
│   └── dateFormatting.js
│
├── App.jsx
└── main.jsx
```

---

## Contributing
Pull requests are welcome! Please open an issue first to discuss what you'd like to change.
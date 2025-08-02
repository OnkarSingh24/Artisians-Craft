**Artisan E-Commerce Platform**
A React-based marketplace connecting users with local artisans offering handmade and home-crafted products. Supports seller onboarding, admin approvals, user dashboards, and a seamless shopping experience.


**Key Features
User Side**

Browse and shop artisan products

Add/remove products to cart

Sign up / log in

Dashboard with profile and order info

Seller Side

Multi-step seller registration

Live validation & progress tracking

Admin approval system

**Admin Side**

Approve/reject seller applications

Simple, clean admin dashboard

**Page Overview**

Home (/) – Landing page with welcome banner

Sign In (/signin) – User login form

Sign Up (/signup) – New user registration

Shop (/shop) – Display products from artisans

Artisans (/artisans) – List of artisans with filters

Cart (/cart) – View and update cart

Dashboard (/dashboard) – User profile & orders

Register as Seller (/register-as-seller) – Seller application form

Admin Dashboard (/admin) – Manage seller approvals

**Tech Stack
Frontend:**

React.js, Axios, React Router, Context API

Tailwind CSS / custom CSS, FontAwesome / react-icons

UI designed using Figma
**
Backend:**

Node.js + Express

MongoDB for data storage

JWT for authentication

**Planned API Routes**

POST /api/signup – Register user

POST /api/signin – User login

POST /api/sellers – Submit seller form

GET /api/sellers/pending – Fetch pending sellers

PATCH /api/sellers/:id/approve – Approve seller

GET /api/products – Fetch products

POST /api/cart – Add to cart

GET /api/cart – View cart

**Frontend Structure**

bash
Copy
Edit
/src
  ├── components/
  │   ├── Home.jsx, SignIn.jsx, SignUp.jsx, Shop.jsx, Artisians.jsx
  │   ├── Cart.jsx, Dashboard.jsx, RegisterAsSeller.jsx, AdminDashboard.jsx
  ├── context/AuthContext.js
  ├── styles/ (component CSS)
  └── App.js
**Setup Instructions
Frontend:**

bash
Copy
Edit
git clone https://github.com/yourusername/artisan-ecommerce.git
cd artisan-ecommerce
npm install
npm start
Backend:

bash
Copy
Edit
cd backend
npm install
# Add to .env:
# MONGO_URI=your-mongo-uri
# JWT_SECRET=your-secret
npm run dev
**Authentication**

JWT-based login

AuthContext manages user session

Protected routes for /dashboard, /admin

**Acknowledgements**

Icons: FontAwesome, react-icons

Carousel & UI: Figma-inspired

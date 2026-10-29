# 🌾 AgroConnect — Direct Farmer Marketplace

A full-stack MERN web application that connects farmers directly with buyers — no middlemen.

---

## 📁 Project Structure

```
agroconnect/
├── client/          ← React frontend (Tailwind CSS)
│   └── src/
│       ├── assets/       ← Chatbot & fertilizer data
│       ├── components/   ← Navbar
│       ├── context/      ← AuthContext
│       ├── pages/        ← All pages
│       └── services/     ← Axios API calls
└── server/          ← Node.js + Express backend
    ├── controllers/  ← Business logic
    ├── middleware/   ← JWT auth
    ├── models/       ← MongoDB schemas
    └── routes/       ← API routes
```

---

## ✅ Prerequisites

Make sure you have these installed:

- **Node.js** (v16 or above) — https://nodejs.org
- **MongoDB** (local) — https://www.mongodb.com/try/download/community  
  OR use **MongoDB Atlas** (free cloud) — https://www.mongodb.com/atlas
- **npm** (comes with Node.js)

---

## 🚀 Setup & Run Instructions

### Step 1 — Extract the Project

Unzip `agroconnect.zip` to your desired folder.

```
agroconnect/
├── client/
└── server/
```

---

### Step 2 — Setup the Backend (Server)

Open a terminal and navigate to the server folder:

```bash
cd agroconnect/server
```

Install dependencies:

```bash
npm install
```

Create your `.env` file (already included, but you can edit it):

```bash
# server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agroconnect
JWT_SECRET=agroconnect_jwt_secret_key_2024
```

> 💡 If using MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

Start the server:

```bash
# Development (auto-restart on changes):
npm run dev

# OR Production:
npm start
```

✅ You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

---

### Step 3 — Setup the Frontend (Client)

Open a **new terminal** and navigate to the client folder:

```bash
cd agroconnect/client
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm start
```

✅ The app will open at: **http://localhost:3000**

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with features & CTA |
| Register | `/register` | Create farmer or buyer account |
| Login | `/login` | Sign in |
| Marketplace | `/marketplace` | Browse all products with search & filter |
| Product Details | `/products/:id` | Full product info + farmer contact |
| Dashboard | `/dashboard` | Farmer only — add/delete products |
| Fertilizer Guide | `/fertilizer` | Select crop & soil → get fertilizer tip |
| KrishiBot | `/chatbot` | Farming chatbot with quick topics |
| Contact | `/contact` | Contact form + FAQ |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (requires token) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports `?search=&category=`) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/my-products` | Get farmer's own products (auth required) |
| POST | `/api/products` | Add product (farmer + multipart/form-data) |
| DELETE | `/api/products/:id` | Delete product (farmer only) |

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router v6, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcryptjs
- **File Upload**: Multer

---

## 👤 Test Accounts

Register two accounts manually:
1. **Farmer** account → can add/delete products, access Dashboard
2. **Buyer** account → can browse marketplace and view product details

---

## ⚠️ Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running: `mongod` (or start MongoDB service)
- Or switch to MongoDB Atlas and update `MONGO_URI` in `.env`

**Port 3000 or 5000 already in use?**
- Change `PORT` in `server/.env`
- React will auto-ask to use another port

**Images not loading?**
- Make sure both server and client are running simultaneously
- Uploaded images are stored in `server/uploads/`

---

## 📚 Academic Relevance

| Subject | Concepts Used |
|---------|--------------|
| DBMS | MongoDB CRUD, schema design, indexing |
| Web Technology | REST API, MERN stack, HTTP methods |
| Software Engineering | JWT auth, MVC pattern, testing |
| AI Concepts | Rule-based chatbot, recommendation logic |

---

Built with ❤️ for Indian farmers. © 2024 AgroConnect

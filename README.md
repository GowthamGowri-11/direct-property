# Direct Property - MERN Stack Real Estate Website

A fully functional real estate website built with MongoDB, Express.js, React, and Node.js.

## Features

- **Home Page**: Professional landing page with hero section, features, and property types
- **Buyer Page**: Dynamic property listings with filters and search
- **Seller Page**: Property submission form with image upload
- **Property Detail**: Full property information with contact details
- **About Page**: Company information, mission, and team
- **Admin Dashboard**: Property management with statistics
- **Authentication**: User registration/login and admin login

## Tech Stack

- **Frontend**: React 18 (Hooks only)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS (Custom)
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone and Setup

```bash
cd direct-property
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file (already created with defaults):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/direct-property
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running on your system.

### Start Backend Server
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

### Seed Database (Optional)
```bash
cd server
node seed.js
```
This creates:
- Default admin (username: admin, password: admin123)
- Sample users
- Sample properties

### Start Frontend
```bash
cd client
npm start
```
Frontend runs on http://localhost:3000

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Add new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/statistics` - Get statistics

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create admin
- `GET /api/admin/users/count` - Get total users

## Folder Structure

```
direct-property/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── propertyController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Property.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── client/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Footer.js
        │   ├── Navbar.js
        │   └── PropertyCard.js
        ├── pages/
        │   ├── About.js
        │   ├── Admin.js
        │   ├── Buyer.js
        │   ├── Home.js
        │   ├── Login.js
        │   ├── PropertyDetail.js
        │   ├── Register.js
        │   └── Seller.js
        ├── services/
        │   └── api.js
        ├── App.js
        ├── index.css
        └── index.js
```

## Demo Credentials

- **Admin**: username: `admin`, password: `admin123`
- **User**: email: `john@example.com`, password: `password123`

## License

MIT License

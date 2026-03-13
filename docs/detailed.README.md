# 🛒 OLX Clone — React + Firebase

A fully functional classified ads web application built with React and Firebase, inspired by OLX India. This is my 2nd React project, and through building it I learned a tremendous amount about real-world app development.

---

## 🌟 Live Features

- 🔐 Google Authentication
- 📦 Post, Edit & Delete Ads
- 🖼️ Image Upload via Cloudinary
- 🔥 Real-time data from Firebase Firestore
- 🗂️ Category-based filtering
- 🛡️ Protected Routes
- 📱 Fully Responsive UI
- ❤️ Wishlist UI
- 🔍 Product Detail Page

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Firebase Auth | Google login |
| Firestore | Database |
| Cloudinary | Image uploads |
| React Router v6 | Routing & navigation |
| Lucide React | Icons |
| React Firebase Hooks | Auth state management |

---

## 📁 Project Structure

```
OLX-Clone/
├── public/
├── src/
│   ├── assets/
│   │   └── images/          # Category icons (Cars, Bikes, etc.)
│   ├── components/
│   │   ├── Header.jsx        # Navbar with search, login, sell button
│   │   ├── CategoryBar.jsx   # Top category pills bar
│   │   ├── CategoryIcon.jsx  # Category icons grid
│   │   ├── ProductList.jsx   # Product cards grid
│   │   ├── Footer.jsx        # Links footer
│   │   ├── FooterBottom.jsx  # Brand logos footer
│   │   └── LoginModal.jsx    # Google login popup
│   ├── config/
│   │   └── firebase.js       # Firebase configuration
│   ├── context/
│   │   └── AuthContext.jsx   # Global auth state
│   ├── hooks/
│   │   └── useAuth.js        # Custom auth hook
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── CreateAd.jsx      # Post a new ad
│   │   ├── EditAd.jsx        # Edit existing ad
│   │   ├── MyList.jsx        # User's posted ads
│   │   ├── ProductDetails.jsx# Single product view
│   │   └── NotFound.jsx      # 404 page
│   ├── utils/
│   │   └── uploadImage.js    # Cloudinary upload helper
│   ├── App.jsx               # Routes configuration
│   ├── main.jsx              # App entry point
│   └── index.css             # Tailwind imports
├── .env                      # Environment variables (not committed)
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A Firebase account
- A Cloudinary account (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/olx-clone.git

# Navigate into the project
cd olx-clone

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔥 Firebase Setup

### 1. Create a Firebase Project
- Go to [console.firebase.google.com](https://console.firebase.google.com)
- Click **Add Project** and follow the steps

### 2. Enable Google Authentication
- Go to **Authentication → Sign-in method**
- Enable **Google** and click Save

### 3. Create Firestore Database
- Go to **Firestore Database → Create Database**
- Start in **test mode** (update rules before production)

### Firestore Rules
```js
rules_version = '2';
service cloud.firestore.database {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Firestore Product Document Structure
Each product document in the `products` collection contains:

```json
{
  "title": "iPhone 13 Pro Max 256GB",
  "price": "₹ 75,000",
  "description": "Used for 6 months, excellent condition",
  "category": "Mobiles",
  "location": "Kozhikode, Kerala",
  "img": "https://cloudinary.com/...",
  "images": ["url1", "url2"],
  "userId": "firebase_user_uid",
  "userName": "Muhammad Safvan",
  "userPhoto": "https://google_photo_url",
  "featured": false,
  "date": "TODAY",
  "createdAt": "firebase_timestamp"
}
```

---

## ☁️ Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets**
3. Click **Add upload preset**
4. Set **Signing Mode** to `Unsigned`
5. Name it `olx_preset` (or whatever you put in `.env`)
6. Copy your **Cloud Name** from the Dashboard

---

## 📄 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/product/:id` | Product Details | Public |
| `/create-ad` | Post New Ad | 🔐 Login required |
| `/myList` | My Ads | 🔐 Login required |
| `/edit-ad/:id` | Edit Ad | 🔐 Login required |
| `*` | 404 Not Found | Public |

---

## 🧠 What I Learned Building This

This was my **2nd React project** and it was a huge learning experience. Here's what I picked up:

### React Concepts
- **Component-based architecture** — breaking UI into reusable pieces
- **Props & state management** — passing data between components
- **useEffect & useState hooks** — managing side effects and local state
- **Context API** — sharing global auth state without prop drilling
- **Custom hooks** — creating `useAuth()` for cleaner code
- **React Router v6** — client-side routing with protected routes
- **Conditional rendering** — showing different UI based on auth state

### Firebase
- **Firestore** — NoSQL real-time database, CRUD operations
- **Firebase Auth** — Google OAuth integration
- **Security Rules** — restricting read/write access
- **serverTimestamp** — storing server-side timestamps

### Other Skills
- **Tailwind CSS** — utility-first styling, responsive design
- **Cloudinary** — image upload using REST API without a backend
- **Environment variables** — keeping API keys secure with `.env`
- **Protected routes** — redirecting unauthenticated users
- **Async/Await** — handling promises cleanly
- **File uploads** — handling FormData for image uploads
- **React Router useParams** — reading dynamic URL parameters

---

## 🛠️ Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 📦 Dependencies

```bash
npm install firebase react-router-dom lucide-react react-firebase-hooks
npm install -D tailwindcss postcss autoprefixer
```

---

## 🙏 Acknowledgements

- Inspired by [OLX India](https://www.olx.in)
- Icons by [Lucide React](https://lucide.dev)
- Images hosted on [Cloudinary](https://cloudinary.com)
- Database & Auth by [Firebase](https://firebase.google.com)

---

## 👨‍💻 Author

**Muhammad Safvan**
- 📍 Kerala, India
- 🚀 2nd React Project — Still learning, always building!

---

> "The best way to learn is by building something real." 💪
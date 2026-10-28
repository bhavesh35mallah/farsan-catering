# Shreeji Homemade Gujarati Farsan & Catering Website

A modern, responsive, production-ready MERN stack web application built specifically for a small home-based catering and authentic Gujarati farsan business.

---

## 1. Features & Architectural Highlights

### Customer-Facing Experience
- **Rich Homemade Gujarati Food Aesthetic:** Warm cream/ivory palettes with saffron orange (`#C44D18`) and deep kothmir green (`#18633B`) accents.
- **Interactive Menu & Catalog:** Filter by category (Farsan, Namkeen, Gujarati Snacks, Sweets, Catering Packages, Festive Combos), instant search, and sorting.
- **Smart Shopping Cart:** Persisted in `localStorage`, quantity steppers, unit display, and real-time free delivery progress bar.
- **Server-Side Price Validation:** Backend never trusts frontend calculations. All product prices, line totals, delivery fees, and minimum order requirements are verified against MongoDB.
- **Checkout & Scheduling:** Choose between Home Delivery or Kitchen Pickup, calendar date picker (prevents past dates), selectable delivery time slots, and special dietary/packaging notes.
- **Automated Dual Email Notifications:** Upon order placement, Nodemailer dispatches an order alert to the business owner and a confirmation receipt to the customer. If email fails, the order is safely retained and flagged for review.
- **Catering Enquiry Portal:** Comprehensive event planner form for weddings, poojas, birthdays, and high-tea live farsan counters.
- **Mobile-First Experience:** Responsive mobile navigation, floating bottom cart button, and instant WhatsApp chat shortcut.
- **Receipt Printing:** Built-in printable kitchen order slips and customer receipts with CSS `@media print` styling.

### Admin Dashboard
- **Secure Authentication:** JWT-based protected routes with bcrypt password hashing.
- **Kitchen Dashboard Overview:** Live KPI counters for total sales, new orders, preparing batches, out for delivery, and completed orders.
- **Product & Inventory Management:** Add/edit products, sample prices, packaging units, upload product images, toggle daily stock availability with one click, mark featured items, and manage categories.
- **Order Tracking & Fulfillment:** Search orders, filter by status or date, inspect customer address and phone, update order preparation stage (`New` → `Accepted` → `Preparing` → `Ready for Pickup` → `Out for Delivery` → `Completed`), and save internal kitchen notes.
- **Catering Inquiries Manager:** Track party quotes, update enquiry statuses, and manage guest requirements.
- **Business Configuration:** Live adjustment of business hours, contact numbers, notification email, minimum order value, delivery charges, free delivery thresholds, service area tags, and store closure / holiday notices.

---

## 2. Technology Stack

- **Frontend:** React.js 18, Vite 5, Tailwind CSS, Lucide React icons, Axios, React Router DOM 6
- **Backend:** Node.js, Express.js (ES Modules)
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Email:** Nodemailer with SMTP transporter & simulated fallback mode
- **Security:** Helmet, CORS, and Express Rate Limiting

---

## 3. Directory Structure

```text
farsan-catering/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # Navbar, Footer, ProductCard, CartDrawer, StickyMobileCart, WhatsAppButton
│   │   ├── context/            # CartContext, AuthContext, SettingsContext
│   │   ├── layouts/            # MainLayout, AdminLayout
│   │   ├── pages/              # Home, Menu, Cart, Checkout, OrderSuccess, Catering, Contact, Legal, 404
│   │   │   └── admin/          # AdminLogin, AdminDashboard, AdminProducts, AdminOrders, AdminCatering, AdminSettings
│   │   ├── services/           # api.js, productService, orderService, cateringService, settingsService, authService
│   │   ├── App.jsx             # React Router hierarchy
│   │   ├── index.css           # Tailwind setup & print stylesheets
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── config/                 # db.js, email.js
│   ├── controllers/            # authController, productController, orderController, cateringController, settingsController
│   ├── middleware/             # authMiddleware, errorHandler, uploadMiddleware
│   ├── models/                 # Admin, Category, Product, Order, CateringEnquiry, BusinessSettings
│   ├── routes/                 # Express API route modules
│   ├── scripts/                # seed.js (pre-populates authentic Gujarati farsan)
│   ├── services/               # emailService.js
│   ├── templates/              # HTML email templates for orders & catering
│   ├── utils/                  # calculateOrderTotals, generateOrderNumber
│   ├── uploads/                # Product images directory
│   ├── app.js                  # Express app setup
│   ├── server.js               # Entrypoint & listener
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json                # Root scripts
└── README.md
```

---

## 4. Linux Setup & Installation Guide

### Prerequisites
Ensure Node.js (>= 18.0.0), npm, and MongoDB are installed and running on your Linux system:

```bash
# Verify Node and npm
node -v
npm -v

# Ensure MongoDB service is active
sudo systemctl status mongod
# If not running:
sudo systemctl start mongod
```

### Step 1: Install Dependencies

```bash
cd farsan-catering

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

Create your `.env` file in `farsan-catering/server/`:

```bash
cd ../server
cp .env.example .env
```

Your `server/.env` configuration:

```ini
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

# MongoDB Connection String
MONGODB_URI=mongodb://127.0.0.1:27017/farsan_catering

# Admin JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_2026

# Default Initial Admin Credentials
ADMIN_NAME=Shreeji Admin
ADMIN_EMAIL=admin@shreejifarsan.com
ADMIN_PASSWORD=Admin@Farsan2026!

# SMTP Configuration (Nodemailer)
# If left blank, the app runs in simulated mode logging email details to the console
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
SENDER_EMAIL=your_email@gmail.com
BUSINESS_NOTIFICATION_EMAIL=orders@shreejifarsan.com
```

> **Note on Email:** If `SMTP_HOST` or `SMTP_USER` is empty, the application automatically runs in **simulated fallback mode**. Orders and catering enquiries will still succeed normally, and complete email content will be logged to the server terminal.

---

## 5. Seed Database with Sample Gujarati Products

Run the automated seeder script to populate categories, authentic Gujarati products, business settings, and the initial admin account:

```bash
cd farsan-catering/server
npm run seed
```

This populates realistic items including:
- **Nylon Khaman Dhokla** (500 g)
- **Silky Khandvi** (500 g)
- **Crispy Fafda & Papaya Sambharo** (500 g)
- **Gujarati Steamed & Crisped Patra** (500 g)
- **Dakori Methi Gota** (500 g)
- **Winter Special Lilva Kachori** (500 g)
- **Mini Cocktail Samosa** (12 pcs)
- **Bhavnagri Gathiya & Nylon Sev** (500 g)
- **Homemade Methi Thepla** (Pack of 15)
- **Pure Ghee Mohan Thal** (500 g)
- **Festive Deluxe Farsan Gift Box** (1 kg)
- **Live High Tea Farsan Package** (Per person)

---

## 6. Running the Application

### Development Mode

Run server and client concurrently or in two separate terminals:

**Terminal 1 (Backend Server):**
```bash
cd farsan-catering/server
npm run dev
# Server runs on: http://localhost:5000
# Health check:  http://localhost:5000/api/health
```

**Terminal 2 (Frontend Client):**
```bash
cd farsan-catering/client
npm run dev
# Vite client runs on: http://localhost:5173
```

Now open **http://localhost:5173** in your browser.

---

## 7. Admin Credentials

- **Portal URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@shreejifarsan.com`
- **Password:** `Admin@Farsan2026!`

*(You can update password and notification email anytime inside the database or via environment variables.)*

---

## 8. Verification & Order Workflow Testing

1. **Browse Food Items:** Open `http://localhost:5173/menu`, filter by category, or search for "Dhokla" or "Fafda".
2. **Add to Cart:** Select quantities and click "Add to Cart". Notice the cart badge and free delivery indicator bar.
3. **Checkout:** Open `http://localhost:5173/checkout`. Fill in customer name, mobile number, delivery address, date, and preferred time slot.
4. **Place Order:** Click "Place Order". The server validates prices from MongoDB, generates reference `SJF-XXXXXX`, saves the order, triggers emails, and clears the cart.
5. **View Success & Print Receipt:** You are redirected to `/order-success/:orderNumber` with itemized bill and print/WhatsApp buttons.
6. **Admin Verification:** Log into `/admin/login`, navigate to **Orders Management**, review the order, update status to `Preparing` or `Ready for Pickup`, and save kitchen notes.
7. **Catering Flow:** Visit `/catering`, fill out party guest count and menu, submit the form, and inspect the enquiry under `/admin/catering`.

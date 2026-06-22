# Foler Raja - Premium Fruit E-Commerce Platform

**Foler Raja** is a specialized, full-stack e-commerce solution designed specifically for the seasonal fruit business (Mango, Litchi, etc.). Built with **Next.js 15**, **Express.js**, and **Prisma**, the platform addresses real-world logistical challenges like weight-based units (KG/Mon), pre-order management for harvest cycles, and automated business reporting.

---

## Project Links
- **Live Demo:** [Frontend](https://mango-ecommerce-app.vercel.app)
- **Backend API:** [Backend](https://mango-ecommerce-server.onrender.com)
- **Frontend Repository:** [GitHub Link](https://github.com/nabilsiddik/MANGO_ECOMMERCE_APP)
- **Backend Repository:** [GitHub Link](https://github.com/nabilsiddik/MANGO_ECOMMERCE_SERVER)

---

## Key Features

### Customer Experience
*   **Advanced Shop Engine:** Full SSFP (Searching, Sorting, Filtering, Pagination) implemented via URL query parameters for SEO and shareable filtered links.
*   **Specialized Unit System:** Unique logic for handling **KG**, **MON** to cater to both retail and wholesale fruit buyers.
*   **Intelligent Cart:** Prevents mixing standard and **Pre-order** items to ensure accurate shipping timelines and logical logistics.
*   **Searchable Checkout:** Integrated 64-district and Thana database of Bangladesh with dynamic shipping fee calculation (Inside/Outside Dhaka).
*   **User Dashboard:** Orders tracking with a visual stepper, wishlist management, and personal shopping analytics.
*   **Verified Reviews:** Only customers with "Delivered" orders can post reviews with image uploads to ensure social proof.

### Admin Management
*   **Business Overview:** Real-time data visualization using **Recharts** (Area & Pie charts) tracking revenue and category distribution.
*   **Automated PDF Reporting:** One-click generation of professional sales reports using **Puppeteer**.
*   **Dynamic Inventory:** Control over stock status (In Stock/Out of Stock/Pre-Order), "Low Stock" alerts, and product-specific review toggles.
*   **Security:** Role-Based Access Control protecting sensitive routes and data.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Authentication** | JSON Web Tokens (JWT), HTTP-Only Cookies |
| **Media** | Cloudinary (Storage), Multer (Processing) |
| **Analytics** | Recharts, Date-fns |
| **Reporting** | Puppeteer (PDF Generation) |

---

## 📦 Installation & Setup

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/nabilsiddik/MANGO_ECOMMERCE_SERVER.git
cd MANGO_ECOMMERCE_SERVER

# Install dependencies
npm install

# Setup Prisma
npx prisma generate
npx prisma migrate dev

# Start development
npm run dev
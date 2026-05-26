# EternalTie - Modern Full-Stack Wedding Invitation Platform

A premium SaaS platform for creating elegant, mobile-responsive wedding invitations with real-time editing, music, RSVP, and luxury animations.

## Features
- **Luxury UI/UX**: Designed with Glassmorphism and Apple-inspired smooth animations.
- **Dynamic Builder**: Real-time editor for names, dates, venues, and themes.
- **Engagement Experience**: High-end "Open Invitation" interaction that unlocks background music.
- **RSVP Management**: Guests can RSVP directly on the site, stored in your database.
- **Analytics**: Track views for every invitation.
- **Responsive**: Pixel-perfect on iPhone, Android, and Tablets.

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for media storage)

## Installation

1. **Clone the repository**
2. **Install dependencies**
    Run this command in the root folder:
    `npm run install-all`

3. **Environment Setup**
    - Create a `.env` file in the `server` directory.
    - Use `server/.env.example` as a template and fill in your MongoDB URI, JWT Secret, and Cloudinary keys.

4. **Run the Application**
    From the root directory, run:
    `npm run dev`
    This will start both the Express backend (port 5000) and the Vite frontend (port 5173).

## Usage
- **Registration**: Create an account to access the dashboard.
- **Creating Invitations**: Click "New Invitation" in the dashboard.
- **Editing**: Use the editor to customize details and themes.
- **Sharing**: Copy your custom slug (e.g., `/invitation/john-and-jane`) and send it to guests.

## Deployment
- **Frontend**: Connect the `client` folder to Vercel or Netlify.
- **Backend**: Connect the `server` folder to Render or Railway.
- **Database**: Use MongoDB Atlas (Free Tier).

## Troubleshooting
- **Autoplay Issues**: Browsers block audio unless a user interacts. EternalTie solves this by requiring an "Open Invitation" click.
- **CORS Errors**: Ensure `FRONTEND_URL` in your server's `.env` matches your Vite URL.

# InvestPal Web App

InvestPal is a modern, AI-powered financial assistant designed to help users analyze market trends, track portfolios, and get real-time investment insights through a beautiful, generative UI interface.

## 🚀 Features

- **AI-Powered Insights**: Get answers to complex financial questions using our backend AI logic.
- **Generative UI**: Experience dynamic data visualization with real-time charts, tables, and asset cards.
- **Google Authentication**: Secure and easy login with Google.
- **Modern Dashboard**: A premium, responsive interface built with React and Tailwind CSS.
- **Real-time Performance**: Seamless chat experience with simulated streaming for assistant responses.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Authentication**: [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/)

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd InvestPalWebApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_INVESTPAL_API_BASE_URL=http://localhost:8000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Previews the production build locally.

## 📄 Documentation

For more detailed information, check out:
- [API Reference](docs/api_reference.md)
- [Google Auth Setup Guide](docs/setup_google_auth.md)

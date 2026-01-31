# How to Create a Google OAuth 2.0 Client ID

Follow these steps to generate the Client ID needed for `src/main.jsx`.

## 1. Google Cloud Console
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create a Project**: Click the project dropdown (top left) > **New Project**. Name it "InvestPal" and click **Create**.

## 2. Configure OAuth Consent Screen
1.  Navigate to **APIs & Services** > **OAuth consent screen**.
2.  Select **External** (unless you have a Google Workspace organization) and click **Create**.
3.  **App Information**:
    -   App Name: `InvestPal`
    -   User Support Email: Your email.
4.  **Developer Contact Information**: Your email.
5.  Click **Save and Continue** through the remaining steps (Scopes, Test Users).
    -   *Note*: For testing, you must add your own email as a **Test User** if the app status is "Testing".

## 3. Create Credentials
1.  Navigate to **APIs & Services** > **Credentials**.
2.  Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
3.  **Application Type**: Select **Web application**.
4.  **Name**: `InvestPal Web Client`.
5.  **Authorized JavaScript origins**:
    -   Add: `http://localhost:5173` (Vite's default port)
    -   Add: `http://localhost:8000` (Optional, if needed for backend testing)
6.  **Authorized redirect URIs**:
    -   Add: `http://localhost:5173`
    -   Add: `http://localhost:5173/`
7.  Click **Create**.

## 4. Copy Client ID
1.  A modal will appear with your **Client ID** and **Client Secret**.
2.  Copy the **Client ID** (ends in `.apps.googleusercontent.com`).
3.  Paste it into `src/main.jsx` replacing `YOUR_GOOGLE_CLIENT_ID`.

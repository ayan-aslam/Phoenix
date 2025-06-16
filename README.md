# Phoenix Survey App

## Overview
Phoenix is a full-stack survey platform that enables users to create, send, and track email surveys. Recipients can respond directly from their email, and results are collected and displayed in a dashboard. The app uses Google OAuth for authentication and Stripe for payments. It is designed for rapid feedback collection, making it ideal for product teams, educators, and event organizers.

### User Workflow
1. **Sign in with Google** (OAuth 2.0)
2. **Purchase credits** via Stripe (required to send surveys)
3. **Create a survey** (title, subject, body, recipient emails)
4. **Send survey** — recipients receive an email with Yes/No links
5. **Recipients click a link** — their response is recorded instantly
6. **View results** in the dashboard

## Technologies Used
- **Frontend:** React, Redux, Redux-Form, Materialize CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** Passport.js (Google OAuth 2.0)
- **Email:** SendGrid
- **Payments:** Stripe
- **Proxy:** http-proxy-middleware
- **Tunneling (for local webhook testing):** ngrok

## Features
- Google OAuth login
- Create and send surveys to multiple recipients
- Collect responses via email links (tracked via webhooks)
- Dashboard to view survey results
- Stripe integration for credit purchases
- Modern, responsive UI

---

## Local Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Phoenix/server
```

### 2. Install dependencies
```bash
npm install
cd client
npm install
```

### 3. Set up your Google, Stripe, SendGrid, and MongoDB accounts
- **Google OAuth:** Create a project at https://console.developers.google.com, enable OAuth, and set the callback URL (see below).
- **Stripe:** Create an account at https://dashboard.stripe.com, get your test keys.
- **SendGrid:** Create an account at https://sendgrid.com, get your API key, and set up Event Webhooks.
- **MongoDB:** Create a cluster at https://cloud.mongodb.com and get your connection URI.

### 4. Create your `dev.js` config file
Create a file at `server/config/dev.js` with the following structure:

```js
module.exports = {
  googleClientID: '<YOUR_GOOGLE_CLIENT_ID>',
  googleClientSecret: '<YOUR_GOOGLE_CLIENT_SECRET>',
  mongoURI: '<YOUR_MONGODB_URI>',
  cookieKey: '<A_RANDOM_STRING>',
  stripePublishableKey: '<YOUR_STRIPE_PUBLISHABLE_KEY>',
  stripeSecretKey: '<YOUR_STRIPE_SECRET_KEY>',
  sendGridKey: '<YOUR_SENDGRID_API_KEY>',
  redirectDomain: '<YOUR_NGROK_HTTPS_URL>' // e.g. https://xxxx.ngrok-free.app
};
```
**Important:**
- All values must be filled with your own credentials.
- `redirectDomain` should be set to your ngrok HTTPS endpoint when testing locally.
- See `server/config/dev.js` for the actual file used by the app.

### 5. Set up ngrok for local webhook/email testing
- Download and install ngrok from https://ngrok.com/
- Start your backend server:
  ```bash
  node index.js
  # or
  npm run dev
  ```
- In a new terminal, run:
  ```bash
  ngrok http 5000
  ```
- Copy the HTTPS URL provided by ngrok (e.g., `https://xxxx.ngrok-free.app`) and set it as `redirectDomain` in your `dev.js`.
- In your SendGrid dashboard, set the webhook/event notification URL to your ngrok endpoint (e.g., `https://xxxx.ngrok-free.app/api/surveys/webhooks`).
- In your Google Cloud Console, set the OAuth callback URL to `https://xxxx.ngrok-free.app/auth/google/callback`.

### 6. Start the client
```bash
cd client
npm start
```

### 7. Starter scripts
- `npm run dev` (from `server/`): Starts both backend and frontend with nodemon and concurrently.
- `npm start` (from `client/`): Starts the React development server.

---

## Code Reference: Where to Update URLs, Keys, and Endpoints
- **`server/config/dev.js`**: All API keys, MongoDB URI, Stripe, SendGrid, and `redirectDomain` (ngrok endpoint for local testing)
- **`server/config/prod.js`**: All values are loaded from environment variables. Set these on your deployment platform.
- **`server/services/emailTemplates/surveyTemplate.js`**: Uses `keys.redirectDomain` for survey links. Must match your ngrok or production domain.
- **`server/services/passport.js`**: `callbackURL` for Google OAuth must match your Google Cloud Console settings and your current environment (ngrok or production domain).
- **`server/client/src/setupProxy.js`**: Proxy target should match your backend server URL (usually `http://localhost:5000` in development).
- **`server/routes/surveyRoutes.js`**: Handles survey creation, webhook, and response routes. Webhook endpoint: `/api/surveys/webhooks`.

---

## Main File Structure
- **`server/index.js`**: Main Express server entry point
- **`server/routes/`**: All API route handlers (auth, billing, surveys)
- **`server/models/`**: Mongoose models (User, Survey, Recipient)
- **`server/services/`**: Passport config, Mailer, email templates
- **`server/client/`**: React frontend (see `src/` for components, actions, reducers)

---

## Known Issues & Future Fixes
- **Not production ready:** The app is currently for development only. All environment variables and production configs must be set up before deploying.
- **Proxy bug with Google OAuth:** The proxy sometimes fails during Google OAuth unless the callback URL is hardcoded. This may require further proxy or environment configuration.
- **Webhook reliability:** If you change your ngrok URL, update it everywhere (dev.js, SendGrid, Google Console).
- **No automated tests:** Add tests for routes and React components in the future.
- **Production deployment:** Add scripts and documentation for deploying to Heroku, Vercel, or another platform.

---

## Troubleshooting & Tips
- If OAuth login fails, check your callback URL in both Google Console and `passport.js`.
- If webhooks are not received, check your ngrok tunnel and SendGrid event settings.
- If you see CORS or proxy errors, verify the target in `setupProxy.js` and that your backend is running.
- Always restart your server after changing config files.

---

## Example `dev.js` structure
```js
module.exports = {
  googleClientID: '<YOUR_GOOGLE_CLIENT_ID>',
  googleClientSecret: '<YOUR_GOOGLE_CLIENT_SECRET>',
  mongoURI: '<YOUR_MONGODB_URI>',
  cookieKey: '<A_RANDOM_STRING>',
  stripePublishableKey: '<YOUR_STRIPE_PUBLISHABLE_KEY>',
  stripeSecretKey: '<YOUR_STRIPE_SECRET_KEY>',
  sendGridKey: '<YOUR_SENDGRID_API_KEY>',
  redirectDomain: '<YOUR_NGROK_HTTPS_URL>'
};
```

---

## Contributing
- Fork the repo and create a feature branch.
- Add clear comments where configuration is needed (see code reference above).
- Submit a pull request with a description of your changes.

---

## Final Notes
- Always keep your API keys and secrets private. Never commit them to a public repository.
- For production, use environment variables and never hardcode secrets.
- If you encounter issues with OAuth or webhooks, double-check your URLs, ngrok endpoint, and proxy configuration.
- For more help, see the code comments in the referenced files above.

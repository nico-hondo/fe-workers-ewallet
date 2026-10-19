# The Worker Wallet — E-Wallet Frontend

![React](https://raster.shields.io/badge/React-19.2.8-087EA4.png?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://raster.shields.io/badge/Vite-8.3.0-646CFF.png?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://raster.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4.png?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://raster.shields.io/badge/Redux_Toolkit-2.13.0-764ABC.png?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://raster.shields.io/badge/React_Router-8.4.0-CA4245.png?style=for-the-badge&logo=reactrouter&logoColor=white)

**Worker Wallet** is a responsive, React-based e-wallet web application developed as a collaborative frontend project by **The Workers**. It provides interfaces for account authentication, a wallet dashboard, money transfers, top-ups, transaction history, and account management.

The frontend is built with **Vite** and **Tailwind CSS** and uses **Redux Toolkit** to manage authentication and user data. Authentication and profile management communicate with the team's backend API.

## Technologies

| Technology                           | Purpose                                                 |
| ------------------------------------ | ------------------------------------------------------- |
| **React 19.2.8**                     | Component-based user interfaces                         |
| **Vite 8.3.0**                       | Development server and production bundling              |
| **Tailwind CSS 4.3.3**               | Responsive, utility-first styling                       |
| **React Router 8.4.0**               | Client-side navigation and protected routes             |
| **Redux Toolkit 2.13.0**             | Asynchronous API actions and application state          |
| **React Redux 9.3.0**                | Connecting React components to the Redux store          |
| **Redux Persist 6.0.0**              | Persisting selected authentication state across reloads |
| **React Hook Form 7.90.0**           | Form state and validation support                       |
| **React Icons 5.7.0**                | Interface icons                                         |
| **React Toastify 11.1.0**            | User-facing toast notifications                         |
| **react-chartjs-2 5.3.1 / Chart.js** | Dashboard data visualization                            |
| **ESLint 10.10.0**                   | Code quality and linting                                |

Version numbers for direct dependencies are based on the supplied `package.json`. Some installed versions may vary within the declared semver ranges; use `package-lock.json` for the locked dependency tree.

## Features

### Authentication and Account Access

- User registration and login forms.
- Logout and password recovery interfaces.
- Protected application routes using a token check.
- Authentication state managed with Redux Toolkit and persisted using Redux Persist.
- Toast notifications for feedback and error messages.

### Dashboard

- Wallet balance, income, and expense interface.
- Financial activity chart and recent transaction list.
- Quick navigation to Transfer, Top Up, and History.

### Money Transfer

The transfer interface has three steps:

1. **Find People** — Search recipients by name or phone number, select a contact, and mark favorites.
2. **Set Nominal** — Enter an amount and optional notes, then open a six-digit PIN modal.
3. **Finish** — Display a transfer summary with transaction information and actions such as **Send Again**.

The transfer flow includes success and failure modal UI. The current source uses local contact data and a simulated success transition rather than a verified transfer API call.

### Top Up

- Top-up form with amount and payment-method selection.
- Six-digit PIN entry modal.
- Navigation within the top-up flow.

### Transaction History

- Transaction list and transaction detail modal.
- Search/filter UI and local deletion interaction.
- Responsive layouts for mobile and desktop.

### Profile and Security

- Display and update profile data, including selected avatar image.
- Change password interface.
- Change PIN and Set PIN interfaces.

## Application Routes

| Route                   | Page                  | Access    |
| ----------------------- | --------------------- | --------- |
| `/`                     | Landing page          | Public    |
| `/auth`                 | Login                 | Public    |
| `/auth/register`        | Register              | Public    |
| `/auth/forgot-password` | Password recovery     | Public    |
| `/dashboard`            | Wallet dashboard      | Protected |
| `/transfer`             | Money transfer        | Protected |
| `/transfer/info`        | Recipient information | Protected |
| `/history`              | Transaction history   | Protected |
| `/top-up`               | Top-up                | Protected |
| `/profile`              | Profile settings      | Protected |

Protected routes use the `PrivateRoute` component, which checks for the presence and expiration of an authentication token.

## Getting Started

### Prerequisites

Install the following tools before running the project:

- **Git**
- **Node.js 22.22.0 or newer** (Node.js 24 LTS is also suitable)
- **npm**
- Access to the team's backend API for authentication and profile requests

> **Note:** This repository contains the frontend. Backend endpoints and the API base URL must be provided by the backend team. A Dockerfile or Docker Compose setup for this frontend is not included in the supplied project archive.

### Clone the Repository

The supplied project archive lists the following team repository as its `upstream` remote:

```bash
git clone https://github.com/rcontrisha/fe-workers-ewallet.git
cd fe-workers-ewallet
```

Alternatively, if you have received the source as a ZIP, extract it and open the `E-wallet_FE` folder in a terminal.

### Install Dependencies

```bash
npm ci
```

`npm ci` installs dependencies using the included `package-lock.json`.

### Configure Environment Variables

Create a `.env` file in the frontend root directory (alongside `package.json`):

```dotenv
VITE_API_URL=http://localhost:8080
```

Replace `http://localhost:8080` with the **actual backend API base URL**, including its API prefix if required. This URL is only an example, not a confirmed backend address.

The application builds authentication and user-management requests from `VITE_API_URL`. If this variable is missing, the current frontend may throw an error when attempting an API request.

**Do not commit `.env` or backend secrets to Git.** Variables prefixed with `VITE_` are exposed in the browser bundle and must not contain private API keys or credentials.

### Run in Development Mode

```bash
npm run dev
```

Vite normally serves the application at:

`http://localhost:5173`

The actual address is displayed in the terminal and may differ if port 5173 is occupied.

### Build for Production

```bash
npm run build
```

This generates static build files in `dist/` when the project builds successfully.

To preview the build locally:

```bash
npm run preview
```

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the project        |

## Backend API Integration

The frontend uses native `fetch` requests and Redux Toolkit `createAsyncThunk` actions. The following paths are **referenced by the provided frontend source** and are appended to `VITE_API_URL`:

| Method   | Path                    | Frontend usage                              |
| -------- | ----------------------- | ------------------------------------------- |
| `POST`   | `/auth/register`        | Register user                               |
| `POST`   | `/auth/login`           | Login user                                  |
| `POST`   | `/auth/logout`          | Logout user                                 |
| `POST`   | `/auth/forgot-password` | Request a password reset                    |
| `POST`   | `/auth/reset-password`  | Reset password                              |
| `GET`    | `/user/profile`         | Retrieve profile                            |
| `PATCH`  | `/user/update`          | Update profile                              |
| `DELETE` | `/user/avatar`          | Delete stored avatar (async action present) |
| `PATCH`  | `/user/change-password` | Change password                             |
| `PATCH`  | `/user/change-pin`      | Change PIN                                  |
| `POST`   | `/user/pin`             | Set PIN                                     |

This table documents frontend requests; it does **not** verify that every backend route is live or that the backend accepts all request schemas. Confirm endpoint behavior with the backend team.

## Collaboration

Developed as a collaborative project by **The Workers**. Follow the team's Git branching and code-review conventions when contributing, and coordinate API contracts with backend contributors before changing request payloads or response handling.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Related Repositories

- **Backend Repository:** [api-workers-ewallet](https://github.com/rcontrisha/api-workers-ewallet)

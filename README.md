# VehicleVault

VehicleVault is a car comparison system designed to help buyers make better
decisions before purchasing a car. Users can compare two cars, review their
similarities and differences, and understand the benefits and drawbacks of
each option through a simple online interface.

The system includes:

- User login for accessing car search and comparison features
- Admin control for managing cars and posting notifications
- Car suggestions for comparison based on the user's selected vehicle
- Accessory recommendations for the selected car

## Abstract

Before buying a car, it is useful to compare its features and characteristics
with other available options. VehicleVault focuses on helping buyers estimate
the similarities and dissimilarities between two cars. A user can select two
cars, and the system generates a brief report highlighting their benefits and
defects. This helps users analyze vehicles effectively and make a better
purchase decision.

The system also includes an admin login with full control over car postings and
notifications. After logging in, users can search for a car, view possible
comparison options, and evaluate a variety of features side by side. An
additional advantage of the system is that it suggests the best accessories for
the selected car.

This frontend is built with React and Vite. The original project concept
references a .NET platform with a SQL database for storing user-specific
details, while this repository currently contains the React frontend layer.

## Backend setup

A backend server has been added in the `backend` folder. It exposes API endpoints for:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/cars`
- `GET /api/cars/:id`

### Run the backend

1. Open a terminal in `backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
4. Start the server: `npm run dev`

### Run the frontend

1. At the workspace root run: `npm install`
2. Start the app: `npm run dev`

The frontend reads `VITE_API_URL` from `.env` and connects to the backend at `http://localhost:5000/api`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

React Native (Expo) app for **Buzz**, a carpooling (ride-sharing) app with driver/passenger roles, in-app chat, and Stripe payments. The backend REST API lives in a sibling repo, `AppBuzzBack`.

## Commands

```bash
yarn install         # or npm install — yarn.lock is the committed lockfile
yarn start           # expo start
yarn ios / yarn android / yarn web
```

Requires a `.env` (gitignored) with Expo public env vars, read via `process.env.EXPO_PUBLIC_*` (inlined at build time by Expo — no central config module):
- `EXPO_PUBLIC_API_URL` — base URL of the backend, read directly in individual screens/navigators (no shared API client)
- `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` — passed to `StripeProvider` in `App.js`

No test runner is configured for this app.

## Architecture

- `App.js` is the provider root: `StripeProvider` → Redux `Provider` → `AppContent`, which hydrates the persisted user from `AsyncStorage` (key `"user"`) into Redux on launch before rendering navigation, showing a spinner until that hydration finishes.
- **Navigation** (`navigation/`): `RootNavigator` picks `AuthNavigator` vs. the authenticated stack based on `state.user.value.token` (no dedicated auth-check screen — presence of a token in Redux is the only gate). The authenticated stack registers both `MainTabs` (passenger bottom tabs: Home/Trips/Messages) and `DriverTabs` (driver bottom tabs: Home/Trips/Messages) plus every other screen as siblings in one flat native-stack — screens are not re-nested per role beyond the two tab navigators. `AuthNavigator` covers Home/Connexion/Inscription.
- **Redux** (`redux/`): two slices only. `reducers/user.js` mirrors the backend `users` schema closely (token, profile fields, `car`, `driverProfile`, Stripe customer/payment-method ids) and is the source of truth for `isAuthenticated`. `reducers/rides.js` holds transient UI/search state (search results, search params, selected ride, driver's rides, passenger's bookings, unread-messages badge count) — this is not persisted, only `user` is written back to `AsyncStorage` by individual screens.
- **No shared API/service layer or navigation types.** Screens call `fetch` directly against `${EXPO_PUBLIC_API_URL}/...` and pass `user.token` explicitly per request (matching the backend's token-in-URL/body auth pattern); there's no interceptor, no typed client, no centralized error handling — each screen handles its own try/catch and `Alert`.
- Screens are organized flat under `screens/` (~34 files) and are prefixed by role/domain (`Driver*`, `Passenger*`) rather than nested in folders; shared UI lives in `components/` (e.g. `CustomButton`, `MainHeader`, `ride.js`/`review.js` list-item renderers).
- Uses `react-native-maps` + `expo-location` for map/geolocation screens (search, trip tracking), `expo-camera`/`expo-image-picker` for document/photo capture, and `react-native-qrcode-svg` for the passenger QR / driver QR-scanner presence-validation flow that mirrors the backend's `passengerPresenceStatus` (scanned/manual/absent).

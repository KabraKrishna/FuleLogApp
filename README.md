# Fuel Tracker Pro

Fuel Tracker Pro is a lightweight PWA for tracking vehicle fuel, service history, reminders, ownership cost, and trend insights. It is built as a static web app with Firebase support for authenticated cloud sync.

## Current Release

**Version:** `v2.9.4`

## Key Features

- **Home dashboard**
  - Average MPG, last tank MPG, cost per mile, monthly spend
  - Decision cues for efficiency, spend pace, and cost mix
  - Trend charts for MPG, fuel price, cost per mile, monthly spend, and fuel/service split
  - Monthly summary selector with spend, gallons, miles, MPG, and entries

- **Add entries**
  - Fuel and service entry modes
  - Local-date defaulting
  - Last-value autofill
  - Odometer and required-field validation
  - Service types aligned to reminder rules

- **Timeline**
  - Fuel/service separation
  - Search and date filters behind an advanced filter control
  - Sort by date, odometer, cost high, and cost low

- **Garage**
  - Vehicle profile wall with car profile image
  - Vehicle profile fields for year, make, model, fuel type, plate, VIN, starting odometer, and notes
  - NHTSA vPIC-powered year/make/model dropdown support
  - Masked license plate and VIN display
  - VIN copy-to-clipboard
  - Three-dot action menu for edit, archive/restore, and delete

- **Reminders and alerts**
  - Default reminders for tire rotation, oil change, air filter replacement, and inspection
  - Reminders are disabled by default for first-time setup
  - Reminder calculations use matching service entries
  - Alert popup for actionable items
  - Test Air Filter alert for UAT validation

- **Data management**
  - JSON backup/export
  - Restore preview with vehicles, logs, reminders, and archived vehicle counts
  - CSV export
  - Schema-aware import normalization

- **PWA support**
  - App manifest
  - Service worker cache
  - Offline asset caching
  - Firebase Messaging service-worker scaffold for production push notification readiness

## Project Structure

| File | Purpose |
|---|---|
| `index.html` | Main application UI, state, rendering, validation, Firebase integration |
| `sw.js` | PWA service worker and cache versioning |
| `firebase-messaging-sw.js` | Firebase Cloud Messaging background notification handler |
| `manifest.json` | PWA metadata |
| `icon-192.png` | PWA icon |
| `icon-512.png` | PWA icon |
| `car-profile.png` | Generic vehicle profile image used in Garage cards |
| `backup.json` | Optional development/UAT sample data |

## Running Locally

Serve the project as static files. For local development, use:

```bash
npx serve . -l 4173
```

Then open:

```text
http://localhost:4173/?mode=dev
```

Dev mode loads sample data from `backup.json` when available.

## Firebase Notes

Production/UAT Firebase support expects:

- Google Authentication enabled
- Firestore enabled
- UAT domain added to Firebase authorized domains
- Firestore rules scoped to authenticated users
- Hosting served over HTTPS

Push notifications require:

- Firebase Cloud Messaging enabled
- Web Push certificate / VAPID key
- `FIREBASE_MESSAGING_VAPID_KEY` configured in `index.html`
- A backend scheduler or Cloud Function for scheduled reminder push delivery

The app currently supports device registration for push notifications. In-app alerts work without backend scheduling.

## UAT Deployment Checklist

Copy these files to the UAT branch/repo:

- `index.html`
- `sw.js`
- `firebase-messaging-sw.js`
- `car-profile.png`
- `manifest.json`
- `icon-192.png`
- `icon-512.png`
- `backup.json` only if UAT needs sample data

After deployment:

1. Open UAT in a fresh browser session.
2. Sign in.
3. Add a vehicle profile.
4. Confirm Garage card image loads.
5. Edit and save a vehicle profile.
6. Add fuel and service entries.
7. Confirm reminder and alert updates.
8. Test the Air Filter alert by logging the suggested service entry.
9. Export and restore a backup.
10. Confirm the service worker cache version is `fuel-tracker-v2.9.4`.

## Data Privacy Notes

- VIN and license plate values are masked in normal card display.
- VIN can be copied from the Garage card.
- Backup files may contain sensitive vehicle details. Treat exported JSON files as private data.

## Release Branch

Recommended UAT branch:

```text
dev-2.9.4
```

Recommended commit message:

```text
Prepare Fuel Tracker v2.9.4 for UAT
```

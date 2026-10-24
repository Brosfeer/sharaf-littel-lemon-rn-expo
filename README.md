# Little Lemon Food Ordering App

A React Native Expo mobile application for Little Lemon Mediterranean Restaurant, built with Expo Router, TypeScript, and AsyncStorage.

## Features
- **Onboarding Screen**: User registration with input validation for First Name and Email.
- **Home Screen**: Mediterranean dishes catalog, live debounced dish search, and delivery category filter chips (Starters, Mains, Desserts, Drinks).
- **Profile Screen**: User profile details management, automatic phone number formatting, notification preferences, and logout capability.
- **Local Persistence**: State and user settings persist across app restarts using AsyncStorage.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Application
```bash
# Start development server
npx expo start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Tech Stack
- React Native & Expo SDK
- Expo Router
- TypeScript
- React Native Async Storage
- Vector Icons

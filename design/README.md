# Little Lemon — Design & Wireframe Specifications

This directory contains the authentic design assets, wireframes, and production UI specifications for the **Little Lemon** React Native Expo application.

---

## 📁 Asset Inventory

### 📐 Wireframes (`design/wireframes/`)
1. **`01_home_wireframe_breakdown.png`**:
   - Navigation Bar: Logo, Profile Avatar button.
   - Hero Section: Heading (Name), Sub-Heading, About description, Hero dish image, Search bar.
   - Menu Breakdown: "Order for Delivery" heading, Category filter buttons (Starters, Mains, Desserts, Drinks).
   - Menu Items List: Vertically scrollable list of dishes with Name, Description, Price, and Dish thumbnail.
2. **`02_home_wireframe_structure.png`**:
   - Layout hierarchy diagram defining the four vertical layers: Header, Hero, Menu Breakdown, and Food Menu List.

### 🎨 Actual Production UI Mockups (`design/actual_design/`)
1. **`01_home_screen.png`**:
   - Complete Home Screen layout with authentic Little Lemon brand colors, hero banner, category chips, and styled dish items.
2. **`02_onboarding_screen.png`**:
   - Onboarding flow with top logo, hero Mediterranean branding, and input fields for First Name and Email with validation.
3. **`03_profile_screen.png`**:
   - Profile & Personal Information screen:
     - Header with back button, Little Lemon logo, and avatar.
     - Avatar management with "Change" and "Remove" actions.
     - Profile fields: First Name, Last Name, Email, Phone Number.
     - Email notifications preferences with custom checkboxes (Order statuses, Password changes, Special offers, Newsletter).
     - Full-width "Log out" button.
     - Action buttons: "Discard changes" and "Save changes".

---

## 🎨 Design System Tokens

### Color Palette
- **Primary Olive Green**: `#495E57` (Hero section background, primary buttons)
- **Primary Lemon Yellow**: `#F4CE14` (Hero title, Log out button)
- **Secondary Salmon**: `#EE9972`
- **Secondary Peach**: `#FBDABB`
- **Highlight Light**: `#EDEFEE` (Category chips background, subtext)
- **Highlight Dark**: `#333333` (Headings, primary body text)
- **Surface White**: `#FFFFFF` (Card background, input backgrounds)
- **Border Neutral**: `#DFE2E0` (Input borders, dividers)
- **Placeholder / Subdued**: `#8B95A5`

### Typography Hierarchy
- **Brand Title**: 36–40pt, Bold Serif (`#F4CE14` on Hero)
- **Section Subtitle**: 24pt, Medium / Regular Serif (`#FFFFFF` on Hero)
- **Section Headers**: 18–20pt, Bold Sans-Serif (`#333333`)
- **Body & Descriptions**: 14–15pt, Regular Sans-Serif (`#495E57` / `#666666`)
- **Button Labels**: 16pt, Semi-Bold Sans-Serif

### Micro-Interactions & Usability
- Real-time search filtering with debounced query execution.
- Toggleable category filter pills allowing multi-select or single category filtering.
- Form validation: Onboarding button enabled only when valid name and email are provided.
- Persistent user preferences stored locally in `@react-native-async-storage/async-storage`.

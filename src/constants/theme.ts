import { Platform } from 'react-native';

export const LittleLemonColors = {
  // Brand Core
  primaryGreen: '#495E57',
  primaryYellow: '#F4CE14',
  secondarySalmon: '#EE9972',
  secondaryPeach: '#FBDABB',

  // Surfaces & Backgrounds
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  highlightLight: '#EDEFEE',
  highlightDark: '#333333',

  // Text & Content
  textPrimary: '#333333',
  textSecondary: '#495E57',
  textMuted: '#718096',
  textLight: '#EDEFEE',
  textWhite: '#FFFFFF',

  // Borders & Dividers
  border: '#DFE2E0',
  inputBorder: '#CBD5E1',
  divider: '#E4E7E6',

  // Actions & States
  activeFilterBackground: '#495E57',
  activeFilterText: '#FFFFFF',
  inactiveFilterBackground: '#EDEFEE',
  inactiveFilterText: '#495E57',
  buttonYellow: '#F4CE14',
  buttonGreen: '#495E57',
  buttonDanger: '#E53E3E',
} as const;

export const Fonts = Platform.select({
  ios: {
    serif: 'Georgia',
    sans: 'System',
    sansBold: 'System',
  },
  android: {
    serif: 'serif',
    sans: 'sans-serif',
    sansBold: 'sans-serif-medium',
  },
  default: {
    serif: 'serif',
    sans: 'sans-serif',
    sansBold: 'sans-serif',
  },
});

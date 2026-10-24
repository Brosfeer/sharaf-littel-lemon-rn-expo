import { Platform } from 'react-native';

export const LittleLemonColors = {
  primaryGreen: '#495E57',
  primaryYellow: '#F4CE14',
  secondarySalmon: '#EE9972',
  secondaryPeach: '#FBDABB',

  darkBackground: '#495E57',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  highlightLight: '#EDEFEE',
  highlightDark: '#333333',

  filterActive: '#EE9972',
  filterActiveText: '#333333',
  filterInactive: '#495E57',
  filterInactiveText: '#FFFFFF',
  filterBorder: '#647A73',

  inactiveFilterBackground: '#EDEFEE',
  activeFilterBackground: '#495E57',
  activeFilterText: '#FFFFFF',
  inactiveFilterText: '#495E57',

  searchBackground: '#3D4F49',
  searchPlaceholder: '#A3B4AE',

  textPrimary: '#333333',
  textSecondary: '#495E57',
  textMuted: '#718096',
  textLight: '#EDEFEE',
  textWhite: '#FFFFFF',

  border: '#DFE2E0',
  inputBorder: '#CBD5E1',
  divider: '#5B7069',

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

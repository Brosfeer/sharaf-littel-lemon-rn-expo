import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, DEFAULT_USER_PROFILE } from '@/types/profile';

const STORAGE_KEYS = {
  USER_PROFILE: '@little_lemon_user_profile',
  ONBOARDING_STATUS: '@little_lemon_onboarding_completed',
} as const;

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!rawData) {
      return DEFAULT_USER_PROFILE;
    }
    const parsed = JSON.parse(rawData);
    return {
      ...DEFAULT_USER_PROFILE,
      ...parsed,
    };
  } catch (error) {
    console.error('Error reading user profile from AsyncStorage:', error);
    return DEFAULT_USER_PROFILE;
  }
}

export async function saveUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const current = await getUserProfile();
    const updated: UserProfile = {
      ...current,
      ...profile,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving user profile to AsyncStorage:', error);
    throw error;
  }
}

export async function completeOnboarding(firstName: string, email: string): Promise<UserProfile> {
  try {
    const updated: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      firstName: firstName.trim(),
      email: email.trim(),
      isOnboarded: true,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_STATUS, 'true');
    return updated;
  } catch (error) {
    console.error('Error completing onboarding in AsyncStorage:', error);
    throw error;
  }
}

export async function clearUserProfile(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    await AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATUS);
  } catch (error) {
    console.error('Error clearing user profile from AsyncStorage:', error);
    throw error;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function formatPhoneNumber(value: string): string {
  // Strip all non-numeric characters
  const cleaned = value.replace(/\D/g, '').slice(0, 10);
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
}

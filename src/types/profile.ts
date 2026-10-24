export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
  avatarUri: string | null;
  isOnboarded: boolean;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: true,
  newsletter: true,
  avatarUri: null,
  isOnboarded: false,
};

import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LittleLemonColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  showBack?: boolean;
  onBackPress?: () => void;
  showProfile?: boolean;
  onProfilePress?: () => void;
  avatarUri?: string | null;
  userInitials?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBackPress,
  showProfile = true,
  onProfilePress,
  avatarUri,
  userInitials = 'TD',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, Platform.OS === 'ios' ? 44 : 12) + 8,
        },
      ]}
    >
      <View style={styles.contentRow}>
        {/* Left Side: Back Button or Placeholder */}
        <View style={styles.sideSlot}>
          {showBack ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Center: Little Lemon Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Little Lemon Logo"
          />
        </View>

        {/* Right Side: Profile Avatar */}
        <View style={styles.sideSlot}>
          {showProfile ? (
            <TouchableOpacity
              onPress={onProfilePress}
              activeOpacity={0.8}
              style={styles.avatarButton}
              accessibilityLabel="View profile"
              accessibilityRole="button"
            >
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <Image
                  source={require('@/assets/images/Profile.png')}
                  style={styles.avatar}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LittleLemonColors.background,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LittleLemonColors.border,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  sideSlot: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 40,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: LittleLemonColors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: LittleLemonColors.highlightLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  initialsFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LittleLemonColors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

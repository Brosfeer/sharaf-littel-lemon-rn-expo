import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LittleLemonColors, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  showSearch?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  showSearch = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Title & Subtitle */}
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>

      {/* Description & Hero Image Row */}
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
        </View>

        <Image
          source={require('@/assets/images/Hero_image.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Search Input Bar */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color={LittleLemonColors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search dish, ingredients..."
              placeholderTextColor={LittleLemonColors.textMuted}
              value={searchQuery}
              onChangeText={onSearchChange}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => onSearchChange('')}
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={LittleLemonColors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LittleLemonColors.primaryGreen,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 22,
  },
  title: {
    fontFamily: Fonts?.serif,
    fontSize: 40,
    fontWeight: '700',
    color: LittleLemonColors.primaryYellow,
    lineHeight: 46,
  },
  subtitle: {
    fontFamily: Fonts?.serif,
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: -4,
    marginBottom: 12,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: LittleLemonColors.textLight,
    fontWeight: '400',
  },
  heroImage: {
    width: 130,
    height: 135,
    borderRadius: 16,
  },
  searchBarContainer: {
    marginTop: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 15,
    color: LittleLemonColors.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
});

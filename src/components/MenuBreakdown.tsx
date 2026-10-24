import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LittleLemonColors } from '@/constants/theme';

interface MenuBreakdownProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export const MenuBreakdown: React.FC<MenuBreakdownProps> = ({
  categories = ['starters', 'mains', 'desserts', 'drinks'],
  selectedCategories,
  onToggleCategory,
}) => {
  const formatLabel = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ORDER FOR DELIVERY!</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat);
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onToggleCategory(cat)}
              activeOpacity={0.7}
              style={[
                styles.categoryChip,
                isSelected ? styles.categoryChipActive : styles.categoryChipInactive,
              ]}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected ? styles.categoryTextActive : styles.categoryTextInactive,
                ]}
              >
                {formatLabel(cat)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LittleLemonColors.background,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: LittleLemonColors.highlightDark,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 16,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: LittleLemonColors.primaryGreen,
  },
  categoryChipInactive: {
    backgroundColor: LittleLemonColors.inactiveFilterBackground,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  categoryTextInactive: {
    color: LittleLemonColors.primaryGreen,
  },
  divider: {
    height: 1,
    backgroundColor: LittleLemonColors.divider,
    width: '100%',
  },
});

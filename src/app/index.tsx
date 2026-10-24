import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from '@/types/menu';
import {
  fetchMenuItems,
  filterMenuSections,
  CATEGORIES,
} from '@/services/menuService';
import { LittleLemonColors } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    ...CATEGORIES,
  ]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const items = await fetchMenuItems();
        if (isMounted) {
          setMenuItems(items);
        }
      } catch (error) {
        console.error('Failed to load menu items:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const sections = useMemo(() => {
    return filterMenuSections(menuItems, searchQuery, selectedCategories);
  }, [menuItems, searchQuery, selectedCategories]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, Platform.OS === 'ios' ? 44 : 16),
        },
      ]}
    >
      <StatusBar style="light" />

      {/* Top Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#FFFFFF"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={LittleLemonColors.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* 3 Category Filter Buttons */}
      <View style={styles.filtersRow}>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                isSelected
                  ? styles.filterButtonActive
                  : styles.filterButtonInactive,
              ]}
              onPress={() => handleToggleCategory(category)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected
                    ? styles.filterTextActive
                    : styles.filterTextInactive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Menu SectionList */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No menu items found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LittleLemonColors.darkBackground,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 14,
    height: 44,
    borderRadius: 8,
    backgroundColor: LittleLemonColors.searchBackground,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearButton: {
    padding: 4,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: LittleLemonColors.filterActive,
    borderColor: LittleLemonColors.filterActive,
  },
  filterButtonInactive: {
    backgroundColor: LittleLemonColors.filterInactive,
    borderColor: LittleLemonColors.filterBorder,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  filterTextActive: {
    color: LittleLemonColors.filterActiveText,
  },
  filterTextInactive: {
    color: LittleLemonColors.filterInactiveText,
  },
  listContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: LittleLemonColors.darkBackground,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  itemTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: LittleLemonColors.textMuted,
    fontSize: 15,
  },
});

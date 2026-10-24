import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useFocusEffect } from 'expo-router';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MenuBreakdown } from '@/components/MenuBreakdown';
import { DishItemRow } from '@/components/DishItemRow';
import { MenuItem } from '@/types/menu';
import { UserProfile } from '@/types/profile';
import {
  fetchMenuItems,
  filterMenuItems,
} from '@/services/menuService';
import { getUserProfile } from '@/services/storage';
import { LittleLemonColors } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

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

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      async function loadProfile() {
        const user = await getUserProfile();
        if (isMounted) {
          if (!user.isOnboarded) {
            router.replace('/onboarding');
            return;
          }
          setProfile(user);
        }
      }
      loadProfile();
      return () => {
        isMounted = false;
      };
    }, [router])
  );

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredDishes = useMemo(() => {
    return filterMenuItems(menuItems, searchQuery, selectedCategories);
  }, [menuItems, searchQuery, selectedCategories]);

  const availableCategories = useMemo(() => {
    const defaultList = ['starters', 'mains', 'desserts', 'drinks'];
    const found = Array.from(new Set(menuItems.map((item) => item.category)));
    return found.length > 0 ? found : defaultList;
  }, [menuItems]);

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const renderHeader = () => (
    <View>
      <Header
        showBack={false}
        showProfile={true}
        onProfilePress={handleProfilePress}
        avatarUri={profile?.avatarUri}
        userInitials={
          profile?.firstName
            ? `${profile.firstName.charAt(0)}${profile.lastName ? profile.lastName.charAt(0) : ''}`
            : 'LL'
        }
      />
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={true}
      />
      <MenuBreakdown
        categories={availableCategories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={LittleLemonColors.primaryGreen} />
          <Text style={styles.emptyText}>Loading Mediterranean flavors...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No dishes found</Text>
        <Text style={styles.emptySubtitle}>
          Try searching with a different keyword or reset filters.
        </Text>
        {(searchQuery.length > 0 || selectedCategories.length > 0) && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategories([]);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishItemRow item={item} />}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={8}
        maxToRenderPerBatch={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LittleLemonColors.background,
  },
  listContent: {
    paddingBottom: 32,
  },
  separator: {
    height: 1,
    backgroundColor: LittleLemonColors.divider,
    marginHorizontal: 20,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: LittleLemonColors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: LittleLemonColors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: LittleLemonColors.textMuted,
    marginTop: 12,
  },
  resetButton: {
    backgroundColor: LittleLemonColors.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

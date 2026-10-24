import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MenuItem } from '@/types/menu';
import { LittleLemonColors } from '@/constants/theme';
import { LOCAL_DISH_IMAGES } from '@/services/menuService';

interface DishItemRowProps {
  item: MenuItem;
}

export const DishItemRow: React.FC<DishItemRowProps> = ({ item }) => {
  const imageName = item.image || '';
  const imageSource = LOCAL_DISH_IMAGES[imageName]
    ? LOCAL_DISH_IMAGES[imageName]
    : {
        uri: imageName.startsWith('http')
          ? imageName
          : `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${imageName}`,
      };

  const displayName = item.title || item.name || '';
  const displayPrice = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{displayName}</Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>
        ) : null}
        <Text style={styles.price}>${displayPrice}</Text>
      </View>

      {item.image ? (
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={displayName}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: LittleLemonColors.cardBackground,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: LittleLemonColors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: LittleLemonColors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: LittleLemonColors.primaryGreen,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 8,
    backgroundColor: LittleLemonColors.highlightLight,
  },
});

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { FoodItem } from '../types';
import { moderateScale } from '../utils/responsive';

interface FoodCardProps {
  item: FoodItem;
  onPress: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onPress }) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - moderateScale(48)) / 2;
  const imageHeight = cardWidth * 0.85;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.urduName} numberOfLines={1}>
          {item.urduName}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱️</Text>
            <Text style={styles.metaText} numberOfLines={1}>
              {item.cookTime}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>👥</Text>
            <Text style={styles.metaText}>{item.servings}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBF5',
    borderRadius: moderateScale(18),
    marginBottom: moderateScale(14),
    shadowColor: '#D35400',
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(12),
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  difficultyBadge: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    backgroundColor: '#E74C3C',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(10),
  },
  difficultyText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    padding: moderateScale(10),
  },
  name: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: moderateScale(2),
  },
  urduName: {
    fontSize: moderateScale(13),
    color: '#D35400',
    fontWeight: '500',
    marginBottom: moderateScale(6),
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaIcon: {
    fontSize: moderateScale(11),
    marginRight: moderateScale(3),
  },
  metaText: {
    fontSize: moderateScale(10),
    color: '#7F8C8D',
    fontWeight: '500',
  },
});

export default FoodCard;

import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { pakistaniFoods } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import { FoodItem } from '../types';
import { moderateScale, hp, isSmallDevice } from '../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  RecipeDetail: { food: FoodItem };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleFoodPress = useCallback(
    (food: FoodItem) => {
      navigation.navigate('RecipeDetail', { food });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: FoodItem }) => (
      <FoodCard item={item} onPress={() => handleFoodPress(item)} />
    ),
    [handleFoodPress]
  );

  const keyExtractor = useCallback((item: FoodItem) => item.id, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C0392B" />
      <View style={[styles.header, { paddingTop: insets.top + moderateScale(10) }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>🍛</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>MikaBites</Text>
            <Text style={styles.headerSubtitle}>Authentic Pakistani Recipes</Text>
          </View>
        </View>
        <Text style={styles.urduTitle}>پاکستانی کھانے</Text>
      </View>

      <View style={styles.decorativeLine} />

      <FlatList
        data={pakistaniFoods}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + moderateScale(20) },
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={6}
        windowSize={5}
        initialNumToRender={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  header: {
    backgroundColor: '#C0392B',
    paddingBottom: moderateScale(22),
    paddingHorizontal: moderateScale(18),
    borderBottomLeftRadius: moderateScale(28),
    borderBottomRightRadius: moderateScale(28),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerEmoji: {
    fontSize: moderateScale(isSmallDevice ? 34 : 40),
    marginRight: moderateScale(12),
  },
  headerTitle: {
    fontSize: moderateScale(isSmallDevice ? 26 : 30),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: moderateScale(isSmallDevice ? 12 : 13),
    color: '#FADBD8',
    marginTop: moderateScale(2),
    fontWeight: '500',
  },
  urduTitle: {
    fontSize: moderateScale(isSmallDevice ? 20 : 22),
    color: '#F5B041',
    textAlign: 'right',
    marginTop: moderateScale(10),
    fontWeight: '600',
  },
  decorativeLine: {
    height: moderateScale(4),
    backgroundColor: '#F5B041',
    marginHorizontal: moderateScale(40),
    borderRadius: moderateScale(2),
    marginTop: -moderateScale(2),
  },
  listContent: {
    paddingHorizontal: moderateScale(14),
    paddingTop: moderateScale(18),
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;

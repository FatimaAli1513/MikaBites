import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { FoodItem } from '../types';
import { moderateScale, hp, isSmallDevice } from '../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  RecipeDetail: { food: FoodItem };
};

type RecipeDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RecipeDetail'>;
  route: RouteProp<RootStackParamList, 'RecipeDetail'>;
};

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { food } = route.params;
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const imageHeight = Math.min(height * 0.38, 350);
  const backButtonTop = insets.top + moderateScale(10);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + moderateScale(20),
        }}
      >
        {/* Hero Image */}
        <View style={[styles.imageContainer, { width, height: imageHeight }]}>
          <Image
            source={{ uri: food.image }}
            style={styles.heroImage}
            resizeMode='cover'
          />
          <View style={styles.imageOverlay} />
          <TouchableOpacity
            style={[styles.backButton, { top: backButtonTop }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text
              style={styles.urduName}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {food.urduName}
            </Text>
            <Text
              style={styles.foodName}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {food.name}
            </Text>
          </View>
        </View>

        {/* Meta Info */}
        <View style={styles.metaContainer}>
          <View style={styles.metaCard}>
            <Text style={styles.metaIcon}>⏱️</Text>
            <Text style={styles.metaLabel}>Prep</Text>
            <Text
              style={styles.metaValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {food.prepTime}
            </Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaIcon}>🍳</Text>
            <Text style={styles.metaLabel}>Cook</Text>
            <Text
              style={styles.metaValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {food.cookTime}
            </Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaIcon}>👥</Text>
            <Text style={styles.metaLabel}>Serves</Text>
            <Text style={styles.metaValue}>{food.servings}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaIcon}>📊</Text>
            <Text style={styles.metaLabel}>Level</Text>
            <Text
              style={styles.metaValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {food.difficulty}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{food.description}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🥘</Text>
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          <View style={styles.ingredientsList}>
            {food.ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={[
                  styles.ingredientItem,
                  index === food.ingredients.length - 1 &&
                    styles.lastIngredient,
                ]}
              >
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>Instructions</Text>
          </View>
          {food.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={[styles.section, styles.tipsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💡</Text>
            <Text style={styles.sectionTitle}>Pro Tips</Text>
          </View>
          {food.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>✨</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for Pakistani Food Lovers
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  imageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  backButton: {
    position: 'absolute',
    left: moderateScale(16),
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    elevation: 4,
  },
  backIcon: {
    fontSize: moderateScale(22),
    color: '#C0392B',
    fontWeight: '700',
    marginBottom: 10,
  },
  heroContent: {
    position: 'absolute',
    bottom: moderateScale(24),
    left: moderateScale(18),
    right: moderateScale(18),
  },
  urduName: {
    fontSize: moderateScale(isSmallDevice ? 22 : 26),
    color: '#F5B041',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  foodName: {
    fontSize: moderateScale(isSmallDevice ? 28 : 32),
    color: '#fff',
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    marginTop: moderateScale(-26),
    marginBottom: moderateScale(8),
  },
  metaCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(3),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(4),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    shadowColor: '#D35400',
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(6),
    elevation: 4,
  },
  metaIcon: {
    fontSize: moderateScale(isSmallDevice ? 18 : 20),
    marginBottom: moderateScale(4),
  },
  metaLabel: {
    fontSize: moderateScale(isSmallDevice ? 9 : 10),
    color: '#95A5A6',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: moderateScale(isSmallDevice ? 10 : 12),
    color: '#2C3E50',
    fontWeight: '700',
    marginTop: moderateScale(2),
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
  },
  description: {
    fontSize: moderateScale(14),
    color: '#5D6D7E',
    lineHeight: moderateScale(24),
    fontStyle: 'italic',
    textAlign: 'center',
    backgroundColor: '#FDEBD0',
    padding: moderateScale(16),
    borderRadius: moderateScale(14),
    borderLeftWidth: moderateScale(4),
    borderLeftColor: '#F5B041',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(14),
  },
  sectionIcon: {
    fontSize: moderateScale(22),
    marginRight: moderateScale(8),
  },
  sectionTitle: {
    fontSize: moderateScale(isSmallDevice ? 18 : 20),
    fontWeight: '800',
    color: '#C0392B',
  },
  ingredientsList: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(9),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastIngredient: {
    borderBottomWidth: 0,
  },
  bulletPoint: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(4),
    backgroundColor: '#E74C3C',
    marginRight: moderateScale(12),
  },
  ingredientText: {
    fontSize: moderateScale(14),
    color: '#2C3E50',
    flex: 1,
    lineHeight: moderateScale(20),
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: moderateScale(14),
    backgroundColor: '#fff',
    padding: moderateScale(14),
    borderRadius: moderateScale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(5),
    elevation: 2,
  },
  stepNumber: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: '#C0392B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
    flexShrink: 0,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  instructionText: {
    fontSize: moderateScale(14),
    color: '#2C3E50',
    flex: 1,
    lineHeight: moderateScale(22),
  },
  tipsSection: {
    backgroundColor: '#FEF9E7',
    marginHorizontal: moderateScale(14),
    borderRadius: moderateScale(18),
    marginBottom: moderateScale(8),
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(10),
  },
  tipIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(8),
    marginTop: moderateScale(2),
  },
  tipText: {
    fontSize: moderateScale(13),
    color: '#7D6608',
    flex: 1,
    lineHeight: moderateScale(20),
    fontWeight: '500',
  },
  footer: {
    paddingVertical: moderateScale(26),
    alignItems: 'center',
  },
  footerText: {
    fontSize: moderateScale(13),
    color: '#BDC3C7',
    fontWeight: '500',
  },
});

export default RecipeDetailScreen;

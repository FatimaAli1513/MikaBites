import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { pakistaniFoods } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import { FoodItem } from '../types';
import { moderateScale, isSmallDevice } from '../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  RecipeDetail: { food: FoodItem };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

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

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C0392B" />
      <View style={[styles.header, { paddingTop: insets.top + moderateScale(10) }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.headerEmoji}>🍛</Text>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>MikaBites</Text>
              <Text style={styles.headerSubtitle}>Authentic Pakistani Recipes</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsIcon}>ℹ️</Text>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
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

      {/* Owner Details Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About MikaBites</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Owner Info */}
            <View style={styles.ownerSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>👨‍🍳</Text>
              </View>
              <Text style={styles.ownerName}>Mika</Text>
              <Text style={styles.ownerRole}>App Developer & Food Enthusiast</Text>
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                MikaBites is your ultimate guide to authentic Pakistani cuisine. 
                Explore traditional recipes passed down through generations, 
                from aromatic biryanis to delectable desserts.
              </Text>
            </View>

            {/* Contact Info */}
            <View style={styles.contactSection}>
              <Text style={styles.sectionLabel}>Contact & Connect</Text>
              
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => openLink('mailto:mika@mikabites.com')}
              >
                <Text style={styles.contactIcon}>📧</Text>
                <Text style={styles.contactText}>mika@mikabites.com</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => openLink('https://instagram.com/mikabites')}
              >
                <Text style={styles.contactIcon}>📸</Text>
                <Text style={styles.contactText}>@mikabites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => openLink('https://mikabites.com')}
              >
                <Text style={styles.contactIcon}>🌐</Text>
                <Text style={styles.contactText}>www.mikabites.com</Text>
              </TouchableOpacity>
            </View>

            {/* App Info */}
            <View style={styles.appInfoSection}>
              <Text style={styles.versionText}>Version 1.0.0</Text>
              <Text style={styles.madeWithLove}>Made with ❤️ in Pakistan</Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  detailsIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(5),
  },
  detailsText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '600',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modalContent: {
    backgroundColor: '#FFFBF5',
    borderRadius: moderateScale(24),
    width: '100%',
    maxWidth: moderateScale(340),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(10) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(20),
    elevation: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#C0392B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  ownerSection: {
    alignItems: 'center',
    paddingVertical: moderateScale(24),
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
  },
  avatarContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: '#FDEBD0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    borderWidth: 3,
    borderColor: '#F5B041',
  },
  avatarText: {
    fontSize: moderateScale(40),
  },
  ownerName: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: moderateScale(4),
  },
  ownerRole: {
    fontSize: moderateScale(13),
    color: '#7F8C8D',
    fontWeight: '500',
  },
  descriptionSection: {
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
  },
  descriptionText: {
    fontSize: moderateScale(14),
    color: '#5D6D7E',
    lineHeight: moderateScale(22),
    textAlign: 'center',
  },
  contactSection: {
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
  },
  sectionLabel: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#C0392B',
    textTransform: 'uppercase',
    marginBottom: moderateScale(14),
    letterSpacing: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  contactIcon: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(12),
  },
  contactText: {
    fontSize: moderateScale(14),
    color: '#2C3E50',
    fontWeight: '500',
  },
  appInfoSection: {
    padding: moderateScale(20),
    alignItems: 'center',
    backgroundColor: '#FEF9E7',
  },
  versionText: {
    fontSize: moderateScale(12),
    color: '#95A5A6',
    fontWeight: '500',
  },
  madeWithLove: {
    fontSize: moderateScale(13),
    color: '#D35400',
    fontWeight: '600',
    marginTop: moderateScale(6),
  },
});

export default HomeScreen;

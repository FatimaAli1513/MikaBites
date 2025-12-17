import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 14 Pro)
const baseWidth = 393;
const baseHeight = 852;

// Responsive width scaling
export const wp = (widthPercent: number): number => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

// Responsive height scaling
export const hp = (heightPercent: number): number => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

// Scale based on screen width
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

// Scale based on screen height
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

// Moderate scale for fonts - less aggressive scaling
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Font scaling
export const fontScale = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / baseWidth;
  const newSize = size * scaleFactor;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Check if small device
export const isSmallDevice = SCREEN_WIDTH < 375;

// Check if tablet
export const isTablet = SCREEN_WIDTH >= 768;

// Get screen dimensions
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;



// utils/scaling.js
import { Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const baseWidth = 375;
const baseHeight = 667;

// Scale functions
export const scaleWidth = (size) => (width / baseWidth) * size;
export const fSize = (size) => (width / baseWidth) * size;
export const scaleHeight = (size) => (height / baseHeight) * size;
export const scale = (size, factor = 1) => size * (width / baseWidth) * factor;

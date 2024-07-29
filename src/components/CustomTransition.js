// CustomTransition.js
import { interpolate, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

export const zoomInTransition = {
  cardStyleInterpolator: ({ current }) => {
    const translateY = useSharedValue(100);
    const scale = useSharedValue(1.2);
    const opacity = useSharedValue(0);

    translateY.value = withSpring(0, { damping: 10 });
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withSpring(1, { damping: 10 });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }, { scale: scale.value }],
        opacity: opacity.value,
      };
    }, [translateY, scale, opacity]);

    return {
      cardStyle: animatedStyle,
    };
  },
};

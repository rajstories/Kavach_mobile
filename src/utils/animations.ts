import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  type SharedValue,
} from 'react-native-reanimated';

/**
 * Fade-in from bottom (for cards entering the viewport)
 */
export function slideUpFade(animValue: SharedValue<number>) {
  return useAnimatedStyle(() => ({
    opacity: animValue.value,
    transform: [
      { translateY: interpolate(animValue.value, [0, 1], [20, 0]) },
    ],
  }));
}

/**
 * Pulse animation for CRITICAL severity indicators
 */
export function usePulse() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 600 }),
        withTiming(1.0, { duration: 600 }),
      ),
      -1,
      false,
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
}

/**
 * Stagger children animation (for list items appearing one after another)
 */
export function useStaggeredEntry(index: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    const delay = index * 80;
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 300 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

/**
 * Simple fade-in
 */
export function useFadeIn(delay = 0) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
}

/**
 * Scale-in animation for badges / alerts
 */
export function useScaleIn(delay = 0) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withTiming(1, { duration: 300 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
}

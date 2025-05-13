import React from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const SparkleElement = () => {
  const sparkleOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(0);
  const sparklePosition = useSharedValue({
    x: Math.random() * Dimensions.get('window').width,
    y: Math.random() * Dimensions.get('window').height,
  });

  React.useEffect(() => {
    sparkleOpacity.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 1000}),
        withTiming(0, {duration: 1000}),
      ),
      -1,
    );
    sparkleScale.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 1000}),
        withTiming(0.5, {duration: 1000}),
      ),
      -1,
    );
  }, [sparkleOpacity, sparkleScale]);

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
    transform: [{scale: sparkleScale.value}],
    position: 'absolute',
    left: sparklePosition.value.x,
    top: sparklePosition.value.y,
  }));

  return <Animated.View style={[styles.sparkle, sparkleStyle]} />;
};

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({children}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF1E6"
        translucent={true}
      />
      <LinearGradient
        colors={['#FFF1E6', '#FFD6C4', '#FFA987']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            {Array.from({length: 12}).map((_, index) => (
              <SparkleElement key={index} />
            ))}
            {children}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sparkle: {
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    position: 'absolute',
  },
});

export default AnimatedBackground;

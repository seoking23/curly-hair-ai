import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import {Path, Svg, G} from 'react-native-svg';

const {width} = Dimensions.get('window');

// Hairstyle SVG paths
const HAIRSTYLES = {
  afro: 'M50,10 C75,10 90,25 90,45 C90,70 75,85 50,85 C25,85 10,70 10,45 C10,25 25,10 50,10',
  braids: [
    'M30,15 C32,30 28,50 30,70 C31,80 33,85 30,90',
    'M40,12 C42,30 38,50 40,75 C41,85 43,90 40,95',
    'M50,10 C52,30 48,50 50,80 C51,90 53,95 50,100',
    'M60,12 C62,30 58,50 60,75 C61,85 63,90 60,95',
    'M70,15 C72,30 68,50 70,70 C71,80 73,85 70,90',
  ],
  coils: [
    'M25,20 C35,15 40,25 30,30 C20,35 15,25 25,20',
    'M45,15 C55,10 60,20 50,25 C40,30 35,20 45,15',
    'M65,20 C75,15 80,25 70,30 C60,35 55,25 65,20',
    'M30,40 C40,35 45,45 35,50 C25,55 20,45 30,40',
    'M50,45 C60,40 65,50 55,55 C45,60 40,50 50,45',
    'M70,40 C80,35 85,45 75,50 C65,55 60,45 70,40',
    'M35,60 C45,55 50,65 40,70 C30,75 25,65 35,60',
    'M55,65 C65,60 70,70 60,75 C50,80 45,70 55,65',
  ],
  twists: [
    'M30,15 S35,30 30,45 S25,60 30,75',
    'M40,10 S45,25 40,40 S35,55 40,70',
    'M50,5 S55,20 50,35 S45,50 50,65',
    'M60,10 S65,25 60,40 S55,55 60,70',
    'M70,15 S75,30 70,45 S65,60 70,75',
  ],
};

const HairCelebrationAnimation = () => {
  // Main animation values
  const mainScale = useSharedValue(0.8);
  const mainRotation = useSharedValue(0);
  const mainOpacity = useSharedValue(0);

  // Style animation values
  const afroScale = useSharedValue(0);
  const afroOpacity = useSharedValue(0);

  const braidOpacity = useSharedValue(0);
  const braidScale = useSharedValue(0);
  const braidWave = useSharedValue(0);

  const coilsOpacity = useSharedValue(0);
  const coilsScale = useSharedValue(0);
  const coilsRotation = useSharedValue(0);

  const twistsOpacity = useSharedValue(0);
  const twistsScale = useSharedValue(0);
  const twistsWave = useSharedValue(0);

  useEffect(() => {
    // Main container animation
    mainScale.value = withTiming(1, {duration: 1000});
    mainRotation.value = withRepeat(
      withTiming(5, {
        duration: 6000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1,
      true,
    );
    mainOpacity.value = withTiming(1, {duration: 800});

    // Afro animation
    afroScale.value = withDelay(300, withTiming(1, {duration: 1200}));
    afroOpacity.value = withDelay(300, withTiming(1, {duration: 800}));

    // Braids animation
    braidOpacity.value = withDelay(800, withTiming(1, {duration: 800}));
    braidScale.value = withDelay(800, withTiming(1, {duration: 1000}));
    braidWave.value = withRepeat(
      withTiming(5, {
        duration: 3000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1,
      true,
    );

    // Coils animation
    coilsOpacity.value = withDelay(1300, withTiming(1, {duration: 800}));
    coilsScale.value = withDelay(1300, withTiming(1, {duration: 1000}));
    coilsRotation.value = withRepeat(
      withSequence(
        withTiming(-3, {duration: 2000}),
        withTiming(3, {duration: 2000}),
      ),
      -1,
      true,
    );

    // Twists animation
    twistsOpacity.value = withDelay(1800, withTiming(1, {duration: 800}));
    twistsScale.value = withDelay(1800, withTiming(1, {duration: 1000}));
    twistsWave.value = withRepeat(
      withTiming(3, {
        duration: 4000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1,
      true,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated styles
  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: mainScale.value},
        {rotate: `${mainRotation.value}deg`},
      ],
      opacity: mainOpacity.value,
    };
  });

  const afroStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: afroScale.value}],
      opacity: afroOpacity.value,
    };
  });

  const braidsStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: braidScale.value}, {translateY: braidWave.value}],
      opacity: braidOpacity.value,
    };
  });

  const coilsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: coilsScale.value},
        {rotate: `${coilsRotation.value}deg`},
      ],
      opacity: coilsOpacity.value,
    };
  });

  const twistsStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: twistsScale.value}, {translateY: twistsWave.value}],
      opacity: twistsOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hairContainer, mainStyle]}>
        {/* Afro */}
        <Animated.View style={afroStyle}>
          <Svg width={width * 0.8} height={width * 0.8} viewBox="0 0 100 100">
            <Path
              d={HAIRSTYLES.afro}
              fill="#4A2C1E"
              stroke="#6D4C41"
              strokeWidth="1"
            />
          </Svg>
        </Animated.View>

        {/* Braids */}
        <Animated.View style={[styles.overlayStyle, braidsStyle]}>
          <Svg width={width * 0.8} height={width * 0.8} viewBox="0 0 100 100">
            <G>
              {HAIRSTYLES.braids.map((path, index) => (
                <Path
                  key={`braid-${index}`}
                  d={path}
                  fill="none"
                  stroke="#3E2723"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}
            </G>
          </Svg>
        </Animated.View>

        {/* Coils */}
        <Animated.View style={[styles.overlayStyle, coilsStyle]}>
          <Svg width={width * 0.8} height={width * 0.8} viewBox="0 0 100 100">
            <G>
              {HAIRSTYLES.coils.map((path, index) => (
                <Path
                  key={`coil-${index}`}
                  d={path}
                  fill="#3E2723"
                  stroke="#5D4037"
                  strokeWidth="1"
                />
              ))}
            </G>
          </Svg>
        </Animated.View>

        {/* Twists */}
        <Animated.View style={[styles.overlayStyle, twistsStyle]}>
          <Svg width={width * 0.8} height={width * 0.8} viewBox="0 0 100 100">
            <G>
              {HAIRSTYLES.twists.map((path, index) => (
                <Path
                  key={`twist-${index}`}
                  d={path}
                  fill="none"
                  stroke="#4A2C1E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </G>
          </Svg>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hairContainer: {
    position: 'relative',
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayStyle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
  },
});

export default HairCelebrationAnimation;

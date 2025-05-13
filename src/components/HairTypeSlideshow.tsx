import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import {Text} from 'react-native-paper';

interface HairTypeSlide {
  type: string;
  image: ImageSourcePropType;
  description: string;
}

const hairTypeSlides: HairTypeSlide[] = [
  {
    type: '3A',
    image: require('../assets/images/hair_type_3a.jpg'),
    description: 'Loose, springy curls',
  },
  {
    type: '3B',
    image: require('../assets/images/hair_type_3b.jpg'),
    description: 'Bouncy, well-defined curls',
  },
  {
    type: '3C',
    image: require('../assets/images/hair_type_3c.jpg'),
    description: 'Tight, springy curls',
  },
  {
    type: '4A',
    image: require('../assets/images/hair_type_4a.jpg'),
    description: 'Tightly coiled, S-pattern',
  },
  {
    type: '4B',
    image: require('../assets/images/hair_type_4b.png'),
    description: 'Zigzag pattern, very coily',
  },
  {
    type: '4C',
    image: require('../assets/images/hair_type_4c.jpg'),
    description: 'Very tight coils, dense texture',
  },
];

const {width} = Dimensions.get('window');
const SLIDE_WIDTH = width * 0.7;
const ITEM_SIZE =
  Platform.OS === 'ios' ? SLIDE_WIDTH * 0.8 : SLIDE_WIDTH * 0.74;
const SPACING = 10;
const FULL_SIZE = ITEM_SIZE + SPACING * 2;

interface HairTypeSlideshowProps {
  style?: any;
}

export const HairTypeSlideshow: React.FC<HairTypeSlideshowProps> = ({
  style,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<any>(null);

  useEffect(() => {
    const totalWidth = FULL_SIZE * hairTypeSlides.length;
    let scrollValue = 0;

    const animate = () => {
      scrollValue += FULL_SIZE;
      if (scrollValue >= totalWidth) {
        scrollValue = 0;
      }

      if (slideRef.current) {
        slideRef.current.scrollToOffset({
          offset: scrollValue,
          animated: true,
        });
      }
    };

    const interval = setInterval(animate, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.FlatList
        ref={slideRef}
        data={hairTypeSlides}
        keyExtractor={item => item.type}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
          });

          return (
            <Animated.View
              style={[
                styles.slideContainer,
                {
                  transform: [{scale}],
                  opacity,
                },
              ]}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.typeLabel}>
                  <Text style={styles.typeText}>Type {item.type}</Text>
                </View>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </Animated.View>
          );
        }}
      />
      <View style={styles.pagination}>
        {hairTypeSlides.map((_, index) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  transform: [{scale}],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginVertical: 16,
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: SPACING,
  },
  slideContainer: {
    width: ITEM_SIZE,
    marginHorizontal: SPACING,
    alignItems: 'center',
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
  },
  typeText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#6D4C41',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    marginHorizontal: 3,
  },
});

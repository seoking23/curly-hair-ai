import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';

interface Testimonial {
  name: string;
  hairType: string;
  rating: number;
  comment: string;
  avatar: any;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    hairType: 'Type 3B',
    rating: 5,
    comment:
      'The AI analysis was spot-on! Finally found products that work for my springy curls.',
    avatar: require('../assets/images/avatars/curly_3b_avatar.png'),
  },
  {
    name: 'Michelle K.',
    hairType: 'Type 4A',
    rating: 5,
    comment:
      'Love how it tracks my hair health progress. My coils have never been more defined!',
    avatar: require('../assets/images/avatars/coily_4a_avatar.jpg'),
  },
  {
    name: 'Jessica R.',
    hairType: 'Type 3C',
    rating: 5,
    comment:
      'The personalized recommendations transformed my tight curls. No more frizz!',
    avatar: require('../assets/images/avatars/curly_3c_avatar.jpg'),
  },
];

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;
const FULL_CARD_WIDTH = CARD_WIDTH + SPACING * 2;

interface TestimonialCarouselProps {
  style?: any;
}

const StarRating: React.FC<{rating: number}> = ({rating}) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <Text
          key={star}
          style={[
            styles.star,
            {color: star <= rating ? '#FFD700' : '#E0E0E0'},
          ]}>
          ★
        </Text>
      ))}
    </View>
  );
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  style,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    const totalWidth = FULL_CARD_WIDTH * testimonials.length;
    let scrollValue = 0;

    const animate = () => {
      scrollValue += FULL_CARD_WIDTH;
      if (scrollValue >= totalWidth) {
        scrollValue = 0;
      }

      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: scrollValue,
          animated: true,
        });
      }
    };

    const interval = setInterval(animate, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>What Our Users Say</Text>
      <Animated.FlatList
        ref={flatListRef}
        data={testimonials}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={FULL_CARD_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * FULL_CARD_WIDTH,
            index * FULL_CARD_WIDTH,
            (index + 1) * FULL_CARD_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
          });

          return (
            <Animated.View
              style={[
                styles.testimonialCard,
                {
                  transform: [{scale}],
                  opacity,
                },
              ]}>
              <View style={styles.userInfo}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.hairType}>{item.hairType}</Text>
                </View>
              </View>
              <StarRating rating={item.rating} />
              <Text style={styles.comment}>{item.comment}</Text>
            </Animated.View>
          );
        }}
      />
      <View style={styles.pagination}>
        {testimonials.map((_, index) => {
          const inputRange = [
            (index - 1) * FULL_CARD_WIDTH,
            index * FULL_CARD_WIDTH,
            (index + 1) * FULL_CARD_WIDTH,
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
    marginVertical: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A2C1E',
    marginBottom: 16,
    textAlign: 'center',
  },
  flatListContent: {
    paddingHorizontal: SPACING,
  },
  testimonialCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: SPACING,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A2C1E',
  },
  hairType: {
    fontSize: 14,
    color: '#6D4C41',
    marginTop: 2,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    fontSize: 18,
    marginRight: 2,
  },
  comment: {
    fontSize: 15,
    color: '#6D4C41',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    marginHorizontal: 3,
  },
});

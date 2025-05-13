import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {HairTypeSlideshow} from './HairTypeSlideshow';
import {TestimonialCarousel} from './TestimonialCarousel';
import {AuthContext} from '../providers/AuthProvider';
import {useStripePayment} from '../contexts/StripeContext';

interface PaywallProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export const Paywall: React.FC<PaywallProps> = ({
  visible,
  onClose,
  onSubscribe,
}) => {
  const auth = useContext(AuthContext);
  const {initializePayment, processSubscription} = useStripePayment();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  useEffect(() => {
    const initPayment = async () => {
      const initialized = await initializePayment();
      setPaymentInitialized(initialized);
    };

    if (visible) {
      initPayment();
    }
  }, [visible, initializePayment]);

  const handleSubscribeInitiated = async () => {};
  const handleMakePayment = async () => {
    if (!auth?.user) {
      Alert.alert('Error', 'Please sign in to subscribe');
      return;
    }

    if (!paymentInitialized) {
      Alert.alert('Error', 'Payment system not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const paymentMethod = {
        type:
          Platform.OS === 'ios'
            ? ('APPLE_PAY' as const)
            : ('GOOGLE_PAY' as const),
        token: 'dummy_token', // This should be replaced with actual payment token
      };

      const result = await processSubscription(
        'premium_monthly',
        paymentMethod,
        auth.user.id,
      );

      if (result.success) {
        onSubscribe();
      } else {
        Alert.alert(
          'Payment Failed',
          result.error?.message || 'An error occurred during payment',
        );
      }
    } catch (error) {
      console.error('Paywall.tsx - Subscription error:', error);
      Alert.alert(
        'Payment Error',
        'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      accessibilityViewIsModal={true}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close button at the top */}
          <TouchableOpacity
            style={styles.closeButtonTop}
            onPress={onClose}
            accessibilityLabel="Close paywall"
            accessibilityRole="button">
            <Text style={styles.closeButtonTopText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>PREMIUM SUBSCRIPTION</Text>
              </View>

              <Text style={styles.title}>Unlock AI Hair Analysis</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>$25</Text>
                <Text style={styles.period}>/month</Text>
              </View>

              <HairTypeSlideshow style={styles.slideshow} />

              <Text style={styles.description}>
                Get instant, accurate hair analysis using our most advanced AI
                technology. Upload your hair photos and receive detailed
                insights about your hair type, porosity, and personalized care
                recommendations.
              </Text>

              <View style={styles.featuresContainer}>
                <Text style={styles.featuresTitle}>
                  Premium Features Include:
                </Text>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    • Unlimited AI hair analysis
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Priority processing</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    • Detailed porosity assessment
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>
                    • Monthly product recommendations
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Progress tracking</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <TestimonialCarousel />
            </View>
          </ScrollView>

          {/* Fixed bottom section with subscribe button */}
          <View style={styles.bottomSection}>
            <Button
              mode="contained"
              style={styles.subscribeButton}
              contentStyle={styles.buttonContent}
              onPress={handleSubscribeInitiated}
              loading={isLoading}
              disabled={isLoading || !paymentInitialized}
              accessibilityLabel={`Subscribe to AI Hair Analysis with ${
                Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'
              }`}
              accessibilityHint="Start your monthly subscription for premium hair analysis features">
              {isLoading
                ? 'Processing...'
                : `Subscribe with ${
                    Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'
                  }`}
            </Button>

            <TouchableOpacity
              style={styles.maybeLaterButton}
              onPress={onClose}
              disabled={isLoading}
              accessibilityLabel="Close paywall"
              accessibilityRole="button">
              <Text style={styles.maybeLaterText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollView: {
    maxHeight: height * 0.8,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom section
  },
  modalContent: {
    padding: 24,
    alignItems: 'center',
  },
  closeButtonTop: {
    position: 'absolute',
    top: height * 0.05,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
  closeButtonTopText: {
    fontSize: 20,
    color: '#4A2C1E',
    fontWeight: '500',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
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
  premiumText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2C1E',
    textAlign: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4A2C1E',
  },
  period: {
    fontSize: 20,
    color: '#6D4C41',
    marginLeft: 4,
  },
  slideshow: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#6D4C41',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A2C1E',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#6D4C41',
    marginLeft: 8,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 24,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  subscribeButton: {
    width: '100%',
    borderRadius: 30,
    marginBottom: 12,
    backgroundColor: '#FFD700',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonContent: {
    paddingVertical: 8,
  },
  maybeLaterButton: {
    padding: 8,
    alignItems: 'center',
  },
  maybeLaterText: {
    color: '#8D6E63',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Paywall;

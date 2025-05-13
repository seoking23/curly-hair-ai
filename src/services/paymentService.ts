import {
  initStripe,
  useStripe,
  isPlatformPaySupported,
  PaymentSheetError,
} from '@stripe/stripe-react-native';
import {supabase} from '../lib/supabase';

// Note: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'your_stripe_publishable_key';

export interface PaymentMethod {
  type: 'APPLE_PAY' | 'GOOGLE_PAY';
  token: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface PaymentError {
  code: string;
  message: string;
  details?: PaymentSheetError;
}

export interface PaymentResult {
  success: boolean;
  subscriptionId?: string;
  error?: PaymentError;
}

class PaymentService {
  private stripe = useStripe();

  private readonly SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
      id: 'premium_monthly',
      name: 'Premium Monthly',
      price: 25.0,
      currency: 'USD',
      interval: 'month',
      features: [
        'Unlimited AI hair analysis',
        'Priority processing',
        'Detailed porosity assessment',
        'Monthly product recommendations',
        'Progress tracking',
      ],
    },
  ];

  /**
   * Initialize payment methods based on platform
   */
  async initializePayment(): Promise<boolean> {
    try {
      // Initialize Stripe
      await initStripe({
        publishableKey: STRIPE_PUBLISHABLE_KEY,
        merchantIdentifier: 'merchant.com.curlyhairai.app', // Replace with your merchant identifier
      });

      // Check platform-specific payment support
      return await isPlatformPaySupported();
    } catch (error) {
      console.error('paymentService.ts - Payment initialization error:', error);
      return false;
    }
  }

  /**
   * Get available subscription plans
   */
  getSubscriptionPlans(): SubscriptionPlan[] {
    return this.SUBSCRIPTION_PLANS;
  }

  /**
   * Process subscription payment
   */
  async processSubscription(
    planId: string,
    paymentMethod: PaymentMethod,
    userId: string,
  ): Promise<PaymentResult> {
    try {
      console.log(
        `paymentService.ts - Processing subscription for plan: ${planId}`,
      );

      // Validate plan
      const plan = this.SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Invalid subscription plan');
      }

      // Process payment based on payment method
      let paymentResult;
      if (paymentMethod.type === 'APPLE_PAY') {
        paymentResult = await this.processApplePay(plan, paymentMethod.token);
      } else if (paymentMethod.type === 'GOOGLE_PAY') {
        paymentResult = await this.processGooglePay(plan, paymentMethod.token);
      } else {
        throw new Error('Unsupported payment method');
      }

      // If payment successful, create subscription record
      if (paymentResult.success) {
        const {error: dbError} = await supabase
          .from('user_subscriptions')
          .insert({
            user_id: userId,
            plan_id: planId,
            status: 'active',
            start_date: new Date().toISOString(),
            payment_method: paymentMethod.type,
            stripe_subscription_id: paymentResult.subscriptionId,
          });

        if (dbError) {
          throw dbError;
        }
      }

      return paymentResult;
    } catch (error) {
      console.error('paymentService.ts - Subscription error:', error);
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Process Apple Pay payment
   */
  private async processApplePay(
    _plan: SubscriptionPlan,
    _paymentToken: string,
  ): Promise<PaymentResult> {
    try {
      const {error: setupError} = await this.stripe.initPaymentSheet({
        paymentIntentClientSecret: 'your_payment_intent_client_secret',
        merchantDisplayName: 'CurlyHairAI',
        defaultBillingDetails: {
          name: 'Test User', // This should come from user profile
        },
        allowsDelayedPaymentMethods: true,
      });

      if (setupError) {
        throw setupError;
      }

      const {error: presentError} = await this.stripe.presentPaymentSheet();
      if (presentError) {
        throw presentError;
      }

      return {
        success: true,
        subscriptionId: `AP_${Date.now()}`,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Process Google Pay payment
   */
  private async processGooglePay(
    plan: SubscriptionPlan,
    _paymentToken: string,
  ): Promise<PaymentResult> {
    try {
      const {error: setupError} = await this.stripe.initPaymentSheet({
        paymentIntentClientSecret: 'your_payment_intent_client_secret',
        merchantDisplayName: 'CurlyHairAI',
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: true, // Set to false in production
          currencyCode: plan.currency,
          amount: plan.price.toString(),
        },
      });

      if (setupError) {
        throw setupError;
      }

      const {error: presentError} = await this.stripe.presentPaymentSheet();
      if (presentError) {
        throw presentError;
      }

      return {
        success: true,
        subscriptionId: `GP_${Date.now()}`,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Handle payment errors
   */
  private handleError(error: any): PaymentError {
    if (error instanceof Error) {
      return {
        code: 'PAYMENT_ERROR',
        message: error.message,
        details: error as unknown as PaymentSheetError,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred during payment processing',
      details: error,
    };
  }
}

export const paymentService = new PaymentService();
export default paymentService;

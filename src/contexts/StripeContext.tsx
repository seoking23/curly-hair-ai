import React, {createContext, useCallback, useContext} from 'react';
import {useStripe, isPlatformPaySupported} from '@stripe/stripe-react-native';
import {supabase} from '../lib/supabase';

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
  details?: any;
}

export interface PaymentResult {
  success: boolean;
  subscriptionId?: string;
  error?: PaymentError;
}

interface StripeContextType {
  initializePayment: () => Promise<boolean>;
  processSubscription: (
    planId: string,
    paymentMethod: PaymentMethod,
    userId: string,
  ) => Promise<PaymentResult>;
  getSubscriptionPlans: () => SubscriptionPlan[];
  processApplePay: (
    plan: SubscriptionPlan,
    paymentToken: string,
  ) => Promise<PaymentResult>;
  processGooglePay: (
    plan: SubscriptionPlan,
    paymentToken: string,
  ) => Promise<PaymentResult>;
  handleError: (error: any) => PaymentError;

  SUBSCRIPTION_PLANS: SubscriptionPlan[];
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
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

const StripeContext = createContext<StripeContextType | null>(null);

export const useStripePayment = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripePayment must be used within a StripeProvider');
  }
  return context;
};

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({children}) => {
  const stripe = useStripe();

  const handleError = useCallback((error: any): PaymentError => {
    if (error instanceof Error) {
      return {
        code: 'PAYMENT_ERROR',
        message: error.message,
        details: error,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred during payment processing',
      details: error,
    };
  }, []);

  const initializePayment = useCallback(async (): Promise<boolean> => {
    try {
      return await isPlatformPaySupported();
    } catch (error) {
      console.error('StripeContext.tsx - Payment initialization error:', error);
      return false;
    }
  }, []);

  const processApplePay = useCallback(
    async (
      _plan: SubscriptionPlan,
      _paymentToken: string,
    ): Promise<PaymentResult> => {
      try {
        const {error: setupError} = await stripe.initPaymentSheet({
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

        const {error: presentError} = await stripe.presentPaymentSheet();
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
          error: handleError(error),
        };
      }
    },
    [stripe, handleError],
  );

  const processGooglePay = useCallback(
    async (
      plan: SubscriptionPlan,
      _paymentToken: string,
    ): Promise<PaymentResult> => {
      try {
        const {error: setupError} = await stripe.initPaymentSheet({
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

        const {error: presentError} = await stripe.presentPaymentSheet();
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
          error: handleError(error),
        };
      }
    },
    [stripe, handleError],
  );

  const processSubscription = useCallback(
    async (
      planId: string,
      paymentMethod: PaymentMethod,
      userId: string,
    ): Promise<PaymentResult> => {
      try {
        console.log(
          `StripeContext.tsx - Processing subscription for plan: ${planId}`,
        );

        // Validate plan
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
        if (!plan) {
          throw new Error('Invalid subscription plan');
        }

        // Process payment based on payment method
        let paymentResult;
        if (paymentMethod.type === 'APPLE_PAY') {
          paymentResult = await processApplePay(plan, paymentMethod.token);
        } else if (paymentMethod.type === 'GOOGLE_PAY') {
          paymentResult = await processGooglePay(plan, paymentMethod.token);
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
        console.error('StripeContext.tsx - Subscription error:', error);
        return {
          success: false,
          error: handleError(error),
        };
      }
    },
    [processApplePay, processGooglePay, handleError],
  );

  const getSubscriptionPlans = useCallback((): SubscriptionPlan[] => {
    return SUBSCRIPTION_PLANS;
  }, []);

  const value = {
    initializePayment,
    processSubscription,
    processApplePay,
    processGooglePay,
    getSubscriptionPlans,
    handleError,
    SUBSCRIPTION_PLANS,
  };

  return (
    <StripeContext.Provider value={value}>{children}</StripeContext.Provider>
  );
};

export default StripeContext;

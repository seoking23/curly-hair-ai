import React from 'react';
import {AuthProvider} from './AuthProvider';
import {StripeProvider as NativeStripeProvider} from '@stripe/stripe-react-native';
import {StripeProvider} from '../contexts/StripeContext';

// Note: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51PdfrjKD2LWnH2jnYDFbbaMkAJAy6Msh9oX1TTq4ID1tgZbGl2zFRC64hFrRCENcGeCpaFBNqLAdSaIaJ3prjDTm00UaVYUEQT';

interface RootProviderProps {
  children: React.ReactNode;
}

export const RootProvider: React.FC<RootProviderProps> = ({children}) => {
  return (
    <AuthProvider>
      <NativeStripeProvider
        publishableKey={STRIPE_PUBLISHABLE_KEY}
        merchantIdentifier="merchant.com.curlyhairai.app"
        urlScheme="curlyhairai">
        <StripeProvider>{children}</StripeProvider>
      </NativeStripeProvider>
    </AuthProvider>
  );
};

export default RootProvider;

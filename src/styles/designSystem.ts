import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Responsive sizing helper
const scale = (size: number) => (width / 375) * size;

export const DesignSystem = {
  // Color Palette
  colors: {
    // Primary colors
    primary: '#8D6E63',
    primaryLight: '#BCAAA4',
    primaryDark: '#5D4037',

    // Secondary colors
    secondary: '#26A69A',
    secondaryLight: '#80CBC4',
    secondaryDark: '#00796B',

    // Neutrals
    background: '#FFF8F0',
    card: '#FFFFFF',
    surface: '#F5F5F5',

    // Text
    textPrimary: '#4A2C1E',
    textSecondary: '#6D4C41',
    textTertiary: '#8D8D8D',

    // Status
    success: '#43A047',
    error: '#D32F2F',
    warning: '#FFA000',
    info: '#1976D2',

    // UI Elements
    border: '#D7CCC8',
    divider: '#EEEEEE',
    highlight: '#FFECB3',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Typography
  typography: {
    // Font families
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },

    // Font sizes (scaled for responsiveness)
    fontSize: {
      heading1: scale(28),
      heading2: scale(24),
      heading3: scale(20),
      heading4: scale(18),
      body: scale(16),
      caption: scale(14),
      small: scale(12),
      tiny: scale(10),
    },

    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },

    // Font weights
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing (scaled for responsiveness)
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
  },

  // Border radius
  borderRadius: {
    sm: scale(4),
    md: scale(8),
    lg: scale(16),
    pill: scale(50),
  },

  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3.0,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.25,
      shadowRadius: 5.0,
      elevation: 5,
    },
  },

  // Animation timing
  animation: {
    fast: 200,
    medium: 300,
    slow: 500,
  },

  // Layout
  layout: {
    containerPadding: scale(20),
    screenWidth: width,
    screenHeight: height,
    maxContentWidth: scale(500),
  },
};

// Common styles that can be reused across components
export const CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: DesignSystem.colors.background,
    padding: DesignSystem.spacing.md,
  },

  card: {
    backgroundColor: DesignSystem.colors.card,
    borderRadius: DesignSystem.borderRadius.md,
    padding: DesignSystem.spacing.md,
    ...DesignSystem.shadows.small,
  },

  button: {
    primary: {
      backgroundColor: DesignSystem.colors.primary,
      borderRadius: DesignSystem.borderRadius.pill,
      paddingVertical: DesignSystem.spacing.md,
      paddingHorizontal: DesignSystem.spacing.lg,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: DesignSystem.colors.primary,
      borderRadius: DesignSystem.borderRadius.pill,
      paddingVertical: DesignSystem.spacing.md,
      paddingHorizontal: DesignSystem.spacing.lg,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: DesignSystem.colors.primary,
      fontSize: DesignSystem.typography.fontSize.body,
      fontWeight: DesignSystem.typography.fontWeight.medium,
    },
  },

  input: {
    backgroundColor: DesignSystem.colors.card,
    borderWidth: 1,
    borderColor: DesignSystem.colors.border,
    borderRadius: DesignSystem.borderRadius.md,
    padding: DesignSystem.spacing.md,
    fontSize: DesignSystem.typography.fontSize.body,
  },

  heading: {
    h1: {
      fontSize: DesignSystem.typography.fontSize.heading1,
      fontWeight: DesignSystem.typography.fontWeight.bold,
      color: DesignSystem.colors.textPrimary,
      marginBottom: DesignSystem.spacing.md,
    },
    h2: {
      fontSize: DesignSystem.typography.fontSize.heading2,
      fontWeight: DesignSystem.typography.fontWeight.bold,
      color: DesignSystem.colors.textPrimary,
      marginBottom: DesignSystem.spacing.sm,
    },
    h3: {
      fontSize: DesignSystem.typography.fontSize.heading3,
      fontWeight: DesignSystem.typography.fontWeight.medium,
      color: DesignSystem.colors.textPrimary,
      marginBottom: DesignSystem.spacing.sm,
    },
  },

  text: {
    body: {
      fontSize: DesignSystem.typography.fontSize.body,
      color: DesignSystem.colors.textSecondary,
      lineHeight: DesignSystem.typography.lineHeight.normal,
    },
    caption: {
      fontSize: DesignSystem.typography.fontSize.caption,
      color: DesignSystem.colors.textTertiary,
    },
  },
};

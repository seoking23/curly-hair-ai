import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {DesignSystem} from '../styles/designSystem';

interface ResultsWatermarkProps {
  timestamp?: string;
}

/**
 * A watermark component to be displayed on saved result images
 * Includes the app logo and timestamp
 */
export const ResultsWatermark: React.FC<ResultsWatermarkProps> = ({
  timestamp = new Date().toLocaleDateString(),
}) => {
  return (
    <View style={styles.watermarkContainer}>
      <View style={styles.watermarkContent}>
        <Image
          source={require('../assets/images/curly-hair-ai-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.appName}>Curly Hair AI</Text>
          <Text style={styles.tagline}>Your Personal Hair Analysis</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  watermarkContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: DesignSystem.spacing.md,
    paddingHorizontal: DesignSystem.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: DesignSystem.colors.divider,
  },
  watermarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: DesignSystem.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  appName: {
    fontSize: DesignSystem.typography.fontSize.heading4,
    fontWeight: 'bold',
    color: DesignSystem.colors.primary,
  },
  tagline: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
  },
  timestamp: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textTertiary,
    marginTop: DesignSystem.spacing.xs,
  },
});

export default ResultsWatermark;

import React from 'react';
import {View, Text, StyleSheet, TextStyle} from 'react-native';
import {DesignSystem} from '../styles/designSystem';

interface Step {
  title: string;
  isCompleted: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  style?: any;
}

export const ProgressIndicator = ({
  steps,
  currentStep,
  style,
}: ProgressIndicatorProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = step.isCompleted || index < currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <View
                style={[
                  styles.stepCircle,
                  isActive && styles.activeStepCircle,
                  isCompleted && styles.completedStepCircle,
                ]}>
                {isCompleted ? (
                  <Text style={styles.completedStepText}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.stepText,
                      isActive && styles.activeStepText,
                    ]}>
                    {index + 1}
                  </Text>
                )}
              </View>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <View style={styles.connectorContainer}>
                  <View
                    style={[
                      styles.connector,
                      isCompleted && styles.completedConnector,
                    ]}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Step Titles */}
      <View style={styles.titlesContainer}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          return (
            <Text
              key={index}
              style={[
                styles.stepTitle,
                isActive && styles.activeStepTitle,
                {maxWidth: `${100 / steps.length}%`},
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {step.title}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: DesignSystem.spacing.lg,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: DesignSystem.colors.surface,
    borderWidth: 1,
    borderColor: DesignSystem.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: DesignSystem.colors.primary,
    borderColor: DesignSystem.colors.primary,
  },
  completedStepCircle: {
    backgroundColor: DesignSystem.colors.success,
    borderColor: DesignSystem.colors.success,
  },
  stepText: {
    fontSize: DesignSystem.typography.fontSize.small,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
    color: DesignSystem.colors.textSecondary,
  },
  activeStepText: {
    color: DesignSystem.colors.card,
  },
  completedStepText: {
    fontSize: DesignSystem.typography.fontSize.small,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.card,
  },
  connectorContainer: {
    flex: 1,
    height: 1,
    marginHorizontal: DesignSystem.spacing.xs,
  },
  connector: {
    flex: 1,
    height: 1,
    backgroundColor: DesignSystem.colors.border,
  },
  completedConnector: {
    backgroundColor: DesignSystem.colors.success,
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DesignSystem.spacing.sm,
  },
  stepTitle: {
    fontSize: DesignSystem.typography.fontSize.tiny,
    color: DesignSystem.colors.textTertiary,
    textAlign: 'center',
  },
  activeStepTitle: {
    color: DesignSystem.colors.textSecondary,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
  },
});

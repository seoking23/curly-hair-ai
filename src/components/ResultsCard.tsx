import React from 'react';
import {View, Text, StyleSheet, TextStyle} from 'react-native';
import {DesignSystem} from '../styles/designSystem';
import {Card} from './Card';

interface ResultItemProps {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

interface ResultsCardProps {
  title: string;
  items: ResultItemProps[];
  style?: any;
}

export const ResultsCard = ({title, items, style}: ResultsCardProps) => {
  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.divider} />

      {items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.resultItem,
            index < items.length - 1 && styles.resultItemWithBorder,
          ]}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{item.label}</Text>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.value}</Text>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DesignSystem.spacing.lg,
  },
  title: {
    fontSize: DesignSystem.typography.fontSize.heading3,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
    color: DesignSystem.colors.textPrimary,
    marginBottom: DesignSystem.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: DesignSystem.colors.divider,
    marginBottom: DesignSystem.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: DesignSystem.spacing.md,
  },
  resultItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: DesignSystem.colors.divider,
  },
  labelContainer: {
    width: '35%',
  },
  label: {
    fontSize: DesignSystem.typography.fontSize.caption,
    color: DesignSystem.colors.textSecondary,
    fontWeight: DesignSystem.typography.fontWeight
      .medium as TextStyle['fontWeight'],
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    fontSize: DesignSystem.typography.fontSize.body,
    color: DesignSystem.colors.textPrimary,
    fontWeight: DesignSystem.typography.fontWeight
      .bold as TextStyle['fontWeight'],
  },
  description: {
    fontSize: DesignSystem.typography.fontSize.small,
    color: DesignSystem.colors.textTertiary,
    marginTop: DesignSystem.spacing.xs,
  },
});

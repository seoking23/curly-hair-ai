import React from 'react';
import {Platform} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {DesignSystem} from '../../styles/designSystem';

interface BackArrowProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const BackArrow = ({
  size = Platform.OS === 'ios' ? 32 : 24,
  color = DesignSystem.colors.textPrimary,
  testID,
}: BackArrowProps) => {
  // Use different paths for iOS and Android to match platform conventions
  const iosPath = 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z';
  const androidPath =
    'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z';

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel="Back arrow">
      <Path
        d={Platform.select({
          ios: iosPath,
          android: androidPath,
          default: androidPath,
        })}
        fill={color}
      />
    </Svg>
  );
};

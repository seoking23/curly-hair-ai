import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface DeepConditionIconProps extends IconBaseProps {}

export const DeepConditionIcon: React.FC<DeepConditionIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Deep condition weekly or bi-weekly',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Conditioner jar */}
      <Path
        d="M7 8H17V18C17 19.1046 16.1046 20 15 20H9C7.89543 20 7 19.1046 7 18V8Z"
        fill="#F8BBD0"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Jar lid */}
      <Path
        d="M6 6H18V8H6V6Z"
        fill="#EC407A"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Hair strand with conditioner */}
      <Path
        d="M10 10C10 10 9 12 9 14C9 16 10 18 12 18C14 18 15 16 15 14C15 12 14 10 14 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Moisture droplets */}
      <Circle cx="10" cy="12" r="0.5" fill="#FFFFFF" />
      <Circle cx="14" cy="12" r="0.5" fill="#FFFFFF" />
      <Circle cx="12" cy="14" r="0.5" fill="#FFFFFF" />

      {/* Calendar indicator */}
      <Path
        d="M5 4H7V5H5V4Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 4H10V5H8V4Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 2H20V6H4V2Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};

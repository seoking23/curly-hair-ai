import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ConditionerIconProps extends IconBaseProps {}

export const ConditionerIcon: React.FC<ConditionerIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Conditioner or deep conditioner',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Conditioner bottle */}
      <Path
        d="M8 4H16V7H8V4Z"
        fill="#F48FB1"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M7 7H17L16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20L7 7Z"
        fill="#F8BBD0"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Bottle label */}
      <Path
        d="M9 10H15V16H9V10Z"
        fill="#FCE4EC"
        stroke={color}
        strokeWidth="0.75"
      />

      {/* Label text (simplified) */}
      <Path
        d="M10 12H14M10 14H14"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Moisture droplets */}
      <Circle cx="10" cy="18" r="0.5" fill="#FFFFFF" />
      <Circle cx="14" cy="18" r="0.5" fill="#FFFFFF" />
      <Circle cx="12" cy="19" r="0.5" fill="#FFFFFF" />

      {/* Hair strand with conditioner */}
      <Path
        d="M4 12C4 12 5 13 7 13M20 12C20 12 19 13 17 13"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M4 16C4 16 6 18 12 18C18 18 20 16 20 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

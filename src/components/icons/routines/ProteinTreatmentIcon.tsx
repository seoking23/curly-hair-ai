import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ProteinTreatmentIconProps extends IconBaseProps {}

export const ProteinTreatmentIcon: React.FC<ProteinTreatmentIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Protein treatment for hair',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Treatment bottle */}
      <Path
        d="M9 4H15V7H9V4Z"
        fill="#A5D6A7"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M8 7H16V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V7Z"
        fill="#C8E6C9"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Protein molecules */}
      <Circle cx="10" cy="10" r="1" fill="#66BB6A" />
      <Circle cx="14" cy="10" r="1" fill="#66BB6A" />
      <Circle cx="12" cy="12" r="1" fill="#66BB6A" />
      <Circle cx="10" cy="14" r="1" fill="#66BB6A" />
      <Circle cx="14" cy="14" r="1" fill="#66BB6A" />

      {/* Protein chain connections */}
      <Path
        d="M10 10L12 12L14 10M10 14L12 12L14 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Hair strand strengthened */}
      <Path
        d="M6 16C6 16 7 17 8 17M18 16C18 16 17 17 16 17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Strength indicator */}
      <Path
        d="M4 9L6 11M6 9L4 11"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M18 9L20 11M20 9L18 11"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

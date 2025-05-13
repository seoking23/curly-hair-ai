import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ProteinTreatmentProductIconProps extends IconBaseProps {}

export const ProteinTreatmentProductIcon: React.FC<
  ProteinTreatmentProductIconProps
> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Protein treatment product',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Treatment tube */}
      <Path
        d="M9 4L15 4L16 7L16 19C16 20.1046 15.1046 21 14 21L10 21C8.89543 21 8 20.1046 8 19L8 7L9 4Z"
        fill="#A5D6A7"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Tube cap */}
      <Path
        d="M10 2L14 2L14 4L10 4L10 2Z"
        fill="#66BB6A"
        stroke={color}
        strokeWidth="1"
      />

      {/* Tube label */}
      <Path
        d="M9 9L15 9L15 15L9 15L9 9Z"
        fill="#E8F5E9"
        stroke={color}
        strokeWidth="0.75"
      />

      {/* Protein molecules */}
      <Circle cx="10" cy="11" r="0.5" fill="#66BB6A" />
      <Circle cx="12" cy="11" r="0.5" fill="#66BB6A" />
      <Circle cx="14" cy="11" r="0.5" fill="#66BB6A" />
      <Circle cx="11" cy="13" r="0.5" fill="#66BB6A" />
      <Circle cx="13" cy="13" r="0.5" fill="#66BB6A" />

      {/* Protein chain connections */}
      <Path
        d="M10 11L12 11L14 11M11 13L13 13"
        stroke="#66BB6A"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Hair strand strengthened */}
      <Path
        d="M5 17C5 17 7 19 12 19C17 19 19 17 19 17"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Strength indicator */}
      <Path
        d="M6 16L7 17M18 16L17 17"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

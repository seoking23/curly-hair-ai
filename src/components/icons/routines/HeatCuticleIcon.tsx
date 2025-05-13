import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface HeatCuticleIconProps extends IconBaseProps {}

export const HeatCuticleIcon: React.FC<HeatCuticleIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Use heat to help open cuticles when deep conditioning',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Hair strand with cuticles */}
      <Path
        d="M12 4C9 4 7 8 7 12C7 16 9 20 12 20C15 20 17 16 17 12C17 8 15 4 12 4Z"
        fill="#D7CCC8"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Closed cuticles */}
      <Path
        d="M10 8L9 9M14 8L15 9M10 15L9 14M14 15L15 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Heat waves */}
      <Path
        d="M5 8C5.5 8.5 5.5 9.5 5 10"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M4 7C4.8 7.8 4.8 10.2 4 11"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <Path
        d="M19 8C18.5 8.5 18.5 9.5 19 10"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M20 7C19.2 7.8 19.2 10.2 20 11"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Open cuticles (after heat) */}
      <Path
        d="M9 11L7 11M15 11L17 11M9 13L7 13M15 13L17 13"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Conditioner droplets */}
      <Circle cx="10" cy="12" r="0.5" fill="#F8BBD0" />
      <Circle cx="14" cy="12" r="0.5" fill="#F8BBD0" />
      <Circle cx="12" cy="10" r="0.5" fill="#F8BBD0" />
      <Circle cx="12" cy="14" r="0.5" fill="#F8BBD0" />
    </IconBase>
  );
};

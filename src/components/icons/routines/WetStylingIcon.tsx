import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface WetStylingIconProps extends IconBaseProps {}

export const WetStylingIcon: React.FC<WetStylingIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Style on wet or damp hair',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Head silhouette */}
      <Path
        d="M12 4C9 4 7 6 7 9C7 11 8 12 8 14H16C16 12 17 11 17 9C17 6 15 4 12 4Z"
        fill="#FFCCBC"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Wet hair with water droplets */}
      <Path
        d="M8 14C8 14 7 16 7 18C7 20 9 20 10 20C11 20 12 19 12 19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16 14C16 14 17 16 17 18C17 20 15 20 14 20C13 20 12 19 12 19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Water droplets */}
      <Circle cx="9" cy="16" r="0.5" fill="#81D4FA" />
      <Circle cx="15" cy="16" r="0.5" fill="#81D4FA" />
      <Circle cx="11" cy="18" r="0.5" fill="#81D4FA" />
      <Circle cx="13" cy="18" r="0.5" fill="#81D4FA" />

      {/* Styling product */}
      <Path
        d="M4 8C4 7.44772 4.44772 7 5 7H7C7.55228 7 8 7.44772 8 8V9H4V8Z"
        fill="#CE93D8"
        stroke={color}
        strokeWidth="1"
      />
      <Path
        d="M3 9H9V12C9 13.1046 8.10457 14 7 14H5C3.89543 14 3 13.1046 3 12V9Z"
        fill="#CE93D8"
        stroke={color}
        strokeWidth="1"
      />

      {/* Styling hand */}
      <Path
        d="M18 10C18.5 10 19 10.5 19 11C19 11.5 18.5 12 18 12"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M18 12C19 12 20 13 20 14C20 15 19 16 18 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

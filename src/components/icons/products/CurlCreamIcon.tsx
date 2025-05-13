import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface CurlCreamIconProps extends IconBaseProps {}

export const CurlCreamIcon: React.FC<CurlCreamIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Curl cream or butter',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Cream jar */}
      <Path
        d="M7 8H17V18C17 19.6569 15.6569 21 14 21H10C8.34315 21 7 19.6569 7 18V8Z"
        fill="#FFCC80"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Jar lid */}
      <Path
        d="M6 6H18V8H6V6Z"
        fill="#FFA726"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M8 4H16V6H8V4Z"
        fill="#FFA726"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Cream texture */}
      <Path
        d="M9 10C9 10 10 11 12 11C14 11 15 10 15 10"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M9 13C9 13 10 14 12 14C14 14 15 13 15 13"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M9 16C9 16 10 17 12 17C14 17 15 16 15 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Curl symbol */}
      <Path
        d="M4 12C4 12 5 10 6 12C7 14 5 16 4 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M20 12C20 12 19 10 18 12C17 14 19 16 20 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Moisture droplets */}
      <Circle cx="12" cy="19" r="0.5" fill="#FFFFFF" />
      <Circle cx="10" cy="18" r="0.5" fill="#FFFFFF" />
      <Circle cx="14" cy="18" r="0.5" fill="#FFFFFF" />
    </IconBase>
  );
};

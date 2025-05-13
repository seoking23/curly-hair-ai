import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface HeatProtectantIconProps extends IconBaseProps {}

export const HeatProtectantIcon: React.FC<HeatProtectantIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Always use heat protectant before heat styling',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Hair strand */}
      <Path
        d="M12 5C9 5 7 8 7 12C7 16 9 19 12 19C15 19 17 16 17 12C17 8 15 5 12 5Z"
        fill="#D7CCC8"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Heat styling tool */}
      <Path
        d="M18 8C19.1046 8 20 8.89543 20 10V14C20 15.1046 19.1046 16 18 16H17V8H18Z"
        fill="#F5F5F5"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Heat waves */}
      <Path
        d="M15 10C15.5 10.5 15.5 11.5 15 12"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M14 9C14.8 9.8 14.8 12.2 14 13"
        stroke="#FF9800"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Shield/protectant */}
      <Path
        d="M6 10C6 10 7 11 9 11C11 11 13 9 13 9C13 9 11 13 9 13C7 13 6 12 6 12V10Z"
        fill="#81D4FA"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Spray bottle */}
      <Path
        d="M4 8C4 7.44772 4.44772 7 5 7H7C7.55228 7 8 7.44772 8 8V9H4V8Z"
        fill="#BBDEFB"
        stroke={color}
        strokeWidth="1"
      />
      <Path
        d="M3 9H9V12C9 13.1046 8.10457 14 7 14H5C3.89543 14 3 13.1046 3 12V9Z"
        fill="#BBDEFB"
        stroke={color}
        strokeWidth="1"
      />
      <Circle cx="6" cy="11" r="0.5" fill={color} />
    </IconBase>
  );
};

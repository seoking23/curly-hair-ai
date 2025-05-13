import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface AvoidHeatIconProps extends IconBaseProps {}

export const AvoidHeatIcon: React.FC<AvoidHeatIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Avoid excessive heat',
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
        strokeWidth="1"
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

      {/* Damaged hair ends */}
      <Path
        d="M9 15L8 17M12 15L13 17M10 16L11 18"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Prohibition symbol */}
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke="#D32F2F"
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M6 6L18 18"
        stroke="#D32F2F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

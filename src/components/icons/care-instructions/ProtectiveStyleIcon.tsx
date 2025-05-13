import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ProtectiveStyleIconProps extends IconBaseProps {}

export const ProtectiveStyleIcon: React.FC<ProtectiveStyleIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Consider protective styling to reduce manipulation',
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

      {/* Braided hairstyle */}
      <Path
        d="M9 14C9 16 9 18 9 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M9 15C8.5 15.5 8.5 16.5 9 17C9.5 17.5 9.5 18.5 9 19"
        stroke={color}
        strokeWidth="1"
      />

      <Path
        d="M12 14C12 16 12 18 12 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M12 15C11.5 15.5 11.5 16.5 12 17C12.5 17.5 12.5 18.5 12 19"
        stroke={color}
        strokeWidth="1"
      />

      <Path
        d="M15 14C15 16 15 18 15 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M15 15C14.5 15.5 14.5 16.5 15 17C15.5 17.5 15.5 18.5 15 19"
        stroke={color}
        strokeWidth="1"
      />

      {/* Shield symbol for protection */}
      <Path
        d="M12 7C10 8 8 8 6 7C6 10 7 13 12 15C17 13 18 10 18 7C16 8 14 8 12 7Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </IconBase>
  );
};

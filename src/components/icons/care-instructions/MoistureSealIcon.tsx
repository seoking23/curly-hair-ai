import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface MoistureSealIconProps extends IconBaseProps {}

export const MoistureSealIcon: React.FC<MoistureSealIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Seal moisture with oils or butters after conditioning',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Hair strand */}
      <Path
        d="M12 4C8 4 6 8 6 12C6 16 8 20 12 20C16 20 18 16 18 12C18 8 16 4 12 4Z"
        fill="#D7CCC8"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Oil droplets */}
      <Circle cx="9" cy="10" r="1.5" fill="#FFCC80" />
      <Circle cx="15" cy="10" r="1.5" fill="#FFCC80" />
      <Circle cx="12" cy="14" r="1.5" fill="#FFCC80" />

      {/* Lock/seal symbol */}
      <Path
        d="M12 7V9M10 9H14V11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11V9Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Water/moisture droplets */}
      <Path
        d="M8 16C7.5 15.5 7.5 14.5 8 14C8.5 14.5 8.5 15.5 8 16Z"
        fill="#81D4FA"
        stroke={color}
        strokeWidth="0.75"
      />
      <Path
        d="M16 16C15.5 15.5 15.5 14.5 16 14C16.5 14.5 16.5 15.5 16 16Z"
        fill="#81D4FA"
        stroke={color}
        strokeWidth="0.75"
      />
    </IconBase>
  );
};

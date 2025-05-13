import React from 'react';
import {Path} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface TrimEndsIconProps extends IconBaseProps {}

export const TrimEndsIcon: React.FC<TrimEndsIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Trim ends every 8-12 weeks to prevent split ends',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Scissors */}
      <Path
        d="M7 9C5.9 9 5 8.1 5 7C5 5.9 5.9 5 7 5C8.1 5 9 5.9 9 7C9 8.1 8.1 9 7 9Z"
        fill="#E0E0E0"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M7 19C5.9 19 5 18.1 5 17C5 15.9 5.9 15 7 15C8.1 15 9 15.9 9 17C9 18.1 8.1 19 7 19Z"
        fill="#E0E0E0"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M7 9L15 17M7 15L15 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Hair strand with split end */}
      <Path
        d="M15 7C15 7 16 8 17 9C18 10 19 11 19 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M15 17C15 17 16 16 17 15C18 14 19 13 19 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Calendar/time indicator */}
      <Path
        d="M17 5H19C19.5523 5 20 5.44772 20 6V8"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M17 19H19C19.5523 19 20 18.5523 20 18V16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

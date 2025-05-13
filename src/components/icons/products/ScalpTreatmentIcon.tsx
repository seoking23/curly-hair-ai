import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface ScalpTreatmentIconProps extends IconBaseProps {}

export const ScalpTreatmentIcon: React.FC<ScalpTreatmentIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Scalp treatment or oil',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Head silhouette */}
      <Path
        d="M12 3C8 3 5 6 5 10C5 14 8 16 8 16H16C16 16 19 14 19 10C19 6 16 3 12 3Z"
        fill="#FFCCBC"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Hair */}
      <Path
        d="M8 16C8 16 7 18 7 20M12 16V21M16 16C16 16 17 18 17 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Dropper bottle */}
      <Path
        d="M4 8C4 7.44772 4.44772 7 5 7H7C7.55228 7 8 7.44772 8 8V9H4V8Z"
        fill="#FFCC80"
        stroke={color}
        strokeWidth="1"
      />
      <Path
        d="M3 9H9V12C9 13.1046 8.10457 14 7 14H5C3.89543 14 3 13.1046 3 12V9Z"
        fill="#FFCC80"
        stroke={color}
        strokeWidth="1"
      />

      {/* Dropper */}
      <Path d="M6 7V5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <Circle cx="6" cy="4" r="1" fill="#FFCC80" stroke={color} />

      {/* Oil droplets on scalp */}
      <Circle cx="10" cy="8" r="0.5" fill="#FFCC80" />
      <Circle cx="14" cy="8" r="0.5" fill="#FFCC80" />
      <Circle cx="12" cy="6" r="0.5" fill="#FFCC80" />
      <Circle cx="9" cy="10" r="0.5" fill="#FFCC80" />
      <Circle cx="15" cy="10" r="0.5" fill="#FFCC80" />
      <Circle cx="12" cy="12" r="0.5" fill="#FFCC80" />

      {/* Massage lines */}
      <Path
        d="M10 5C10 5 11 4 12 5C13 6 14 5 14 5"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <Path
        d="M8 9C8 9 9 8 10 9C11 10 12 9 12 9"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <Path
        d="M12 9C12 9 13 8 14 9C15 10 16 9 16 9"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </IconBase>
  );
};

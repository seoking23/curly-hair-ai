import React from 'react';
import {Path, Circle} from 'react-native-svg';
import {IconBase, IconBaseProps} from '../IconBase';

interface LeaveInConditionerIconProps extends IconBaseProps {}

export const LeaveInConditionerIcon: React.FC<LeaveInConditionerIconProps> = ({
  color = '#6D4C41',
  accessibilityLabel = 'Leave-in conditioner',
  ...props
}) => {
  return (
    <IconBase accessibilityLabel={accessibilityLabel} {...props}>
      {/* Spray bottle */}
      <Path
        d="M9 4H15V6H9V4Z"
        fill="#CE93D8"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M8 6H16L15 19C15 20.1046 14.1046 21 13 21H11C9.89543 21 9 20.1046 9 19L8 6Z"
        fill="#E1BEE7"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Spray nozzle */}
      <Path
        d="M12 4V2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M10 2H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Spray mist */}
      <Path
        d="M16 8C16 8 17 9 18 9M16 10C16 10 18 11 19 11M16 12C16 12 17 13 18 13"
        stroke="#B39DDB"
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Bottle label */}
      <Path
        d="M10 9H14V15H10V9Z"
        fill="#F3E5F5"
        stroke={color}
        strokeWidth="0.75"
      />

      {/* Label text (simplified) */}
      <Path
        d="M11 11H13M11 13H13"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Hair strand with leave-in */}
      <Path
        d="M4 16C4 16 6 19 12 19C18 19 20 16 20 16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Circle cx="6" cy="16" r="0.5" fill="#E1BEE7" />
      <Circle cx="9" cy="17" r="0.5" fill="#E1BEE7" />
      <Circle cx="15" cy="17" r="0.5" fill="#E1BEE7" />
      <Circle cx="18" cy="16" r="0.5" fill="#E1BEE7" />
    </IconBase>
  );
};

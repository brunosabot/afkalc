import React from "react";
import classes from "./Tooltip.module.css";
// eslint-disable-next-line
import { TooltipComponentType, TooltipPosition } from "./withTooltip";

const TooltipView: TooltipComponentType = React.forwardRef(
  ({ children, left, top, position = TooltipPosition.TOP }) => (
    <div
      style={{ left, top }}
      className={`${classes.TooltipWrapper} ${classes[`Tooltip-${position}`]}`}
    >
      <span className={`${classes.Tooltip}`}>{children}</span>
      <svg className={classes.TooltipArrow} viewBox="0 0 20 20" height={10} width={10}>
        <path d="M0 0L20 0L12.5 15Q10 20, 7.5 15L0 0" />
      </svg>
    </div>
  )
);

export default TooltipView;

import React, { ComponentType, useCallback, useRef, useState } from "react";
import ModalPortal from "./ModalPortal";
import classes from "./Tooltip.module.css";
// eslint-disable-next-line
import TooltipView from "./TooltipView";

export enum TooltipPosition {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

interface IRequiredComponentProps {
  label?: React.ReactElement;
}

interface IWithTooltipProps {
  position?: TooltipPosition;
}

export type TooltipComponentType = React.FunctionComponent<{
  left: number;
  top: number;
  position?: TooltipPosition;
  children: React.ReactNode;
}>;

export function withTooltip<P extends IRequiredComponentProps>(
  WrappedComponent: ComponentType<P>,
  TooltipComponent: TooltipComponentType = TooltipView
): ComponentType<P & IWithTooltipProps> {
  const WithTooltip: React.FC<P & IWithTooltipProps> = function WithTooltip({
    position = TooltipPosition.TOP,
    ...props
  }) {
    const [show, setShow] = useState<[number, number]>([0, 0]);
    const refSpan = useRef<HTMLSpanElement>(null);
    const refTimeout = useRef<number>(0);
    const [localPosition, setLocalPosition] = useState<TooltipPosition>(position);

    const calculatePosition = useCallback((p: TooltipPosition) => {
      if (refSpan.current === null) return [0, 0];

      let el: HTMLElement | null = refSpan.current;
      let left = el.offsetWidth / 2;
      if (p === TooltipPosition.RIGHT) left = el.offsetWidth;
      if (p === TooltipPosition.LEFT) left = 0;

      let top = el.offsetHeight / 2;
      if (p === TooltipPosition.BOTTOM) top = el.offsetHeight;
      if (p === TooltipPosition.TOP) top = 0;

      while (el) {
        left += el.offsetLeft;
        top += el.offsetTop;

        el = el.offsetParent as HTMLElement | null;
      }

      const pageScroll = document.getElementById("page")?.scrollTop ?? 0;

      return [left, top - pageScroll];
    }, []);

    const onMouseOverCapture = useCallback(() => {
      window.clearTimeout(refTimeout.current);

      if (refSpan.current === null) return;

      const [left, top] = calculatePosition(position);

      if (top < 120) {
        const [aLeft, aTop] = calculatePosition(TooltipPosition.BOTTOM);
        setShow([aLeft, aTop]);
        setLocalPosition(TooltipPosition.BOTTOM);
      } else {
        setShow([left, top]);
        setLocalPosition(position);
      }
    }, [calculatePosition, position]);

    const onMouseOutCapture = useCallback(() => {
      refTimeout.current = window.setTimeout(() => setShow([0, 0]), 10);
    }, []);

    return (
      <span
        ref={refSpan}
        className={classes.WithTooltip}
        onFocusCapture={onMouseOverCapture}
        onBlurCapture={onMouseOutCapture}
        onMouseOverCapture={onMouseOverCapture}
        onMouseOutCapture={onMouseOutCapture}
      >
        {props.label ? (
          <ModalPortal active={show[0] !== 0 || show[1] !== 0}>
            <TooltipComponent left={show[0]} top={show[1]} position={localPosition}>
              {props.label}
            </TooltipComponent>
          </ModalPortal>
        ) : null}
        <WrappedComponent {...(props as P)} />
      </span>
    );
  };

  return WithTooltip;
}

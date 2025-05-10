declare module 'react-vertical-timeline-component' {
  import * as React from 'react';

  export interface VerticalTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    layout?: '1-column' | '2-columns';
    lineColor?: string;
    animate?: boolean;
    children?: React.ReactNode;
  }

  export interface VerticalTimelineElementProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    date?: React.ReactNode;
    dateClassName?: string;
    icon?: React.ReactNode;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    iconOnClick?: () => void;
    onTimelineElementClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
    textClassName?: string;
    intersectionObserverProps?: any;
    visible?: boolean;
    children?: React.ReactNode;
  }

  export const VerticalTimeline: React.ComponentType<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.ComponentType<VerticalTimelineElementProps>;
}
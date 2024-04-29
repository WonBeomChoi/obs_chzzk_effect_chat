import { ReactNode } from 'react';

export interface ChangeHandler {
  (deltaX: number, deltaY: number, deltaWidth?: number, deltaHeight?: number): void;
}

export interface InteractionLayoutProps {
  children: ReactNode;
  type: 'chat' | 'effect';
  saveCallback: (type: 'chat' | 'effect') => void;
}

// H : horizon
// V : Vertical
export interface Direction {
  V?: string;
  H?: string;
}

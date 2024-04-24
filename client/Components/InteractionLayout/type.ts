export interface ChangeHandler {
  (
    deltaX: number,
    deltaY: number,
    deltaWidth?: number,
    deltaHeight?: number
  ): void;
}

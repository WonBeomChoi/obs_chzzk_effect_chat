type Direction = {
  V?: string;
  H?: string;
};

export function getDelta(deltaH: number, deltaV: number, direction: Direction) {
  let dx = 0,
    dy = 0,
    dw = 0,
    dh = 0;

  const { V, H } = direction;

  switch (H) {
    case "W":
      dx = deltaH;
      dw = -deltaH;
      break;
    case "E":
      dw = deltaH;
      break;
  }

  switch (V) {
    case "N":
      dy = deltaV;
      dh = -deltaV;
      break;
    case "S":
      dh = deltaV;
      break;
  }

  return { dx, dy, dw, dh };
}

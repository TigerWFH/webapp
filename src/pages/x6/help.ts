export const ItemTypes = {
  KNIGHT: 'knight'
};

const position = {
  knightX: 0,
  knightY: 0
};
let observer: ((arg0: { knightX: number; knightY: number }) => void) | null =
  null;

export function observe(o: any) {
  if (!!observer) {
    throw new Error('');
  }

  observer = o;
}

// function emitChange() {
//   observe(position);
// }

export function moveKnight(toX: number, toY: number) {
  position.knightX = toX;
  position.knightY = toY;
}

export function canMoveKnight(toX: number, toY: number) {
  const { knightX, knightY } = position;
  const dx = toX - knightX;
  const dy = toY - knightY;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}

import { tileType } from './GameConstants';
// Takes a map matrix and a coordinate object
// Returns false if not a wall, otherwise the direction of the open tile
export default function (map, coords) {
  // return false if tile isn't wall
  if (map[coords.x][coords.y] !== tileType.WALL) {
    return false;
  }
  // left is open
  if (typeof map[coords.x - 1] !== 'undefined' && map[coords.x - 1][coords.y] === tileType.FLOOR) {
    return 'left';
  }
  // right is open
  if (typeof map[coords.x + 1] !== 'undefined' && map[coords.x + 1][coords.y] === tileType.FLOOR) {
    return 'right';
  }
  // top is open
  if (map[coords.x][coords.y - 1] === tileType.FLOOR) {
    return 'top';
  }
  // bottom is open
  if (map[coords.x][coords.y + 1] === tileType.FLOOR) {
    return 'bottom';
  }

  return false;
}

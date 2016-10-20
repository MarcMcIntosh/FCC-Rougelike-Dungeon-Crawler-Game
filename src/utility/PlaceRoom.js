import fillRect from './FillRect';
import findWall from './FindWall';
import { tileType } from './GameConstants';
import getDoorOffset from './GetDoorOffset';
// Will keep trying to place random rooms in random places until it succeeds.

export default function placeRoom(map, maxRoomSize, minRoomSize) {
  let map2 = map;
  let numClear = 0;
  const wall = findWall(map2);
  const coords = wall.coords;
  const width = Math.floor((Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize);
  const height = Math.floor((Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize);

  let startX;
  let startY;

  switch (wall.openDir) {
    case 'right':
      startX = coords.x - width;
      startY = (coords.y - Math.floor(height / 2)) + getDoorOffset(height);
      break;
    case 'left':
      startX = coords.x + 1;
      startY = (coords.y - Math.floor(height / 2)) + getDoorOffset(height);
      break;
    case 'top':
      startX = (coords.x - Math.floor(width / 2)) + getDoorOffset(width);
      startY = coords.y + 1;
      break;
    case 'bottom':
      startX = (coords.x - Math.floor(width / 2)) + getDoorOffset(width);
      startY = coords.y - height;
      break;
    default:
      break;
  }
  // Exit if room would be outside matrix
  if (
    startX < 0 || startY < 0 || startX + width >= map2.length || startY + height >= map2[0].length
  ) {
    return placeRoom(map2, maxRoomSize, minRoomSize);
  }
  // check if all spaces are clear
  for (let i = startX; i < startX + width; i += 1) {
    if (map2[i].slice(startY, startY + height).every(tile => tile === tileType.WALL)) {
      numClear += 1;
    }
  }

  if (numClear === width) {
    map2 = fillRect(map2, {
      x: startX, y: startY,
    }, {
      x: width, y: height,
    }, tileType.FLOOR);
    map2[coords.x][coords.y] = 1;

    return map2;
  }
  return placeRoom(map2, maxRoomSize, minRoomSize);
}

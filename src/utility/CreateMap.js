import _ from 'lodash';
import { tileType } from './GameConstants';
import fillRect from './FillRect';
import placeRoom from './PlaceRoom';

export default function createMap(w = 100, h = 100, maxRS = 20, minRS = 6, maxHL = 5, n = 20) {
  // init grid of walls
  let map = _.fill(Array(w), 0);
  const blankCol = _.fill(Array(h), tileType.WALL);
  map = map.map(() => blankCol.slice());
  // create first room
  map = fillRect(map, { x: 45, y: 45 }, { x: 10, y: 10 }, tileType.FLOOR);
  // create rooms
  for (let i = 0; i < n; i += 1) {
    map = placeRoom(map, maxRS, minRS);
  }
  return map;
}

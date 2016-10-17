import isWall from './IsWall';

export default function (map) {
  const coords = { x: 0, y: 0 };
  let openDir = false;
  do {
    coords.x = Math.floor(Math.random() * map.length);
    coords.y = Math.floor(Math.random() * map[0].length);
    openDir = isWall(map, coords);
  } while (!openDir);

  return { coords, openDir };
}

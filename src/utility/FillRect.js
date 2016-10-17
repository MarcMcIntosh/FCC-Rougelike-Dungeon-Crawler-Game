import _ from 'lodash';

export default function (map, startCoord, size, fillVal) {
  for (let i = startCoord.x; i < startCoord.x + size.x; i += 1) {
    _.fill(map[i], fillVal, startCoord.y, size.y + startCoord.y);
  }
  return map;
}

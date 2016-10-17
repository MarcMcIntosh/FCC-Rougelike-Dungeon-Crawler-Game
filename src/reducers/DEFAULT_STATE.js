import { DEFAULT as entities } from './entities';
import { DEFAULT as level } from './level';
import { DEFAULT as map } from './map';
import { DEFAULT as occupiedSpaces } from './occupiedSpaces';

const DEFAULT_STATE = {
  darkness: true,
  level,
  map,
  entities,
  occupiedSpaces,
  window,
};

export default DEFAULT_STATE;

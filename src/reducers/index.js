import reduceReducers from 'reduce-reducers';
import darkness from './darkness';
import entities from './entities';
import level from './level';
import map from './map';
import occupiedSpaces from './occupiedSpaces';
import window from './window';

export default reduceReducers(
  darkness,
  window,
  entities,
  level,
  map,
  occupiedSpaces,
);

import { combineReducers } from 'redux';
import darkness from './darkness';
import entities from './entities';
import level from './level';
import map from './map';
import occupiedSpaces from './occupiedSpaces';
import window from './window';

export default combineReducers({
  darkness,
  entities,
  level,
  map,
  occupiedSpaces,
  window,
});

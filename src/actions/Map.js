import createMap from '../utility/CreateMap';

export const RESET_MAP = 'RESET_MAP';
export function resetMap() {
  return { type: RESET_MAP, map: createMap() };
}

export const SET_MAP = 'SET_MAP';
export function setMap() {
  return { type: SET_MAP, map: createMap() };
}

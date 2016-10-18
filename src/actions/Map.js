export const RESET_MAP = 'RESET_MAP';
export function resetMap(map) {
  return { type: RESET_MAP, map };
}

export const SET_MAP = 'SET_MAP';
export function setMap(map) {
  return { type: SET_MAP, map };
}

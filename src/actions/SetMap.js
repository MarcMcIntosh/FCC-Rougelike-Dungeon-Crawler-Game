export const SET_MAP = 'SET_MAP';

export function setMap(map) {
  return { type: SET_MAP, map };
}

export default function (map) {
  return dispatch => dispatch(setMap(map));
}

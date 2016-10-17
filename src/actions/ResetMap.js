export const RESET_MAP = 'RESET_MAP';

export function resetMap(map) {
  return { type: RESET_MAP, map };
}
// Could use createmap here?
export default function (map) {
  return dispatch => dispatch(resetMap(map));
}

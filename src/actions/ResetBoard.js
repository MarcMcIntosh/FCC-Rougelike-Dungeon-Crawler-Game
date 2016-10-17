export const RESET_BOARD = 'RESET_BOARD';

export function resetBoard() {
  return { type: RESET_BOARD };
}

export default function () {
  return dispatch => dispatch(resetBoard());
}

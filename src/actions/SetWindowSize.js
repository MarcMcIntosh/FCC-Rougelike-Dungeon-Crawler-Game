export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';

export function setWindowSize() {
  return {
    type: SET_WINDOW_SIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
// Re-write this
export default function () {
  return dispatch => dispatch(setWindowSize());
}

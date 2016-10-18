export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';

export default function () {
  return {
    type: SET_WINDOW_SIZE,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };
}

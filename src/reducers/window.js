import { SET_WINDOW_SIZE } from '../actions/Window';

export const windowWidth = 500;
export const windowHeight = 500;

export default function (state, action) {
  switch (action.type) {
    case SET_WINDOW_SIZE: return {
      ...state,
      windowHeight: action.windowHeight,
      windowWidth: action.windowWidth,
    };
    default: return state;
  }
}

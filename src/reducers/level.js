import {
  RESET_LEVEL,
  INCREASE_LEVEL,
} from '../actions/Level';

export const DEFAULT = 0;

export default function (state, action) {
  switch (action.type) {
    case INCREASE_LEVEL: return {
      ...state,
      level: state.level + 1,
    };
    case RESET_LEVEL: return {
      ...state,
      level: 0,
    };
    default: return state;
  }
}

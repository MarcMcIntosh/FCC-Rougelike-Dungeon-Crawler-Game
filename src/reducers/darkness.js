import { TOGGLE_DARKNESS } from '../actions/ToggleDarkness';
import DEFAULT_STATE from './DEFAULT_STATE';

export const DEFAULT = false;

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case TOGGLE_DARKNESS: return {
      ...state, darkness: action.darkness,
    };
    default: return state;
  }
}

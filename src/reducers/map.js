export const DEFAULT = [];

export default function (state, action) {
  switch (action.type) {
    case 'SET_MAP': return { ...state, map: action.map };
    case 'RESET_MAP': return { ...state, map: action.map };
    default: return state;
  }
}

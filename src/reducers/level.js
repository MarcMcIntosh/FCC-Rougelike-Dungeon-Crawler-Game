export const DEFAULT = 0;

export default function (state, action) {
  switch (action.type) {
    case 'INCREASE_LEVEL': return action.level;
    case 'RESET_LEVEL': return action.level;
    default: return state;
  }
}

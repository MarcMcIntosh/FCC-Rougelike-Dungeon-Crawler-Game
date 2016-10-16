const DEFAULT = false;

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case 'TOGGLE_DARKNESS': return {
      ...state, darkenss: !state.darkness,
    };
    default: return state;
  }
}

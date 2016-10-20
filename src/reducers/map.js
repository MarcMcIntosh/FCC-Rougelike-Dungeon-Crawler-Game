import createMap from '../utility/CreateMap';

export const DEFAULT = createMap();

export default function (state, action) {
  switch (action.type) {
    case 'SET_MAP': return { ...state, map: createMap() };
    case 'RESET_MAP': return { ...state, map: createMap() };
    default: return state;
  }
}

import {
  RESET_LEVEL,
  INCREASE_LEVEL,
  LEVEL_UP,
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
    case LEVEL_UP: return {
      ...state,
      entities: {
        ...state.entities,
        player: {
          ...state.entities.player,
          attack: state.entities.player.attack + action.attack,
          health: state.entities.player.health + action.health,
          toNextLevel: action.toNextLevel,
          level: state.entities.player.level + 1,
        },
      },
    };
    default: return state;
  }
}

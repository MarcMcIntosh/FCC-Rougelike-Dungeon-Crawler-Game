import {
  GAIN_XP,
  DAMAGE,
  HEAL,
  SWITCH_WEAPON,
} from '../actions/Entities';

export const DEFAULT = {
  entityType: 'player',
  x: 0,
  y: 0,
  health: 100,
  inventory: {},
  weapon: 'stick',
  attack: 7,
  level: 0,
  toNextLevel: 60,
};
// entities exclusive Action Types
export default function (state, action) {
  switch (action.type) {
    case DAMAGE: return {
      ...state,
      entities: {
        ...state.entities,
        [action.entityName]: {
          ...state.entities[action.entityName],
          health: state.entities[action.entityName].health - action.value,
        },
      },
    };
    case HEAL: return {
      ...state,
      entities: {
        ...state.entities,
        [action.entityName]: {
          ...state.entities[action.entityName],
          health: state.entities.player.health + action.value,
        },
      },
    };
    case SWITCH_WEAPON: return {
      ...state,
      entities: {
        ...state.entities,
        player: {
          ...state.entities.player,
          weapon: action.weapon,
          attack: state.entities.player.attack + action.attack,
        },
      },
    };
    case GAIN_XP: return {
      ...state,
      entities: {
        ...state.entities,
        player: {
          ...state.entities.player,
          toNextLevel: state.entities.player.toNextLevel - action.xp,
        },
      },
    };
    default: return state;
  }
}

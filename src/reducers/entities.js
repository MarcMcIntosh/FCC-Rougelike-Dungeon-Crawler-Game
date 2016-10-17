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
    case 'DAMAGE': return { ...state,
      [action.entityName]: {
        ...state[action.entityName],
        health: state[action.entityName].health - action.value,
      },
    };
    case 'HEAL': return { ...state,
      [action.entityName]: {
        ...state[action.entityName],
        health: state.player.health + action.value,
      },
    };
    case 'SWITCH_WEAPON': return {
      ...state,
      player: {
        ...state.player,
        weapon: action.weapon,
        attack: state.player.attack + action.attack,
      },
    };
    default: return state;
  }
}

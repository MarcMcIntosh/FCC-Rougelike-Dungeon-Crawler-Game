const DEFAULT = {
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

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case 'DAMAGE': return {
      ...state,
      entities: {
        ...state.entities,
        [action.entityName]: {
          ...state.entities[action.entityName],
          health: state.entities[action.entityName].health - action.value,
        },
      },
    };
    default: return state;
  }
}

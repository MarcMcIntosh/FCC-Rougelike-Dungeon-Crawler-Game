export const ADD_ENTITY = 'ADD_ENTITY';

export function addEntity(entityName, entityType, health, attack, location) {
  return {
    type: ADD_ENTITY,
    entityName,
    entityType,
    health,
    attack,
    location,
  };
}

export default function (entityName, entityType, health, attack, location) {
  return dispatch => dispatch(addEntity(entityName, entityType, health, attack, location));
}

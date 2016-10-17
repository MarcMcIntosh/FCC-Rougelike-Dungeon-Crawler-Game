export const REMOVE_ENTITY = 'REMOVE_ENTITY';

export function removeEntity(entityName) {
  return { type: REMOVE_ENTITY, entityName };
}

export default function (entityName) {
  return dispatch => dispatch(removeEntity(entityName));
}

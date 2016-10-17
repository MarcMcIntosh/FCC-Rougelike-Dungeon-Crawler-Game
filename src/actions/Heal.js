export const HEAL = 'HEAL';
export function heal(entityName, value) {
  return { type: HEAL, entityName, value };
}
export default function (entityName, value) {
  return dispatch => dispatch(heal(entityName, value));
}

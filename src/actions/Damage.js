export const DAMAGE = 'DAMAGE';
export function damage(entityName, value) {
  return { type: DAMAGE, entityName, value };
}
export default function (entityName, value) {
  return dispatch => dispatch(damage(entityName, value));
}

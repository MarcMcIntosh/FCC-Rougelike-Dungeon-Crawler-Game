export const MOVE = 'MOVE';

function move(entityName, vector) {
  return { type: MOVE, entityName, vector };
}

export default function (entityName, vector) {
  return dispatch => dispatch(move(entityName, vector));
}

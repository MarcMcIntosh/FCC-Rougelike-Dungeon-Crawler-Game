export const SET_LOCATION = 'SET_LOCATION';

export function setLocation(entityName, location) {
  return { type: SET_LOCATION, entityName, location };
}

export default function (entityName, location) {
  return dispatch => dispatch(setLocation(entityName, location));
}

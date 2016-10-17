export const ADD_BOSS = 'ADD_BOSS';

export function addBoss(attack, health, location) {
  return { type: ADD_BOSS, attack, health, location };
}

export default function (attack, health, location) {
  return dispatch => dispatch(addBoss(attack, health, location));
}

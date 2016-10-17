export const SWITCH_WEAPON = 'SWITCH_WEAPON';

export function switchWeapon(weapon, attack) {
  return { type: SWITCH_WEAPON, weapon, attack };
}

export default function (weapon, attack) {
  return dispatch => dispatch(switchWeapon(weapon, attack));
}

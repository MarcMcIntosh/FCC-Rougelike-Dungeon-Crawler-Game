export const GAIN_XP = 'GAIN_XP';

export function gainXp(xp) {
  return { type: GAIN_XP, xp };
}

export default function (xp) {
  return dispatch => dispatch(gainXp(xp));
}

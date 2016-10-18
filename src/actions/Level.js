
export const RESET_LEVEL = 'RESET_LEVEL';
export function resetLevel() {
  return { type: RESET_LEVEL };
}

export const INCREASE_LEVEL = 'INCREASE_LEVEL';
export function increaseLevel() {
  return { type: INCREASE_LEVEL };
}

export const LEVEL_UP = 'LEVEL_UP';
export function levelUp(attack, health, toNextLevel) {
  return { type: LEVEL_UP, attack, health, toNextLevel };
}

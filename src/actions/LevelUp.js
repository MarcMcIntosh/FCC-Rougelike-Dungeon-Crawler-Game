export const LEVEL_UP = 'LEVEL_UP';
export default function (attack, health, toNextLevel) {
  return { type: LEVEL_UP, attack, health, toNextLevel };
}

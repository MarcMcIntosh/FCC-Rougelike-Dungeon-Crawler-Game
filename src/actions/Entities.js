export const GAIN_XP = 'GAIN_XP';
export function gainXp(xp) {
  return { type: GAIN_XP, xp };
}

export const DAMAGE = 'DAMAGE';
export function damage(entityName, value) {
  return { type: DAMAGE, entityName, value };
}

export const HEAL = 'HEAL';
export function heal(entityName, value) {
  return { type: HEAL, entityName, value };
}
export const SWITCH_WEAPON = 'SWITCH_WEAPON';
export function switchWeapon(weapon, attack) {
  return { type: SWITCH_WEAPON, weapon, attack };
}


export const LEVEL_UP = 'LEVEL_UP';
export function levelUp(attack, health, toNextLevel) {
  return { type: LEVEL_UP, attack, health, toNextLevel };
}

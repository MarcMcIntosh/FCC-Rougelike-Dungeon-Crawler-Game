import _ from 'lodash';
import {
  MOVE,
  SET_LOCATION,
  RESET_BOARD,
  ADD_BOSS,
  ADD_ENTITY,
  REMOVE_ENTITY,
} from '../actions/OccupiedSpaces';

export const DEFAULT = { '0x0': 'player' };

export default function (state, action) {
  switch (action.type) {
    case MOVE: return {
      ...state,
      occupiedSpaces: _.chain(
        state.occupiedSpaces
      ).omit(
        `${state.entities[action.entityName].x}x${state.entities[action.entityName].y}`
      ).set(`${state.entities[action.entityName].x + action.vector.x}x${state.entities[action.entityName].y + action.vector.y}`,
        action.entityName
      ).value(),
      entities: {
        ...state.entities,
        [action.entityName]: {
          ...state.entities[action.entityName],
          x: state.entities[action.entityName].x + action.vector.x,
          y: state.entities[action.entityName].y + action.vector.y,
        },
      },
    };
    case SET_LOCATION: return {
      ...state,
      occupiedSpaces: _.chain(
        state.occupiedSpaces
      ).omit(
        `${state.entities[action.entityName].x}x${state.entities[action.entityName].y}`
      ).set(
        `${action.location.x}x${action.location.y}`,
        action.entityName
      ).value(),
      entities: {
        ...state.entities,
        [action.entityName]: {
          ...state.entities[action.entityName],
          x: action.location.x,
          y: action.location.y,
        },
      },
    };
    case ADD_ENTITY: return {
      ...state,
      occupiedSpaces: {
        ...state.occupiedSpaces,
        [
          `${action.location.x}x${action.location.y}`
        ]: action.entityName,
      },
      entities: {
        ...state.entities,
        [action.entityName]: {
          entityType: action.entityType,
          health: action.health,
          attack: action.attack,
          x: action.location.x,
          y: action.location.y,
        },
      },
    };
    case REMOVE_ENTITY: return {
      ...state,
      occupiedSpaces: _.chain(
        state.occupiedSpaces
      ).omit(
        `${state.entities[action.entityName].x}x${state.entities[action.entityName].y}`
      ).value(),
      entities: _.chain(state.entities).omit(action.entityName).value(),
    };
    case RESET_BOARD: return {
      ...state,
      entities: { player: state.entities.player },
      occupiedSpaces: {
        [
          `${state.entities.player.x}x${state.entities.player.y}`
        ]: 'player',
      },
    };
    case ADD_BOSS: return {
      ...state,
      occupiedSpaces: {
        ...state.occupiedSpaces,
        [`${action.location.x}x${action.location.y}`]: 'boss',
        [`${action.location.x + 1}x${action.location.y}`]: 'boss',
        [`${action.location.x}x${action.location.y + 1}`]: 'boss',
        [`${action.location.x + 1}x${action.location.y + 1}`]: 'boss',
      },
      entities: {
        ...state.entities,
        boss: {
          entityType: 'enemy',
          health: action.health,
          attack: action.attack,
          x: action.location.x,
          y: action.location.y,
        },
      },
    };
    default: return state;
  }
}

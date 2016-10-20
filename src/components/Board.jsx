import React from 'react';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';
import setWindowSize from '../actions/Window';
import {
  resetMap,
  setMap,
} from '../actions/Map';
import {
  increaseLevel,
  resetLevel,
} from '../actions/Level';
import {
  addBoss,
  move,
  setLocation,
  removeEntity,
  resetBoard,
  addEntity,
} from '../actions/OccupiedSpaces';
import {
  weaponTypes,
  ENEMY,
  ATTACK_VARIANCE,
  tileType,
  reverseLookup,
  PLAYER,
} from '../utility/GameConstants';
import notifier from '../utility/notifier';
import {
  damage,
  gainXp,
  heal,
  switchWeapon,
  levelUp,
} from '../actions/Entities';

class Board extends React.Component {
  constructor() {
    super();
    this._handleKeypress = this._handleKeypress.bind(this);
    this._handleSwipe = this._handleSwipe.bind(this);
  }
  componentWillMount() {
    this._setupGame();
  }
  componentDidMount() {
    if (this.props.entities.player.toNextLevel <= 0) {
      this._playerLeveledUp();
    }
    window.addEventListener('keydown', this._handleKeypress);
    window.addEventListener('resize', this.props.setWindowSize);
    // Setup touch controls
    const touchElement = document.getElementById('App');
    const hammertime = new Hammer(touchElement);
    hammertime.get('swipe').set({
      direction: Hammer.DIRECTION_ALL,
    });
    hammertime.on('swipe', this._handleSwipe);
  }
  componentWillUnmount() {
      // this.unsubscribe();
    window.removeEventListener('keydown', this._handleKeypress);
    window.removeEventListener('resize', setWindowSize);
  }
  _playerLeveledUp() {
    const currLevel = this.props.player.level + 1;
    const attack = currLevel * PLAYER.attack;
    const health = currLevel * PLAYER.health;
    const toNext = (currLevel + 1) * PLAYER.toNextLevel;
    this.props.levelUp(attack, health, toNext);
  }
  _addVector(coords, vector) {
    return {
      x: coords.x + vector.x,
      y: coords.y + vector.y,
    };
  }
  _handleKeypress(e) {
    let vector = '';
    switch (e.keyCode) {
      case 37: vector = { x: -1, y: 0 }; break;
      case 38: vector = { x: 0, y: -1 }; break;
      case 39: vector = { x: 1, y: 0 }; break;
      case 40: vector = { x: 0, y: 1 }; break;
      default: vector = ''; break;
    }
    if (vector) {
      e.preventDefault();
      this._handleMove(vector);
    }
  }
  _handleSwipe(e) {
    let vector;
    const { overallVelocity, angle } = e;
    if (Math.abs(overallVelocity) > 0.75) {
      if (angle > -100 && angle < -80) {
        vector = { x: 0, y: -1 };
      }
      if (angle > -10 && angle < 10) {
        vector = { x: 1, y: 0 };
      }
      if (angle > 80 && angle < 100) {
        vector = { x: 0, y: 1 };
      }
      if (Math.abs(angle) > 170) {
        vector = { x: -1, y: 0 };
      }
    }
    if (vector) {
      e.preventDefault();
      this._handleMove(vector);
    }
  }
  _handleMove(vector) {
    const player = this.props.player;
    const map = this.props.map;
    const newCoords = this._addVector({
      x: player.x,
      y: player.y,
    }, vector);

    if (
      newCoords.x > 0
      && newCoords.y > 0
      && newCoords.x < map.length
      && newCoords.y < map[0].length
      && map[newCoords.x][newCoords.y] !== tileType.WALL
    ) {
    // Tile is not a wall, determine if it contains an entity
      const entityName = this.props.occupiedSpaces[
        `${newCoords.x}x${newCoords.y}`
      ];
      // move and return if empty
      if (!entityName) {
        this.props.move('player', vector);
        return;
      }
      // handle encounters with entities
      const entity = this.props.entities[entityName];
      switch (entity.entityType) {
        case 'weapon':
          this.props.switchWeapon(entityName, entity.attack);
          this.props.move('player', vector);
          break;
        case 'boss':
        case 'enemy': {
          const playerAttack = Math.floor(
            (Math.random() * ATTACK_VARIANCE) + (player.attack - ATTACK_VARIANCE)
          );
          const enemyAttack = Math.floor(
            (Math.random() * ATTACK_VARIANCE) + (entity.attack - ATTACK_VARIANCE)
          );
          // Will hit kill enemy?
          if (entity.health > playerAttack) {
            // Will rebound hit kill player?
            if (enemyAttack > player.health) {
              notifier.error('You died. Better luck next time!');
              this._setupGame();
              return;
            }
            this.props.damage(entityName, playerAttack);
            this.props.damage('player', enemyAttack);
          } else {
            // Is the enemy a boss?
            if (entityName === 'boss') {
              notifier.success('A winner is you!');
              this._setupGame();
              return;
            }
            this.props.gainXp((this.props.level + 1) * ENEMY.xp);
            this.props.removeEntity(entityName);
          }
        }
          break;
        case 'health':
          this.props.heal('player', entity.health);
          this.props.removeEntity(entityName);
          this.props.move('player', vector);
          break;
        case 'exit':
          this.props.resetBoard();
          this.props.setMap();
          this.props.setLocation('player', this._getEmptyCoords());
          this.props.increaseLevel();
          this._fillMap();
          break;
        default: break;
      }
    }
  }
  _setupGame() {
    this.props.resetMap();
    this._fillMap();
    if (this.props.entities.player.toNextLevel <= 0) {
      this._playerLeveledUp();
    }
    this.props.setWindowSize();
  }
  _fillMap() {
    // Place player
    this.props.setLocation('player', this._getEmptyCoords());
    // Place items

    const weapon = weaponTypes[this.props.level];
    this.props.addEntity(weapon.entityName, 'weapon', weapon.health, weapon.attack, this._getEmptyCoords());
    // Place heath and enemies
    const NUM_THINGS = 5;
    const HEALTH_VAL = 20;
    const LEVEL_MULT = this.props.level + 1;

    for (let i = 0; i < NUM_THINGS; i += 1) {
      this.props.addEntity(`health${i}`, 'health', HEALTH_VAL, 0, this._getEmptyCoords());
      this.props.addEntity(`enemy${i}`, 'enemy', LEVEL_MULT * ENEMY.health,
        LEVEL_MULT * ENEMY.attack, this._getEmptyCoords());
    }
    // Place exit if not last level
    if (this.props.level < 4) {
      this.props.addEntity('exit', 'exit', 0, 0, this._getEmptyCoords());
    }
    // Place boss on last (fifth) level
    if (this.props.level === 4) {
      this.props.addBoss(125, 500, this._getEmptyCoords());
    }
  }
  _getEmptyCoords() {
    const { map, occupiedSpaces } = this.props.getState();
    let coords;
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * map.length);
      y = Math.floor(Math.random() * map[0].length);
      if (map[x][y] === tileType.FLOOR && !occupiedSpaces[`${x}x${y}`]) {
        coords = { x, y };
      }
    } while (!coords);
    return coords;
  }
  render() {
    const {
      map,
      entities,
      occupiedSpaces,
      entities: { player },
      windowHeight,
      windowWidth,
      darkness,
    } = this.props.getState();
    const SIGHT = 7;
    // This should match the css height and width in pixels
    const tileSize = document.getElementsByClassName('tile').item(0) ? document.getElementsByClassName('tile').item(0).clientHeight : 10;

    // Get start coords for current viewport
    const numCols = Math.floor((windowWidth / tileSize) - 5);
    const numRows = Math.floor((windowHeight / tileSize) - 17);
    let startX = Math.floor(player.x - (numCols / 2));
    let startY = Math.floor(player.y - (numRows / 2));
    // Make sure start isn't less than 0
    if (startX < 0) startX = 0;
    if (startY < 0) startY = 0;
    // Set end coords
    let endX = startX + numCols;
    let endY = startY + numRows;
    // Final validation of start and end coords
    if (endX > map.length) {
      startX = numCols > map.length ? 0 : startX - (endX - map.length);
      endX = map.length;
    }
    if (endY > map[0].length) {
      startY = numRows > map[0].length ? 0 : startY - (endY - map[0].length);
      endY = map[0].length;
    }

    // Create visible gameboard
    const rows = [];
    let tileClass;
    let row;
    for (let y = startY; y < endY; y += 1) {
      row = [];
      for (let x = startX; x < endX; x += 1) {
        const entity = occupiedSpaces[`${x}x${y}`];
        if (!entity) {
          tileClass = reverseLookup[map[x][y]];
        } else {
          tileClass = entities[entity].entityType;
        }
        if (darkness) {
          // check if it should be dark
          const xDiff = player.x - x;
          const yDiff = player.y - y;
          if (Math.abs(xDiff) > SIGHT || Math.abs(yDiff) > SIGHT) {
            tileClass += ' dark';
          } else if (Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) >= SIGHT) {
            tileClass += ' dark';
          }
        }
        /* row.push(React.createElement('span', {
          className: `tile ${tileClass}`,
          key: `${x}x${y}`,
        }, ' '));*/
        row.push(<span
          key={`${x}x${y}`}
          className={`tile ${tileClass}`}
        />);
      }
      /* rows.push(React.createElement('div', {className: 'boardRow', key: 'row' + y}, row)) */
      rows.push(<div key={`row${y}`} className="boardRow">{row}</div>);
    }
    return (<div id="board">
      {rows}
    </div>);
  }
}

Board.propTypes = {
  getState: React.PropTypes.func.isRequired,
  setWindowSize: React.PropTypes.func.isRequired,
  resetMap: React.PropTypes.func.isRequired,
  setMap: React.PropTypes.func.isRequired,
  setLocation: React.PropTypes.func.isRequired,
  addEntity: React.PropTypes.func.isRequired,
  addBoss: React.PropTypes.func.isRequired,
  move: React.PropTypes.func.isRequired,
  switchWeapon: React.PropTypes.func.isRequired,
  damage: React.PropTypes.func.isRequired,
  gainXp: React.PropTypes.func.isRequired,
  heal: React.PropTypes.func.isRequired,
  resetBoard: React.PropTypes.func.isRequired,
  increaseLevel: React.PropTypes.func.isRequired,
  levelUp: React.PropTypes.func.isRequired,
  removeEntity: React.PropTypes.func.isRequired,
  player: React.PropTypes.object.isRequired,
  entities: React.PropTypes.object.isRequired,
  map: React.PropTypes.array.isRequired,
  occupiedSpaces: React.PropTypes.object.isRequired,
  level: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired,
  windowWidth: React.PropTypes.number.isRequired,
  darkness: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  player: state.entities.player,
  entities: state.entities,
  map: state.map,
  occupiedSpaces: state.occupiedSpaces,
  level: state.level,
  windowHeight: state.windowHeight,
  windowWidth: state.windowWidth,
  darkness: state.darkness,
});

const mapDispatchToProps = dispatch => ({
  // Window
  setWindowSize: () => dispatch(setWindowSize()),
  // Level
  increaseLevel: () => dispatch(increaseLevel()),
  resetLevel: () => dispatch(resetLevel()),
  // Map
  resetMap: () => dispatch(resetMap()),
  setMap: () => dispatch(setMap()),
  // OccupiedSpaces
  addBoss: (attack, health, location) => (
    (dispatch(addBoss(attack, health, location)))
  ),
  move: (entityName, vector) => (
    dispatch(move(entityName, vector))
  ),
  setLocation: (entityName, location) => (
    dispatch(setLocation(entityName, location))
  ),
  removeEntity: entityName => dispatch(removeEntity(entityName)),
  resetBoard: () => dispatch(resetBoard()),
  addEntity: (entityName, entityType, health, attack, location) => (
    dispatch(addEntity(entityName, entityType, health, attack, location))
  ),
  // Entities
  gainXp: xp => dispatch(gainXp(xp)),
  damage: (entityName, value) => (
    dispatch(damage(entityName, value))
  ),
  heal: (entityName, value) => (
    dispatch(heal(entityName, value))
  ),
  switchWeapon: (weapon, attack) => (
    dispatch(switchWeapon(weapon, attack))
  ),
  levelUp: (attack, health, toNextLevel) => (
    dispatch(levelUp(attack, health, toNextLevel))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

import React from 'react';
import { connect } from 'react-redux';

const StatusBar = props => (
  <ul id="ui">
    <li id="health">
      <span className="label">Health:</span>
      {props.health}
    </li>

    <li id="weapon">
      <span className="label">Weapon:</span>
      {props.weapon}
    </li>

    <li id="attack">
      <span className="label">Attack:</span>
      {props.attack}
    </li>

    <li id="playerLevel">
      <span className="label">Level:</span>
      {props.playerLevel}
    </li>

    <li id="xp">
      <span className="label">Next Level:</span> {props.toNextLevel} XP
    </li>

    <li id="level">
      <span className="label">Dungeon:</span>
      {props.level}
    </li>
  </ul>
);

StatusBar.propTypes = {
  health: React.PropTypes.number,
  weapon: React.PropTypes.string,
  attack: React.PropTypes.number,
  playerLevel: React.PropTypes.number,
  toNextLevel: React.PropTypes.number,
  level: React.PropTypes.number,
};

const mapStateToProps = state => ({
  health: state.entities.player.health,
  weapon: state.entities.player.weapon,
  attack: state.entities.player.attack,
  playerLevel: state.entities.player.level,
  toNextLevel: state.entities.player.toNextLevel,
  level: state.level,
});

export default connect(mapStateToProps)(StatusBar);

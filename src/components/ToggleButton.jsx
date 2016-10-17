import React from 'react';
import { connect } from 'react-redux';
import toggle from '../actions/ToggleDarkness';

const ToggleButton = ({ handleClick, darkness }) => (
  <button
    className="toggleButton"
    onClick={() => handleClick(!darkness)}
  >Toggle Darkness</button>
);

ToggleButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  darkness: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  darkness: state.darkness,
});

const mapDispatchToProps = dispatch => ({
  handleClick: darkness => dispatch(toggle(darkness)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleButton);

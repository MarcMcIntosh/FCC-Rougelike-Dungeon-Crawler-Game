import React from 'react';
import { connect } from 'react-redux';
import toggleDarkness from '../actions/Darkness';

const ToggleButton = ({ handleClick }) => (
  <button
    className="toggleButton"
    onClick={handleClick}
  >Toggle Darkness</button>
);

ToggleButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(toggleDarkness()),
});

export default connect(null, mapDispatchToProps)(ToggleButton);

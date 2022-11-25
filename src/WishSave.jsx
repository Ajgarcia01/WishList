import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

/**
 * Callback to run when a user clicks it.
 * @callback onWishesSave - Callback to run when a wish changes.
 */

/**
 * Render a button action.
 * @param {onWishesSave} callback - Callback to run when a user clicks it.
 */
function WishSave({ onWishesSave }) {
  return <button className='button'  onClick={onWishesSave}><span>Save</span></button>;
}

WishSave.propTypes = {
  onWishesSave: PropTypes.func,
};

WishSave.defaultProps = {
  onWishesSave: () => {},
};

export default WishSave;
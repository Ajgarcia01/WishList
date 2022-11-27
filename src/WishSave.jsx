import React from 'react';
import PropTypes from 'prop-types';
import './App.css';


/**
 * Mostrar un botón
 * @param {Save} callback - Callback llamada cuando el usuario hace click en el botón.
 */
function WishSave({ Save }) {
  return (
    <button className="button" type="button" onClick={Save}>
      <span>Guardar</span>
    </button>
  );
}

WishSave.propTypes = {
    Save: PropTypes.func,
};

WishSave.defaultProps = {
    Save: () => {},
};

export default WishSave;

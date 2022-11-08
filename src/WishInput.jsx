import React, { useRef } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function WishInput({ onNewWish }) {
  const inputText = useRef();
  return (
    <fieldset>
      <legend>New Wish</legend>
      <input
        className="form-control"
        placeholder="Introduce your new wish"
        ref={inputText}
        type="text"
        onKeyUp={(event) => {
          if (event.key === 'Enter' && inputText.current.value.length > 0) {
            onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
            inputText.current.value = '';
          }
        }}
      />
    </fieldset>
  );
}

WishInput.propTypes = {

  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => {},

};

export default WishInput;

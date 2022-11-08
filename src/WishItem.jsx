import React, { useRef } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

function WishItem({ wish, onChangeWish }) {
  const inputWishItem = useRef();
  return (
    <li className="list-group-item wishItem">
      <input
        type="checkbox"
        defaultChecked={wish.done}
        ref={inputWishItem}
        id={wish.id}
        onChange={(event) => {
          onChangeWish({ id: wish.id, text: wish.text, done: event.target.checked });
        }}
      />
      <label className={ClassNames({ 'text-decoration-line-through': wish.done })} htmlFor={wish.id}>
        {wish.id}
        ------
        {wish.text}
      </label>
    </li>
  );
}

WishItem.propTypes = {
  wish:
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
    }),
  onChangeWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: { text: '', done: false },
  onChangeWish: () => {},

};

export default WishItem;

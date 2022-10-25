import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

function WishItem({ wish }) {
  return (
    <li className='list-group-item wishItem'>
      <input type="checkbox" defaultChecked={wish.done} id={wish.text} />
      <label className={ClassNames({'text-decoration-line-through':wish.done, })}  htmlFor={wish.text}>{wish.text}</label>
    </li>
  );
}

WishItem.propTypes = {
  wish:
    PropTypes.shape({
      text: PropTypes.string,
      done: PropTypes.bool,
    }),
};

WishItem.defaultProps = {
  wish: { text: '', done: false },
};

export default WishItem;

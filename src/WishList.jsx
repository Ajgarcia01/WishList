import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import WishItem from './WishItem';

function WishList({ wishes }) {
  return (
    <div>
      <ul className="list-group font-monospace">Tabla</ul>
      {wishes.map(({ text, done }) => (

        <WishItem wish={{ text, done }} key={`wishItem-${uuidv4()}`} />

      ))}
    </div>
  );
}

WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
};

WishList.defaultProps = {
  wishes: [],
};

export default WishList;

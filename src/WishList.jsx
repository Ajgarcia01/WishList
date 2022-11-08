import React from 'react';
import PropTypes from 'prop-types';
import WishItem from './WishItem';

/**
 * Callback to run when a wish changes.
 * @callback onUpdateWish - Callback to run when a wish changes
 * @param {Object} updateWish - Callback to run when a wish changes
 * @param {String} wishes[].id - Identifier for wish
 * @param {String} wishes[].text - Text for wish 
 */

/**
 * Manage a wish list
 * @param {Object[]} wishes - List of wishes 
 * @param {String} wishes[].id - Identifier for wish
 * @param {String} wishes[].text - Text for wish
 * @param {onUpdateWish} callback - Callback to run when a wish changes
 * @returns HTML with a wish list
 */

function WishList({ wishes, onUpdateWish }) {
  return (
    <ul className="list-group">
      {wishes.map(({ id, text, done }) => (
        <WishItem wish={{ id, text, done }} 
        key={`wishItem-${id}`} 
        onChangeWish={(updateWish) => {
            onUpdateWish(updateWish);
        }} />
      ))}
    </ul>
  );
}

WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
  onUpdateWish: PropTypes.func
};

WishList.defaultProps = {
  wishes: [],
  onUpdateWish: () => {}
};

export default WishList;

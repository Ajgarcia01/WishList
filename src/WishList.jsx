import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import WishItem from './WishItem';
import './App.css';

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

function WishList({ props, ChangeWish }) {
  const wishesArray =
    JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];

  const [wishesItems, setWishesItems] = React.useState(wishesArray);
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const filteredData = wishesArray.filter((el) => {
    if (props === '') {
      return el;
    }
    return el.text.toLowerCase().includes(props);
  });

  // const handle drag sorting
  const handleSort = () => {
    console.log(wishesItems);
    // duplicate items
    const duplicateWishes = [...filteredData];

    // remove and save the dragged item content
    const draggedItemContent = duplicateWishes.splice(dragItem.current, 1)[0];

    // switch the position
    duplicateWishes.splice(dragOverItem.current, 0, draggedItemContent);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    setWishesItems(duplicateWishes);
    localStorage.setItem('wishesLocalStorage', JSON.stringify(duplicateWishes));
  };

  return (
    <div>
      <Table striped bordered hover size="sm" className="table">
        {filteredData.map(({ id, text, done }, index) => (
          <>
            <thead>
              <tr>
                <th className="columnaWish">Deseo </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td
                  key={index}
                  draggable
                  onDragStart={(e) => (dragItem.current = index)}
                  onDragEnter={(e) => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <i className="fa-solid fa-bars" />
                  <WishItem
                    wish={{ id, text, done }}
                    key={`wishItem-${id}`}
                    onChangeWish={(updatedWish) => {
                      ChangeWish(updatedWish);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </>
        ))}
      </Table>
    </div>
  );
}

/*

*/

WishList.propTypes = {
  props: PropTypes.string.isRequired,
  ChangeWish: PropTypes.func,
};

WishList.defaultProps = {
  ChangeWish: () => {},
};

export default WishList;

import React from 'react';
import PropTypes from 'prop-types';
import WishItem from './WishItem';
import Table from 'react-bootstrap/Table';
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

function WishList(props, onUpdateWish ) {
    const wishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];


   
    const filteredData = wishes.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <div>      
        <Table striped bordered hover size="sm" className='tablewish'>
        {filteredData.map(({ id, text, done }) => (
          <><thead>
                <tr>
                    <th>Name of wish</th>
                </tr>
            </thead><tbody>
                    <tr className='table'>
                        <td><WishItem wish={{ id, text, done }} key={`wishItem-${id}`} onChangeWish={(updatedWish) => {onUpdateWish(updatedWish);}} /></td>
                    </tr>
                </tbody></>
           ))}
        </Table>
        </div>
    );

}

/*
  

*/


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

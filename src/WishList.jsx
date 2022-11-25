import React, { useEffect } from 'react';
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

function WishList({props, ChangeWish }) {
    
    const wi = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];

    const [fruitItems, setFruitItems] = React.useState(wi)
    const dragItem = React.useRef(null)
	const dragOverItem = React.useRef(null)

    const filteredData = wi.filter((el) => {
        if (props.input === '') {
        } else {
            return el.text.toLowerCase().includes(props)
        }
    });

    //const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _fruitItems = [...filteredData]

		//remove and save the dragged item content
		const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]

		//switch the position
		_fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setFruitItems(_fruitItems)
        localStorage.setItem('wishesLocalStorage', JSON.stringify(_fruitItems));

	}

    
    return (
    
        <div>      
        <Table striped bordered hover size="sm" className='table'>
        {filteredData.map(({ id, text, done },index) => (
          <><thead>
                <tr>
                    <th className='columnaWish'>A Wish </th>
                </tr>
            </thead><tbody>
                    <tr className=''>
                        <td key={index} draggable
						onDragStart={(e) => (dragItem.current = index)}
						onDragEnter={(e) => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}>
                            <i className="fa-solid fa-bars"></i>
                            <WishItem wish={{ id, text, done }} key={`wishItem-${id}`} 
				onChangeWish={(updatedWish) => {
                ChangeWish(updatedWish);
            }} /></td>
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

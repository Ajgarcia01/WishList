import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import WishItem from './WishItem';
import './App.css';

/**
 * Callback que se llama cuando un deseo se actualiza
 * @callback ChangeWish - Callback que se llama cuando un deseo se actualiza
 * @param {Object} updatedWish - Deseo actualizado.
 * @param {String} updatedWish.id - ID del deseo.
 * @param {String} updatedWish.text - Texto del deseo.
 * @param {Boolean} updatedWish.done - Estado del deseo.
 */

/**
 * Devuelve una lista de deseos
 * @param {Object[]} props - Lista de deseos.
 * @param {String} wishes[].id - ID del deseo.
 * @param {String} wishes[].text - Texto del deseo.
 * @param {Boolean} wishes[].done - Estado del deseo.
 * @param {ChangeWish} callback - Callback que se llama cuando un deseo ha sido modificado.
 */

function WishList({ props, ChangeWish }) {
  /**
   * Controla la lista de deseos
   * @returns JSON con la lista de deseos almacenadas en el LocalStorage
   */
  const wishesArray =
    JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
  /**
   * Controla la lista de deseos
   * @returns una lista de deseos, que es seteada con setWishesItems
   */
  const [wishesItems, setWishesItems] = React.useState(wishesArray);
  /**
   * Controla el elemento arrastrado y sobre el que se arrastra
   * @returns un elemento arrastrado
   */
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);
  /**
   * Controla la lista de deseos filtrados con la barra de búsqueda
   * @returns lista de deseos filtrados con la barra de búsqueda
   */
  const filteredData = wishesArray.filter((el) => {
    if (props === '') {
      return el;
    }
    return el.text.toLowerCase().includes(props);
  });

  // clasificación por arrastre del controlador constante
  const handleSort = () => {
    console.log(wishesItems);
    // Duplicación de los deseos
    const duplicateWishes = [...filteredData];

    // eliminar y guardar el contenido del elemento arrastrado
    const draggedItemContent = duplicateWishes.splice(dragItem.current, 1)[0];

    // cambiar la posición
    duplicateWishes.splice(dragOverItem.current, 0, draggedItemContent);

    // resetear la posición ref
    dragItem.current = null;
    dragOverItem.current = null;

    // actualizar el array actual
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

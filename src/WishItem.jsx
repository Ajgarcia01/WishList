import React, { useRef, useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

/**
 * Renderizar un deseo (objeto)
 * @param {Object} wish - un deseo.
 * @param {String} wishItem[].id - ID del deseo
 * @param {String} wishItem[].text - Texto del deseo
 * @param {Boolean} wishItem[].done - Estado del deseo
 * @param {onChangeWish} callback - Callback para cuando un deseo es modificado
 */


/**
 * Callback para cuando un deseo es modificado
 * @callback onChangeWish - Callback para cuando un deseo es modificado
 * @param {Object} updatedWish - Deseo que se ha actualizado
 * @param {String} updatedWish.id - ID del deseo
 * @param {String} updatedWish.text - Texto del deseo
 * @param {Boolean} updatedWish.done - Estado del deseo
 */



function WishItem({ wish, onChangeWish }) {
/**
 * Controla el texto introducido en el input
 * @returns texto en String
 */
  const inputText = useRef();
/**
 * Controla la lista de deseos
 * @returns JSON con la lista de deseos almacenadas en el LocalStorage
 */
  const wishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
/**
 * Controla los modales de la app
 * @returns un modal cada vez que show es === (true)
 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

/**
 * Controla el eliminar un deseo
 * @returns deseo eliminado (id en concreto)
 * @param {String} data - texto editado del deseo 
 */
  const deleteItem = (data) => {
    for (let i = 0; i < wishes.length; i += 1) {
      if (wishes[i].id === data) {
        wishes.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
    window.location.reload();
    // console.log(filterItem);
  };

/**
 * Controla el editar un deseo
 * @returns deseo actualizado
 * @param {Object} data - deseo seleccionado
 * @param {String} text - texto editado del deseo 
 */
  const editItem = (data, text) => {
    console.log(text);
    for (let i = 0; i < wishes.length; i += 1) {
      if (wishes[i].id === data) {
        wishes[i].text = text;
        break;
      }
    }
    localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
    window.location.reload();
  };

  return (
    <>
      <table size="sm" className="tableItem">
        <thead>
          <tr>
            <td>
              <div className="menuIcon">
                <i>
                  <img
                    src="https://www.svgrepo.com/show/18576/menu.svg"
                    alt=""
                  />
                </i>
              </div>
            </td>
            <td className="list-group-item wishItem ">
              <label className="container">
                <input
                  className="containerinput"
                  type="checkbox"
                  defaultChecked={wish.done}
                  ref={inputText}
                  id={wish.id}
                  onChange={(event) => {
                    onChangeWish({
                      id: wish.id,
                      done: event.target.checked,
                      text: wish.text,
                    });
                  }}
                />
                <div className="checkmark" />
              </label>
            </td>
            <td>
              <label htmlFor={wish.id} className="textWish">
                {wish.text}
              </label>
            </td>
            <td>
              <center>
                <Button
                  className="butttonEdit"
                  variant="primary"
                  onClick={handleShow}
                >
                  Editar
                </Button>
              </center>
            </td>
            <td>
              <center>
                <Button
                  variant="danger"
                  onClick={(e) => deleteItem(wish.id, e)}
                >
                  Eliminar
                </Button>
              </center>
            </td>
          </tr>
        </thead>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Deseo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Introduce un nuevo valor o modifica el valor actual☺️</p>
          <Form.Control
            placeholder="Your wish"
            aria-describedby="basic-addon2"
            className="form-control"
            ref={inputText}
            type="text"
            defaultValue={wish.text}
            onKeyUp={(event) => {
              if (event.key === 'Enter' && inputText.current.value.length > 0) {
                editItem(wish.id, inputText.current.value);
                // inputText.current.value = '';
                // handleClose();
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={(e) => editItem(wish.id, inputText.current.value, e)}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
  }),
  onChangeWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: { id: '', done: false, text: '' },
  onChangeWish: () => {},
};

export default WishItem;

import React, { useRef, useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function WishItem({ wish, onChangeWish }) {
  const inputText = useRef();
  const wishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                  Edit
                </Button>
              </center>
            </td>
            <td>
              <center>
                <Button
                  variant="danger"
                  onClick={(e) => deleteItem(wish.id, e)}
                >
                  Delete
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

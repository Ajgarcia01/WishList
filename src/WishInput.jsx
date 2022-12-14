import React, { useRef, useState } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './App.css';

/**
 * Callback para notificar cambios en el input (barra de búsqueda en este caso).
 * @callback onChange - Callback para notificar cambios en el input y establecer los valores introducidos

 */

/**
 * Callback para añadir un nuevo deseo
 * @param {Function} onNewWish - Callback para añadir un nuevo deseo
 */

function WishInput({ onChange, onNewWish }) {
  const inputText = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveItem = () =>
    onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
  const save = () => {
    saveItem();
    handleClose();
  };

  return (
    <>
      <fieldset>
        <InputGroup className="">
          <form className="form">
            <label className="label" htmlFor="search">
              <input
                className="input"
                type="text"
                required=""
                placeholder="Search a item"
                id="search"
                onChange={onChange}
                label="Search"
              />
              <div className="fancy-bg" />
              <div className="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                  </g>
                </svg>
              </div>
              <Button
                onClick={handleShow}
                className="close-btn"
                variant="link"
                type="reset"
              >
                <i>
                  <img
                    src="https://www.freeiconspng.com/uploads/add-icon--icon-search-engine-1.png"
                    height="30px"
                    width="30px"
                    alt=""
                  />
                </i>
              </Button>
            </label>
          </form>
        </InputGroup>
      </fieldset>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Deseo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Introduce tu deseo para guardar☺️</p>
          <Form.Control
            placeholder="Your wish"
            aria-describedby="basic-addon2"
            className="form-control"
            ref={inputText}
            type="text"
            onKeyUp={(event) => {
              if (event.key === 'Enter' && inputText.current.value.length > 0) {
                onNewWish({ id: Uuidv4(), text: inputText.current.value });
                console.log(`New Wish: ${inputText.current.value}`);
                inputText.current.value = '';
                handleClose();
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={save}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

WishInput.propTypes = {
  onChange: PropTypes.func,
  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => {},
  onChange: () => {},
};

export default WishInput;

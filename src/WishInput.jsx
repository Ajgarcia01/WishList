import React, { useRef, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import { v4 as Uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';


function WishInput({ onNewWish }) {
  const inputText = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveItem = () => onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
  const save = () => {
    saveItem();
    handleClose();
   
  };

  /*
  const saveItem = () => {
    const wish = onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
  console.log({wish});
  localStorage.setItem('wish', 'hola');

};
*/

 

  return (
    <><fieldset>
          <InputGroup className="mb-3">
              <Form.Control
                  placeholder="Search the wish"
                  aria-describedby="basic-addon2"
                  className="form-control"
                  ref={inputText}
                  type="search"/>
             <Button variant="primary" onClick={handleShow}>➕  ADD WISH</Button>
          </InputGroup>
          <Alert key='success' variant='success'>
          This is a variant alert with{' '}
          <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
          you like.
        </Alert>
      </fieldset>
      <>
              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Add Wish</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Introduce your wish to save☺️</p>
                  <Form.Control
                  placeholder="Your wish"
                  aria-describedby="basic-addon2"
                  className="form-control"
                  ref={inputText}
                  type="text"
                  onKeyUp={(event) => {
                      if (event.key === 'Enter' && inputText.current.value.length > 0) {
                        onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
                        inputText.current.value = '';
                        handleClose();
                          
                      }
                  } }/>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                          Close
                      </Button>
                      <Button variant="primary" onClick={save}>
                          Save Changes
                      </Button>
                  </Modal.Footer>
              </Modal>
          </></>
  );
}

WishInput.propTypes = {

  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => {},

};

export default WishInput;

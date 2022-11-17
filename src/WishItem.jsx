import React, { useRef } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function WishItem({ wish, onChangeWish }) {
    const inputText = useRef();
    const wishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
    //const [item, removeItem] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const saveItem = () => onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
    const save = () => {
      saveItem();
      handleClose();
     
    };


    const [filteredList, setFilteredList] = useState(wishes);
    const [removeItem, setRemoveItem] = useState('','');

    const handleClick = (data) => {
         //const filterItem = wishes.filter((item) => item.id===data);
         //setFilteredList(filterItem);
        
            for (var i =0; i < wishes.length; i++)
            if (wishes[i].id === data) {
                wishes.splice(i,1);
                break;
            }   

         console.log('antes de guardar');
         localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
         console.log('despues de guardar');
         //console.log(filterItem);
    }




  const inputWishItem = useRef();
  return (
    <><><li className="list-group-item wishItem ">
          <input
              type="checkbox"
              defaultChecked={wish.done}
              ref={inputWishItem}
              id={wish.id}
              onChange={(event) => {
                  onChangeWish({ id: wish.id, text: wish.text, done: event.target.checked });
              } } />
          <label className={ClassNames({ 'text-decoration-line-through': wish.done }, 'textitem')} htmlFor={wish.id}>
              {wish.text}
          </label>
      </li><td><center><Button variant="primary" onClick={handleShow}>Edit</Button></center></td>
      <td><center><Button variant="danger" onClick={((e) => handleClick(wish.id))}>Delete</Button></center></td></>
      
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Add Wish</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>Introduce a new value or modify the current value☺️</p>
                  <Form.Control
                      placeholder="Your wish"
                      aria-describedby="basic-addon2"
                      className="form-control"
                      ref={inputText}
                      type="text"
                      defaultValue={wish.text}
                      onKeyUp={(event) => {
                          if (event.key === 'Enter' && inputText.current.value.length > 0) {
                              onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
                              inputText.current.value = '';
                              handleClose();

                          }
                      } } />
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={save}>
                      Save Changes
                  </Button>
              </Modal.Footer>
          </Modal></>
  );
}

WishItem.propTypes = {
  wish:
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
    }),
  onChangeWish: PropTypes.func,
};

WishItem.defaultProps = {
  wish: { text: '', done: false },
  onChangeWish: () => {},

};

export default WishItem;

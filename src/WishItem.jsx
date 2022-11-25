import React, { useRef } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function WishItem({ wish, onChangeWish }) {
    const inputText = useRef();
    const wishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const saveItem = () => onNewWish({ id: Uuidv4(), text: inputText.current.value, done: false });
    
    const deleteItem = (data) => {

            for (var i =0; i < wishes.length; i++)
            if (wishes[i].id === data) {
                wishes.splice(i,1);
                break;
            }   
         localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
         window.location.reload()
         //console.log(filterItem);
    }


    const editItem = (data,text) => {
        console.log(text);
        for (var i =0; i < wishes.length; i++){
            if (wishes[i].id === data) {
                wishes[i].text=text
                break;
            } 
        }
       localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
       window.location.reload();
     
}

  return (
    <><table striped bordered hover size="sm" className='tableItem' >
    <thead >

        <tr>
    <td className="list-group-item wishItem ">
    <label className="container">
          <input className='containerinput'
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
              }} /><div className="checkmark"></div>
              </label>
      </td>
      <td><label  htmlFor={wish.id} className='textWish'>
               {wish.text}
          </label></td>
      <td><center><Button className='butttonEdit' variant="primary" onClick={handleShow}>Edit</Button></center></td>
      <td><center><Button variant="danger" onClick={((e) => deleteItem(wish.id))}>Delete</Button></center></td>
              </tr>
        </thead>
    </table>
    
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Edit Wish</Modal.Title>
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
                          editItem(wish.id, inputText.current.value);
                          //inputText.current.value = '';
                          //handleClose();
                      }
                  } } />
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={((e) => editItem(wish.id, inputText.current.value))}>
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
    wishItem: { id: '', done: false, text: '' },
  onChangeWish: () => {},

};

export default WishItem;

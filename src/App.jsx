import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { v4 as Uuidv4 } from 'uuid';
import WishList from './WishList';
import WishInput from './WishInput';

const initialWishes = [
  { id: Uuidv4(), text: 'Aprender React', done: false },
  { id: Uuidv4(), text: 'Da de alta a los alumnos', done: true },
  { id: Uuidv4(), text: 'Preparar apuntes', done: true },
  { id: Uuidv4(), text: 'Desayunar', done: true },
];


/**
 * Manage a wish list
 * @returns HTML with a wish list
 */
function App() {
  const [wishes, setWishes] = useState(initialWishes);
  return (
    <div className="container-fluid">
      <h1>My WishList</h1>
      
      <WishInput onNewWish={(newwish) => {
        setWishes([...wishes, newwish]);
      }}
      />
      <WishList wishes={wishes} onUpdateWish={(updateWish) => {

            setWishes(wishes.map(wish => 
                (wish.id == updateWish.id)? updateWish:wish
            ));
      }} 
     /*
        const UpdateWishes = [...wishes];
        const modifyWish = UpdateWishes.find(wish => wish.id === updateWish.id);
        modifyWish.text=  updateWish.text;
        modifyWish.done= updateWish.done;
        setWishes(UpdateWishes);
        */
      />
    </div>
  );
}

export default App;

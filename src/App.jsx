import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import WishList from './WishList';
import WishInput from './WishInput';

const initialWishes = [
  { text: 'Aprender React', done: true },
  { text: 'Aprender Python', done: false },
  { text: 'Aprender Css', done: true },
  { text: 'Aprender HTML', done: false },
];

function App() {
    const {wishes,setWishes} = useState(initialWishes);
  return (
    <div className="container-fluid">
        <WishInput 
        onNewWish={(newWish) => {
            console.log('sE HA LANZADO');
            setWishes({...wishes,newWish});
        }}/>
      <WishList wishes={initialWishes} />
      
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { v4 as Uuidv4 } from 'uuid';
import WishList from './WishList';
import WishInput from './WishInput';
import { Nabvar } from './Nabvar';







const students = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
const initialWishes = students;

/**
 * Manage a wish list
 * @returns HTML with a wish list
 */
function App() {
   
   const [wishes,setWishes] = useState(students)

  return (
    <><Nabvar/>
    <div className="container app">
    

   <h1 className='text-title'>My WishList</h1>
   
   <WishInput onNewWish={(newwish) => {
     setWishes([...wishes, newwish]);
     initialWishes.push(newwish);
     localStorage.setItem('wishesLocalStorage', JSON.stringify(initialWishes));
   }}
   />
   <WishList wishes={wishes} onUpdateWish={(updateWish) => {

setWishes(wishes.map(wish => 
    (wish.id == updateWish.id)? updateWish:wish
    
));
}} 
/>
 </div>
 </>
  );
}

export default App;

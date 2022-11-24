import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WishList from './WishList';
import WishInput from './WishInput';
import { Nabvar } from './Nabvar';

/**
 * Manage a wish list
 * @returns HTML with a wish list
 */
function App() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
    const students = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
   const [wishes,setWishes] = useState(students)

  return (
    <><div className="search">
      </div><><Nabvar />
              <div className="container app">
                  <h1 className='text-title'>My WishList</h1>
                  <WishInput onChange={inputHandler} onNewWish={(newwish) => {
                        setWishes([...wishes, newwish]);
                        wishes.push(newwish);
                      localStorage.setItem('wishesLocalStorage', JSON.stringify(wishes));
                      
                      
                  } } /> <br />
                   <WishList input={inputText}
        onUpdateWish={(updatedWish) => {
          const updatedWishes = [...wishes];
          const modifyWish = updatedWishes.find(
            (wish) => wish.id === updatedWish.id,
          );
          modifyWish.done = updatedWish.done;
          setWishes(updatedWishes);
        }}
      />
              </div>
             
              </></>
  );
}

export default App;

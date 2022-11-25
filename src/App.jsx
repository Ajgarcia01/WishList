import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WishList from './WishList';
import WishInput from './WishInput';
import { Nabvar } from './Nabvar';
import WishSave from './WishSave';



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
    //const students = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];
   //const [appWishes,setWishes] = useState(initialWishes)

let initialWishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];

const [appWishes, setWishes] = useState(initialWishes);
const [loading, setLoading] = useState(false);

useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);


  return (
    <div>
    <><div >{loading ? (
        <div className='spinner'><><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span></></div>
      
    ) : (
        <div>
<><div className="search"></div><Nabvar /><div className="container app">
          <center>
              <WishSave
                  onWishesSave={() => {
                      console.log('Saving wishes...');
                      localStorage.setItem('wishesLocalStorage', JSON.stringify(appWishes));
                  } } />
          </center>

          <h1 className='text-title'>My WishList</h1>
          <WishInput onChange={inputHandler} onNewWish={(newwish) => {
              setWishes([...initialWishes, newwish]);
              initialWishes.push(newwish);
              localStorage.setItem('wishesLocalStorage', JSON.stringify(initialWishes));


          } } /> <br />
          <WishList props={inputText}
              ChangeWish={(updatedWish) => {
                  const updatedAppWishes = [...appWishes];
                  const modifyWish = updatedAppWishes.find(
                      (wish) => wish.id === updatedWish.id
                  );
                  modifyWish.done = updatedWish.done;
                  setWishes(updatedAppWishes);
              } } />
      </div></>
        </div>
      
        )}
    </div></></div> 
        )} 


export default App;

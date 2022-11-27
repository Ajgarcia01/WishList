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
/**
 * Controla los estados que controlan la barra de búsqueda (valores proporcionados)
 * @returns el valor seteado, que sería el introducido en el input de la barra de búsqueda
 */
  const [inputText, setInputText] = useState('');

  /**
 * Llamada para cuando el evento recibe un cambio.
 * @callback e - Llamada para cuando e cambia, pasar la información recibida a minúscula y setearlo en el estado.
 * @param {e} callback - Llamada para cuando e cambia
 */
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

/**
 * Controla la lista de deseos
 * @returns JSON con la lista de deseos almacenadas en el LocalStorage
 */
  const initialWishes = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];

  /**
 * Controla la lista de deseos con estados
 * @returns JSON con la lista de deseos almacenadas en el LocalStorage
 */
  const [appWishes, setWishes] = useState(initialWishes);

  /**
 * Controla el loading de la app
 * @returns un loading cada vez que loading es === (true)
 */
  const [loading, setLoading] = useState(false);

/**
 * Controla el loading (para mostrarlo), setear el estado del loading
 * @returns loading===true con una duración de 200ms
 */

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <div className="spinner">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        ) : (
          <div>
            <div className="search" />
            <Nabvar />
            <div className="container app">
              <center>
                <WishSave
                  Save={() => {
                    localStorage.setItem(
                      'wishesLocalStorage',
                      JSON.stringify(appWishes),
                    );
                    window.location.reload();
                  }}
                />
              </center>
              <h1 className="text-title">My WishList</h1>
              <WishInput
                onChange={inputHandler}
                onNewWish={(newwish) => {
                  setWishes([...initialWishes, newwish]);
                  initialWishes.push(newwish);
                  localStorage.setItem(
                    'wishesLocalStorage',
                    JSON.stringify(initialWishes),
                  );
                }}
              />
              {' '}
              <br />
              <WishList
                props={inputText}
                ChangeWish={(updatedWish) => {
                  const updatedAppWishes = [...appWishes];
                  const modifyWish = updatedAppWishes.find(
                    (wish) => wish.id === updatedWish.id,
                  );
                  modifyWish.done = updatedWish.done;
                  setWishes(updatedAppWishes);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

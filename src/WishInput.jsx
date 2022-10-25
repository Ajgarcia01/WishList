import React from 'react';

function WishInput({onNewWish}){
    let newWishText;
    return (
        <fieldset>
            <legend>New Wish</legend>
            <input className='form-control' placeholder='Introduce your new wish' type="text" onChange={
                (event) => {
                    newWishText = event.target.value;
                }}
                onKeyUp={(event) =>{
                    if(event.key === 'Enter' && newWishText.lenght > 0){
                        onNewWish({text: newWishText,done:false});
                        newWishText = '';
                    }
                }}
                ></input>
        </fieldset>
    )
}

export default WishInput;
import { React, useState } from 'react'
const students = JSON.parse(localStorage.getItem('wishesLocalStorage')) || [];

function List(props) {
   
    const filteredData = students.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <h1 color='light' key={item.id}>{item.text}</h1>
            ))}
        </ul>
    )
}

export default List
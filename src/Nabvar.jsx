import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import Container from 'react-bootstrap/Container';

export const Nabvar = () => {


    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className='logovar'>
                    <img
                    src="./src/assets/logo.png"
                    width="40"
                    height="40"
                    className=""
                    />{' '}
                    WishList
                </Navbar.Brand>
            </Container>
        </Navbar>

    )
}

export default Nabvar;




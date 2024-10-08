import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavBar: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Book Library</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;
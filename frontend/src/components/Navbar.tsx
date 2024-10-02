import React from 'react';
import {Navbar, Container, Nav, NavDropdown, Form, Button} from 'react-bootstrap';

const AppNavbar: React.FC = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary primary">
            <Container fluid>
                <Navbar.Brand href="#home">Books Library </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0"
                         style={{ maxHeight: '100px' }}
                         navbarScroll>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#books">Books</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-4">
            <Container>
                <p>Book Library &copy; {new Date().getFullYear()}</p>
            </Container>
        </footer>
    );
};

export default Footer;
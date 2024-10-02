import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light mt-auto py-3">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p>© 2024 Books Library App. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../Layout';


const PageNotFound = () => {
    return (
        <Layout title={'Go Back - page not found'}>
            <Container className="text-center my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="display-1">404</h1>
                        <p className="lead">Oops! The page you are looking for does not exist.</p>
                        <p>It might have been moved or deleted.</p>
                        <Button variant="danger" as={Link} to="/">Go to Homepage</Button>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default PageNotFound





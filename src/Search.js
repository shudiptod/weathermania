import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Search = ({ getQuery }) => {

    const [text, setText] = useState('')
    const onChange = (q) => {
        setText(q);

    }
    const btn_search = _async => {
        getQuery(text);
    }
    const search = async (e) => {
        if (e.key === 'Enter' || e.key === null) {
            getQuery(text);
        }
    }

    return (

        <Container fluid>
            <Row className="justify-content-center align-items-center pl-5">
                <Col sm={6}>

                    <input style={{ height: '40px' }}
                        type='text'
                        placeholder='Type Locations'
                        value={text}
                        onChange={(e) => { onChange(e.target.value) }}
                        autoFocus
                        onKeyPress={search}
                    />
                </Col>
                <Col sm={6} className="pl-4">
                    <Button onClick={btn_search} variant="secondary">Search</Button>

                </Col>
            </Row>
        </Container>

    )
}


export default Search

import React, { useState } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Search = ({ getQuery }) => {

    const [text, setText] = useState('')
    const onChange = (q) => {
        setText(q);

    }
    const search = async (e) => {
        if(e.key === 'Enter') {
            getQuery(text);
        }
    }

    return (

            <Container fluid>
                <Row>
                    <Col>
                        
                            <input style={{paddingLeft:'5px','textDecorationColor':'green'}}
                                type='text'                                
                                placeholder='Type Locations'
                                value={text}
                                onChange={(e) => { onChange(e.target.value) }}
                                autoFocus
                                onKeyPress={search}
                            />
                    </Col>
                </Row>
            </Container>

    )
}


export default Search

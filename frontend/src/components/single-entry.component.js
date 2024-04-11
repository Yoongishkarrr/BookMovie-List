import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './single-entry.components.css'

import { Button, Card, Row, Col } from 'react-bootstrap';

const Entry = ({ entryData, setChangeImpression, deleteSingleEntry, setChangeEntry }) => {

    const changeImpression = () => {
        setChangeImpression({
            "change": true,
            "id": entryData._id
        });
    };

    const changeEntry = () => {
        setChangeEntry({
            "change": true,
            "id": entryData._id
        });
    };

    return (
        <Card>
            <Row>
                <Col>Name of the movie or book: {entryData && entryData.name}</Col>
                <Col>Impression: {entryData && entryData.Impression}</Col>
                <Col>Rating: {entryData && entryData.Rating}</Col>
                <Col>Plot: {entryData && entryData.Plot}</Col>
                <Col><Button onClick={() => deleteSingleEntry(entryData._id)}>Delete entry</Button></Col>
                <Col><Button onClick={changeImpression}>Change impression</Button></Col>
                <Col><Button onClick={changeEntry}>Change entry</Button></Col>
            </Row>
        </Card>
    );
};

export default Entry;

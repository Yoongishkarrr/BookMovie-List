import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Container, Modal, Form } from 'react-bootstrap';
import Entry from './single-entry.component';
import './entries.components.css';

const Entries = (props) => {
    const [entries, setEntries] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [changeImpression, setChangeImpression] = useState({ "change": false, "id": 0 });
    const [newImpressions, setNewImpressions] = useState("");
    const [addNewEntry, setAddNewEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ "name": "", "impression": "", "rating": 0, "plot": "" });
    const [changeEntry, setChangeEntry] = useState({ "change": false, "id": 0 });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        getAllEntries();
    }, [refreshData]);

    const handleFileChange = (event) => { 
        setSelectedFile(event.target.files[0]);
    };

    function addSingleEntry() {
        setAddNewEntry(false);
        const formData = new FormData();
        formData.append('file', selectedFile); 
        formData.append('name', newEntry.name);
        formData.append('impression', newEntry.impression);
        formData.append('rating', newEntry.rating);
        formData.append('plot', newEntry.plot);

        const url = "http://localhost:8080/entry/create";
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) {
                setRefreshData(!refreshData);
            }
        }).catch(error => {
            console.error('Error adding new entry:', error);
        });
    }

    function changeImpressionForEntry() {
        setChangeImpression({ ...changeImpression, change: false });
        const url = `http://localhost:8080/impression/update/${changeImpression.id}`;
        axios.put(url, { "impression": newImpressions })
            .then((response) => {
                console.log("Successfully changed impression for entry with id ", response.status);
                if (response.status === 200) {
                    setRefreshData(!refreshData);
                }
            })
            .catch(error => {
                console.error('Error updating impression:', error);
            });
    }

    function changeSingleEntry() {
        setChangeEntry({ ...changeEntry, change: false });
        const url = `http://localhost:8080/entry/update/${changeEntry.id}`;
        axios.put(url, newEntry)
            .then((response) => {
                if (response.status === 200) {
                    setRefreshData(!refreshData);
                }
            })
            .catch(error => {
                console.error('Error updating entry:', error);
            });
    }

    function deleteSingleEntry(id) {
        const url = `http://localhost:8080/entry/delete/${id}`;
        axios.delete(url)
            .then(response => {
                if (response.status === 200) {
                    setRefreshData(!refreshData);
                }
            })
            .catch(error => {
                console.error('Error deleting entry:', error);
            });
    }

    function getAllEntries() {
        const url = "http://localhost:8080/entries";
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    setEntries(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching entries:', error);
            });
    }

    return (
        <div>
            <Container>
                <Button onClick={() => setAddNewEntry(true)}>List today's impressions</Button>
            </Container>
            <Container>
                {entries.map((entry, i) => (
                    <Entry key={i} entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeImpression={setChangeImpression} setChangeEntry={setChangeEntry} />
                ))}
            </Container>
            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your new rating</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Фотография:</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                        <Form.Label>name:</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, name: event.target.value })}></Form.Control>
                        <Form.Label>impression:</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, impression: event.target.value })}></Form.Control>
                        <Form.Label>rating:</Form.Label>
                        <Form.Control type="number" onChange={(event) => setNewEntry({ ...newEntry, rating: event.target.value })}></Form.Control>
                        <Form.Label>plot:</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, plot: event.target.value })}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => addSingleEntry()}>Add</Button>
                    <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeImpression.change} onHide={() => setChangeImpression({ "change": false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Impression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Impression</Form.Label>
                        <Form.Control onChange={(event) => setNewImpressions(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeImpressionForEntry()}>Change</Button>
                    <Button onClick={() => setChangeImpression({ "change": false, "id": 0 })}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeEntry.change} onHide={() => setChangeEntry({ "change": false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>name</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, name: event.target.value })}></Form.Control>
                        <Form.Label>impression</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, impression: event.target.value })}></Form.Control>
                        <Form.Label>rating</Form.Label>
                        <Form.Control type="number" onChange={(event) => setNewEntry({ ...newEntry, rating: event.target.value })}></Form.Control>
                        <Form.Label>plot</Form.Label>
                        <Form.Control onChange={(event) => setNewEntry({ ...newEntry, plot: event.target.value })}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeSingleEntry()}>Change</Button>
                    <Button onClick={() => setChangeEntry({ "change": false, "id": 0 })}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Entries;

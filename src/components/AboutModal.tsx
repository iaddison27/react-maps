import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap';

interface AboutModalProps {
    show: boolean;
    handleClose: Function;
}

function AboutModal(props: AboutModalProps) {

    const handleClose = () => props.handleClose();

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon icon={faInfoCircle} /> About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>An application written in React to draw a route and calculate the distance. Uses the following libraries:</p>
                <ul>
                <li><a href="https://react-leaflet.js.org/">React Leaflet</a> for the interactive map</li>
                <li><a href="https://react-bootstrap.github.io/">React Bootstrap</a> for responsive design and styling</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AboutModal;

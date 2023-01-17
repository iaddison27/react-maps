import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faRoute } from '@fortawesome/free-solid-svg-icons'
import AboutModal from './AboutModal';
import styles from './AppHeader.module.css';

function AppHeader() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <header className={styles.header}>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="/#" className="navbar-brand d-flex align-items-center">
                        <FontAwesomeIcon icon={faRoute} />
                        &nbsp;
                        <strong>Distance Calculator</strong>
                    </a>
                    <button onClick={handleShow} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                </div>
            </div>
            <AboutModal show={show} handleClose={handleClose}/>
        </header>
    );
}

export default AppHeader;

import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarHeader = () => {

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    StaffQuest
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader;
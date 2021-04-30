import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation(props) {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="flex-fill">
            <Navbar.Brand href="/">ThingBook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {/* <NavDropdown title="Browse" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/browse-datastreams">Datastreams</NavDropdown.Item>
                        <NavDropdown.Item href="/browse-organizations">Organizations</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Dropdown as={ButtonGroup}>
                        <Button variant="outline-success" >Datastreams</Button>

                        <Dropdown.Toggle split variant="outline-success" id="dropdown-split-basic" className="mr-sm-2" />

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Datastreams</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Organizations</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="success" className="mr-sm-2">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;

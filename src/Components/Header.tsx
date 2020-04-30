import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {AUTH_TOKEN} from '../constants'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Header = (props:any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Simple CRUD test</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Select a tab
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/authors">
                    Author
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  Book
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <div className="flex flex-fixed">
                  {authToken ? (
                    <div
                      className="ml1 pointer black"
                      onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN)
                        props.history.push(`/`)
                      }}
                    >
                      logout
                    </div>
                  ) : (
                    <Link to="/login" className="ml1 no-underline black">
                      login
                    </Link>
                  )}
                </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            
              <Link to="/">
                A simple CRUD app
              </Link>
            </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
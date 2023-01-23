import React, { ReactNode } from 'react'
import classnames from 'classnames'
import './Layout.scss'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

export interface LayoutProps {
  children?: ReactNode,
  className?: string,
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <div className={classnames({
      'layout': true,
      [className]: className
    })}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to='/'><Navbar.Brand>WeatherApp</Navbar.Brand></LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to='/'><Nav.Link>Search</Nav.Link></LinkContainer>
            <LinkContainer to='/history'><Nav.Link>History</Nav.Link></LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <div className="layout__body">{children}</div>
    </div>
  )
}

export default Layout

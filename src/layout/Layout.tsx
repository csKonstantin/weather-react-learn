import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import './Layout.scss'

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
      <div className="layout__navbar">
        <NavLink to="/" className="layout__navbar-item">Search</NavLink>
        <NavLink to="/history" className="layout__navbar-item">History</NavLink>
      </div>
      <div className="layout__body">{children}</div>
    </div>
  )
}

export default Layout

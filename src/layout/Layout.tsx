import React, { ReactNode } from 'react'

export interface LayoutProps {
  children?: ReactNode,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

export default Layout

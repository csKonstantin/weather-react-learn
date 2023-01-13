import React, { ReactNode } from 'react'
import classnames from 'classnames'

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
      {children}
    </div>
  )
}

export default Layout

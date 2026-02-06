import React, { JSX } from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <div>RootLayout</div>
  )
}

export default RootLayout
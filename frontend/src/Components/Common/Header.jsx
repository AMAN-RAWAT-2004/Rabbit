import React from 'react'
import Topbar from '../Layout/Topbar'
import NavBar from './NavBar'
const Header = () => {
  return (
    <header className='border-b border-gray-200'>
      {/* TopBar */}
      <Topbar/>
      {/* NavBar */}
      <NavBar/>
      {/* CartDrawer */}
    </header>
  )
}

export default Header

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData, darkMode, toggleDarkMode } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-6'>
      <h1 onClick={() => navigate('/')} className='text-3xl font-bold text-primary cursor-pointer'>Medicas</h1>

      <ul className='md:flex items-center gap-6 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1 px-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>Home</li>
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1 px-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>All Doctors</li>
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1 px-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>About</li>
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1 px-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>Contact</li>
        </NavLink>
      </ul>

      <div className='flex items-center gap-3'>
        <button onClick={toggleDarkMode} className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
          {darkMode ? (
            <span className='text-lg'>&#9728;</span>
          ) : (
            <span className='text-lg'>&#9790;</span>
          )}
        </button>
        
        {
          token && userData
            ? <div className='flex items-center gap-3 cursor-pointer group relative'>
              <img className='w-9 h-9 rounded-full object-cover border-2 border-gray-200' src={userData.image} alt="" />
              <img className='w-3' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 flex flex-col gap-3 p-3'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700'>My Appointments</p>
                  <hr className='border-gray-100 dark:border-gray-700' />
                  <p onClick={logout} className='hover:text-red-500 cursor-pointer px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors'>Sign In</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white dark:bg-gray-900 transition-all`}>
          <div className='flex items-center justify-between px-5 py-5'>
            <h1 className='text-2xl font-bold text-primary'>Medicas</h1>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-base font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-center'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-center'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-center'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-center'>CONTACT</p></NavLink>
            {!token && <NavLink onClick={() => setShowMenu(false)} to='/login' ><p className='px-4 py-2 rounded-md bg-primary text-white w-full text-center mt-2'>Sign In</p></NavLink>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

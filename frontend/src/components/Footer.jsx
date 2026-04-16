import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='md:mx-10 mt-20'>
      <div className='flex flex-col sm:grid grid-cols-1 md:grid-cols-4 gap-8 my-10 text-sm'>

        <div className='md:col-span-2'>
          <h1 onClick={() => navigate('/')} className='text-3xl font-bold text-primary cursor-pointer mb-5'>Medicas</h1>
          <p className='w-full md:w-2/3 text-gray-500 dark:text-gray-400 leading-6 mb-4'>
            Prescripto is your trusted healthcare platform. Book appointments with top-rated doctors in your area and manage your health journey with ease.
          </p>
          <div className='flex gap-4'>
            <a href="#" className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors'>
              <span className='text-primary font-bold'>f</span>
            </a>
            <a href="#" className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors'>
              <span className='text-primary font-bold'>in</span>
            </a>
            <a href="#" className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors'>
              <span className='text-primary font-bold'>X</span>
            </a>
          </div>
        </div>

        <div>
          <p className='text-lg font-semibold mb-4 dark:text-white'>Quick Links</p>
          <ul className='flex flex-col gap-3 text-gray-500 dark:text-gray-400'>
            <NavLink to='/'><li className='hover:text-primary transition-colors'>Home</li></NavLink>
            <NavLink to='/doctors'><li className='hover:text-primary transition-colors'>All Doctors</li></NavLink>
            <NavLink to='/about'><li className='hover:text-primary transition-colors'>About Us</li></NavLink>
            <NavLink to='/contact'><li className='hover:text-primary transition-colors'>Contact</li></NavLink>
          </ul>
        </div>

        <div>
          <p className='text-lg font-semibold mb-4 dark:text-white'>Contact Us</p>
          <ul className='flex flex-col gap-3 text-gray-500 dark:text-gray-400'>
            <li className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-green-500'></span>
              Available 24/7
            </li>
            <li>+91 98765 43210</li>
            <li>support@medicas.com</li>
            <li>123 Healthcare Ave,<br />Medical City, India</li>
          </ul>
        </div>

      </div>

      <div className='border-t border-gray-200 dark:border-gray-700 py-6'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400'>
          <p>&copy; 2026 Prescripto. All rights reserved.</p>
          <div className='flex gap-6'>
            <a href="#" className='hover:text-primary transition-colors'>Privacy Policy</a>
            <a href="#" className='hover:text-primary transition-colors'>Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

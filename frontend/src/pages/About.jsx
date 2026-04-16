import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  
  return (
    <div className='pb-16'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-white'>About <span className='text-primary'>Us</span></h1>
        <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto'>Learn more about our mission to make healthcare accessible to everyone</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 mb-16'>
        <div className='lg:w-1/2'>
          <img className='w-full rounded-2xl shadow-lg' src={assets.about_image} alt="" />
        </div>
        <div className='lg:w-1/2 flex flex-col justify-center gap-6 text-gray-600 dark:text-gray-300'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Your Trusted Healthcare Partner</h2>
          <p className='leading-relaxed'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='leading-relaxed'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <div className='bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/10'>
            <h3 className='font-semibold text-gray-800 dark:text-white mb-2'>Our Vision</h3>
            <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>Why Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/10 transition-all group'>
            <div className='w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
              <span className='text-2xl'>&#9889;</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Efficiency</h3>
            <p className='text-gray-500 dark:text-gray-400'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/10 transition-all group'>
            <div className='w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
              <span className='text-2xl'>&#128197;</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Convenience</h3>
            <p className='text-gray-500 dark:text-gray-400'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/10 transition-all group'>
            <div className='w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
              <span className='text-2xl'>&#128100;</span>
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Personalization</h3>
            <p className='text-gray-500 dark:text-gray-400'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 text-center'>
        <h2 className='text-2xl font-bold text-white mb-4'>Ready to Get Started?</h2>
        <p className='text-white/80 mb-6 max-w-xl mx-auto'>Join thousands of patients who trust Prescripto for their healthcare needs.</p>
        <button onClick={() => navigate('/doctors')} className='bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all'>
          Find a Doctor
        </button>
      </div>
    </div>
  )
}

export default About

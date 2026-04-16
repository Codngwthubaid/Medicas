import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className='pb-16'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-white'>Contact <span className='text-primary'>Us</span></h1>
        <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto'>We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 mb-16'>
        <div className='lg:w-1/2'>
          <img className='w-full rounded-2xl shadow-lg' src={assets.contact_image} alt="" />
        </div>
        <div className='lg:w-1/2'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Message</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white resize-none'
                  required
                ></textarea>
              </div>
              <button type='submit' className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
          <div className='w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4'>
            <span className='text-xl'>&#128205;</span>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Our Office</h3>
          <p className='text-gray-500 dark:text-gray-400'>
            123 Healthcare Avenue<br />
            Medical City, India
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
          <div className='w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4'>
            <span className='text-xl'>&#128222;</span>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Phone</h3>
          <p className='text-gray-500 dark:text-gray-400'>
            +91 98765 43210<br />
            Mon - Fri: 9AM - 6PM
          </p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
          <div className='w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4'>
            <span className='text-xl'>&#128231;</span>
          </div>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>Email</h3>
          <p className='text-gray-500 dark:text-gray-400'>
            support@medicas.com<br />
            info@medicas.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact

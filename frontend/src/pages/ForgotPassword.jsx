import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const navigate = useNavigate()
  const { backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/user/forgot-password', { email })

      if (data.success) {
        setIsSubmitted(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Forgot Password</h2>
            <p className='text-gray-500 dark:text-gray-400 mt-1'>Enter your email to receive a reset link</p>
          </div>

          {!isSubmitted ? (
            <>
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white'
                  type="email"
                  required
                />
              </div>

              <button className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30'>
                Send Reset Link
              </button>
            </>
          ) : (
            <div className='text-center py-4'>
              <div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>&#10003;</span>
              </div>
              <p className='text-green-600 dark:text-green-400 font-medium'>Check your email!</p>
              <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>We've sent a password reset link to your email</p>
            </div>
          )}

          <div className='mt-6 text-center'>
            <p className='text-gray-600 dark:text-gray-300'>
              Remember your password?{' '}
              <span onClick={() => navigate('/login')} className='text-primary font-medium cursor-pointer hover:underline'>
                Sign In
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword

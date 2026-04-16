import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const { token } = useParams()
  const { backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    try {
      const { data } = await axios.post(backendUrl + `/api/user/reset-password/${token}`, { password })

      if (data.success) {
        toast.success(data.message)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Reset Password</h2>
            <p className='text-gray-500 dark:text-gray-400 mt-1'>Enter your new password</p>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>New Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white'
              type="password"
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white'
              type="password"
              required
            />
          </div>

          <button className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30'>
            Reset Password
          </button>

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

export default ResetPassword

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success('Account created successfully!')
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success('Login successful!')
      } else {
        toast.error(data.message)
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 animate-scale-in'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</h2>
            <p className='text-gray-500 dark:text-gray-400 mt-1'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to continue</p>
          </div>
          
          {state === 'Sign Up' && (
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Full Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white' 
                type="text" 
                required 
              />
            </div>
          )}
          
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white' 
              type="email" 
              required 
            />
          </div>
          
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors dark:text-white' 
              type="password" 
              required 
            />
          </div>

          <button className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]'>
            {state === 'Sign Up' ? 'Create Account' : 'Sign In'}
          </button>
          
          <div className='mt-6 text-center space-y-2'>
            {state === 'Sign Up' ? (
              <p className='text-gray-600 dark:text-gray-300'>
                Already have an account?{' '}
                <span onClick={() => setState('Login')} className='text-primary font-medium cursor-pointer hover:underline'>
                  Sign In
                </span>
              </p>
            ) : (
              <>
                <p className='text-gray-600 dark:text-gray-300'>
                  Create a new account?{' '}
                  <span onClick={() => setState('Sign Up')} className='text-primary font-medium cursor-pointer hover:underline'>
                    Sign Up
                  </span>
                </p>
                <p className='text-gray-600 dark:text-gray-300'>
                  Forgot password?{' '}
                  <span onClick={() => navigate('/forgot-password')} className='text-primary font-medium cursor-pointer hover:underline'>
                    Reset Here
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login

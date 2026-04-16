import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col md:flex-row bg-gradient-to-r from-primary/10 via-white to-primary/10 dark:from-primary/20 dark:via-gray-800 dark:to-primary/20 rounded-2xl px-6 md:px-10 lg:px-14 py-8 md:py-12'>

            <div className='md:w-1/2 flex flex-col justify-center gap-6 py-6 md:py-0'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm w-fit animate-fade-in'>
                    <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                    Trusted Healthcare Platform
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-white font-bold leading-tight animate-fade-in-up'>
                    Book Appointment <br />
                    <span className='text-primary'>With Expert Doctors</span>
                </h1>
                <p className='text-gray-500 dark:text-gray-300 text-base max-w-md animate-fade-in-up delay-200'>
                    Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free. Your health is our priority.
                </p>
                <div className='flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300'>
                    <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105'>
                        Find a Doctor <img className='w-4' src={assets.arrow_icon} alt="" />
                    </button>
                    <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='flex items-center gap-2 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full font-medium hover:border-primary hover:text-primary transition-all hover:scale-105'>
                        Get Started
                    </button>
                </div>
                <div className='flex items-center gap-4 pt-2 animate-fade-in-up delay-400'>
                    <div className='flex -space-x-2'>
                        {[1,2,3,4].map((i) => (
                            <img key={i} className='w-10 h-10 rounded-full border-2 border-white dark:border-gray-800' src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                        ))}
                    </div>
                    <p className='text-sm text-gray-500 dark:text-gray-300'><span className='font-semibold text-gray-800 dark:text-white'>500+</span> patients trust us</p>
                </div>
            </div>

            <div className='md:w-1/2 relative flex items-center justify-center animate-scale-in'>
                <div className='relative'>
                    <img className='w-full max-w-md h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500' src={assets.header_img} alt="" />
                    <div className='absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg animate-float'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                                <img className='w-5' src={assets.verified_icon} alt="" />
                            </div>
                            <div>
                                <p className='font-semibold text-sm dark:text-white'>Verified Doctors</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>100% Trusted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

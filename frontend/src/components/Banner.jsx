import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-gradient-to-r from-primary to-primary/80 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-12'>

            <div className='flex-1 py-10 sm:py-14 md:py-18 lg:py-22 lg:pl-8'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up'>
                    Your Health is <br /> Our Priority
                </h2>
                <p className='text-white/80 text-base sm:text-lg mb-6 max-w-lg animate-fade-in-up delay-200'>
                    Book appointments with top-rated doctors in your area. Experience healthcare that puts you first.
                </p>
                <div className='flex flex-wrap gap-4 animate-fade-in-up delay-300'>
                    <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:shadow-lg hover:scale-105'>
                        Book Now
                    </button>
                    <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-white/20 text-white border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all hover:scale-105'>
                        View Doctors
                    </button>
                </div>
                <div className='flex items-center gap-8 mt-8 pt-6 border-t border-white/20 animate-fade-in-up delay-400'>
                    <div className='text-center'>
                        <p className='text-3xl font-bold text-white animate-pulse-glow rounded-lg px-2 py-1'>50+</p>
                        <p className='text-white/70 text-sm'>Expert Doctors</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-3xl font-bold text-white animate-pulse-glow rounded-lg px-2 py-1'>10K+</p>
                        <p className='text-white/70 text-sm'>Happy Patients</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-3xl font-bold text-white animate-pulse-glow rounded-lg px-2 py-1'>4.9</p>
                        <p className='text-white/70 text-sm'>Rating</p>
                    </div>
                </div>
            </div>

            <div className='hidden md:flex md:w-1/2 lg:w-[400px] items-center justify-center animate-slide-in-right'>
                <img className='w-full max-w-sm h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner

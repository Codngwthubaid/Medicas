import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-[#262626] md:mx-10'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold dark:text-white'>Top Doctors</h1>
                <p className='mt-2 text-gray-500 dark:text-gray-300 max-w-xl'>Meet our most trusted and highly-rated healthcare professionals</p>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5'>
                {doctors.slice(0, 8).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group animate-fade-in-up' style={{ animationDelay: `${index * 100}ms` }} key={index}>
                        <div className='relative bg-gray-100 dark:bg-gray-700'>
                            <img className='w-full h-auto min-h-[200px] max-h-[280px] object-contain object-center' src={item.image} alt={item.name} />
                            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>
                                {item.available ? 'Available' : 'Busy'}
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center justify-between mb-2'>
                                <p className='text-lg font-semibold text-gray-800 dark:text-white'>{item.name}</p>
                                <div className='flex items-center gap-1 text-yellow-500'>
                                    <span className='text-sm font-medium'>4.9</span>
                                    <span className='text-xs'>&#9733;</span>
                                </div>
                            </div>
                            <p className='text-primary text-sm font-medium mb-1'>{item.speciality}</p>
                            <p className='text-gray-500 dark:text-gray-400 text-xs'>{item.experience} experience</p>
                            <div className='flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700'>
                                <p className='text-sm font-semibold dark:text-white'>&#8377; {item.fees}</p>
                                <p className='text-xs text-gray-400'>per visit</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 mt-4 hover:scale-105'>
                View All Doctors
            </button>
        </div>
    )
}

export default TopDoctors

import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-16 text-[#262626]'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold dark:text-white'>Find by Speciality</h1>
                <p className='mt-2 text-gray-500 dark:text-gray-300 max-w-xl'>Browse our doctors by specialty to find the right care for your needs</p>
            </div>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-2 px-4 sm:px-0'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 group animate-fade-in-up' style={{ animationDelay: `${index * 100}ms` }} key={index}>
                        <div className='w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors border border-gray-100 dark:border-gray-700 group-hover:border-primary/30'>
                            <img className='w-12 sm:w-16' src={item.image} alt="" />
                        </div>
                        <p className='font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu

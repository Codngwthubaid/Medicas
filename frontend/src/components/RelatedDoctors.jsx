import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData.slice(0, 4))
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null

    return (
        <div className='flex flex-col items-center gap-6 my-16'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Related Doctors</h1>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>Other doctors with same specialty</p>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {relDoc.map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group' key={index}>
                        <div className='relative bg-gray-100 dark:bg-gray-700'>
                            <img className='w-full h-auto min-h-[160px] max-h-[220px] object-contain object-center' src={item.image} alt={item.name} />
                            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>
                                {item.available ? 'Available' : 'Busy'}
                            </div>
                        </div>
                        <div className='p-4'>
                            <p className='text-lg font-semibold text-gray-800 dark:text-white'>{item.name}</p>
                            <p className='text-primary text-sm font-medium'>{item.speciality}</p>
                            <p className='text-gray-500 dark:text-gray-400 text-xs mt-1'>{item.experience}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors

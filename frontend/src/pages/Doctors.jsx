import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    let filtered = doctors
    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality)
    }
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilterDoc(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, searchTerm])

  const specialities = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

  return (
    <div className='pb-16'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Find Your Doctor</h1>
        <p className='text-gray-500 dark:text-gray-400 mt-2'>Browse through our extensive list of trusted healthcare professionals</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <button onClick={() => setShowFilter(!showFilter)} className='lg:hidden py-2 px-4 border rounded-lg text-sm font-medium'>
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden lg:flex'} lg:w-64`}>
          <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm'>
            <p className='font-semibold mb-4 dark:text-white'>Search</p>
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50 dark:bg-gray-700 dark:text-white'
            />
          </div>
          
          <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm'>
            <p className='font-semibold mb-4 dark:text-white'>Specialties</p>
            <div className='flex flex-col gap-2'>
              <p onClick={() => navigate('/doctors')} className={`cursor-pointer py-2 px-3 rounded-lg transition-colors ${!speciality ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'}`}>
                All Specialties
              </p>
              {specialities.map((spec, index) => (
                <p key={index} onClick={() => navigate(`/doctors/${spec}`)} className={`cursor-pointer py-2 px-3 rounded-lg transition-colors ${speciality === spec ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300'}`}>
                  {spec}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filterDoc.length > 0 ? (
              filterDoc.map((item, index) => (
                <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group' key={index}>
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
              ))
            ) : (
              <div className='col-span-full text-center py-12'>
                <p className='text-gray-500 dark:text-gray-400 text-lg'>No doctors found</p>
                <p className='text-gray-400 dark:text-gray-500 text-sm mt-1'>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors

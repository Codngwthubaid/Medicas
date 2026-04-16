import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Please login to book an appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='max-w-6xl mx-auto pb-16'>
            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='lg:w-1/3'>
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden'>
                        <div className='w-full h-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
                            <img className='w-full h-full object-contain object-center' src={docInfo.image} alt={docInfo.name} />
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center gap-2 mb-2'>
                                <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{docInfo.name}</h2>
                                <img className='w-5' src={assets.verified_icon} alt="" />
                            </div>
                            <div className='flex items-center gap-2 mb-4'>
                                <span className='text-primary font-medium'>{docInfo.speciality}</span>
                                <span className='text-gray-300 dark:text-gray-600'>|</span>
                                <span className='text-gray-600 dark:text-gray-400'>{docInfo.degree}</span>
                            </div>
                            <div className='flex items-center gap-2 mb-4'>
                                <span className='px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium'>{docInfo.experience}</span>
                            </div>
                            <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4'>{docInfo.about}</p>
                            <div className='border-t border-gray-100 dark:border-gray-700 pt-4'>
                                <p className='text-gray-500 dark:text-gray-400 text-sm'>Consultation Fee</p>
                                <p className='text-2xl font-bold text-gray-800 dark:text-white'>{currencySymbol}{docInfo.fees}</p>
                            </div>
                            <div className='mt-4 flex items-center gap-2'>
                                <span className={`w-3 h-3 rounded-full ${docInfo.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                <span className={docInfo.available ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                                    {docInfo.available ? 'Available for appointments' : 'Currently unavailable'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:w-2/3'>
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6'>
                        <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-4'>Select Date & Time</h3>
                        
                        <div className='flex gap-3 overflow-x-auto pb-2 mb-6'>
                            {docSlots.length && docSlots.map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => { setSlotIndex(index); setSlotTime('') }}
                                    className={`flex-shrink-0 text-center py-4 px-5 rounded-xl cursor-pointer transition-all ${slotIndex === index ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'border border-gray-200 dark:border-gray-600 hover:border-primary/50 dark:text-gray-300'}`}
                                >
                                    <p className='text-xs font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p className='text-xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                                    <p className='text-xs opacity-75'>{item[0] && item[0].datetime.toLocaleString('default', { month: 'short' })}</p>
                                </div>
                            ))}
                        </div>

                        <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>Available Time Slots</h4>
                        <div className='flex flex-wrap gap-3'>
                            {docSlots.length && docSlots[slotIndex].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${item.time === slotTime ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'border border-gray-200 dark:border-gray-600 hover:border-primary/50 text-gray-600 dark:text-gray-300'}`}
                                >
                                    {item.time}
                                </button>
                            ))}
                        </div>

                        {docSlots.length && docSlots[slotIndex].length === 0 && (
                            <p className='text-gray-500 dark:text-gray-400 text-center py-4'>No slots available for this date</p>
                        )}

                        <div className='mt-8'>
                            <button 
                                onClick={bookAppointment} 
                                disabled={!slotTime}
                                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${slotTime ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : (
        <div className='flex items-center justify-center min-h-[50vh]'>
            <div className='animate-pulse text-gray-500 dark:text-gray-400'>Loading doctor details...</div>
        </div>
    )
}

export default Appointment

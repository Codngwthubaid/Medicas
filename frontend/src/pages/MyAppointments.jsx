import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    const getStatusBadge = (item) => {
        if (item.cancelled) {
            return <span className='px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium'>Cancelled</span>
        }
        if (item.isCompleted) {
            return <span className='px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium'>Completed</span>
        }
        if (item.payment) {
            return <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium'>Confirmed</span>
        }
        return <span className='px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium'>Pending Payment</span>
    }

    return (
        <div className='pb-16'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>My Appointments</h1>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>Manage your upcoming and past appointments</p>
            </div>

            {appointments.length > 0 ? (
                <div className='grid gap-4'>
                    {appointments.map((item, index) => (
                        <div key={index} className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow'>
                            <div className='flex flex-col md:flex-row'>
                                <div className='md:w-48 p-4 bg-gray-50 dark:bg-gray-700'>
                                    <img className='w-full h-32 object-contain rounded-xl bg-gray-100 dark:bg-gray-700' src={item.docData.image} alt="" />
                                </div>
                                <div className='flex-1 p-5'>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3'>
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>{item.docData.name}</h3>
                                            <p className='text-primary text-sm'>{item.docData.speciality}</p>
                                        </div>
                                        {getStatusBadge(item)}
                                    </div>
                                    
                                    <div className='flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4'>
                                        <div className='flex items-center gap-2'>
                                            <span className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs'>&#128197;</span>
                                            {slotDateFormat(item.slotDate)}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs'>&#128337;</span>
                                            {item.slotTime}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs'>&#8377;</span>
                                            {item.amount}
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap gap-3'>
                                        {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                            <button onClick={() => setPayment(item._id)} className='px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'>
                                                Pay Now
                                            </button>
                                        )}
                                        {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                            <button onClick={() => appointmentRazorpay(item._id)} className='px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'>
                                                Confirm Payment
                                            </button>
                                        )}
                                        {!item.cancelled && !item.isCompleted && (
                                            <button onClick={() => cancelAppointment(item._id)} className='px-4 py-2 border border-red-200 dark:border-red-800 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700'>
                    <div className='w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-3xl'>&#128197;</span>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400 text-lg'>No appointments yet</p>
                    <p className='text-gray-400 dark:text-gray-500 text-sm mt-1 mb-4'>Book your first appointment with a doctor</p>
                    <button onClick={() => navigate('/doctors')} className='px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'>
                        Find a Doctor
                    </button>
                </div>
            )}
        </div>
    )
}

export default MyAppointments

import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='pb-16'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>My Profile</h1>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>Manage your personal information</p>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden'>
                <div className='p-6 border-b border-gray-100 dark:border-gray-700'>
                    <div className='flex flex-col sm:flex-row items-center gap-6'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer relative'>
                                <div className='relative'>
                                    <img className='w-28 h-28 rounded-full object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                    <div className='absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
                                        <img className='w-5' src={assets.upload_icon} alt="" />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                        ) : (
                            <img className='w-28 h-28 rounded-full object-cover' src={userData.image} alt="" />
                        )}
                        
                        <div className='flex-1 text-center sm:text-left'>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-50 dark:bg-gray-700 text-2xl font-semibold w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:text-white' 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{userData.name}</h2>
                            )}
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>{userData.email}</p>
                        </div>
                        
                        <div>
                            {isEdit ? (
                                <div className='flex gap-3'>
                                    <button onClick={() => { setIsEdit(false); setImage(false) }} className='px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                                        Cancel
                                    </button>
                                    <button onClick={updateUserProfileData} className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'>
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setIsEdit(true)} className='px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors'>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='p-6'>
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Contact Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Phone</p>
                                {isEdit ? (
                                    <input 
                                        className='w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary dark:text-white' 
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                        value={userData.phone} 
                                    />
                                ) : (
                                    <p className='text-gray-800 dark:text-white font-medium'>{userData.phone}</p>
                                )}
                            </div>
                            <div>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Address</p>
                                {isEdit ? (
                                    <div className='space-y-2'>
                                        <input 
                                            className='w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary dark:text-white' 
                                            type="text" 
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                            value={userData.address.line1} 
                                            placeholder="Line 1"
                                        />
                                        <input 
                                            className='w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary dark:text-white' 
                                            type="text" 
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                            value={userData.address.line2} 
                                            placeholder="Line 2"
                                        />
                                    </div>
                                ) : (
                                    <p className='text-gray-800 dark:text-white font-medium'>{userData.address.line1} {userData.address.line2 && `, ${userData.address.line2}`}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Basic Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Gender</p>
                                {isEdit ? (
                                    <select 
                                        className='w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary dark:text-white' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                        value={userData.gender}
                                    >
                                        <option value="Not Selected">Not Selected</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <p className='text-gray-800 dark:text-white font-medium'>{userData.gender}</p>
                                )}
                            </div>
                            <div>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Date of Birth</p>
                                {isEdit ? (
                                    <input 
                                        className='w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary dark:text-white' 
                                        type='date' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                        value={userData.dob} 
                                    />
                                ) : (
                                    <p className='text-gray-800 dark:text-white font-medium'>{userData.dob}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex items-center justify-center min-h-[50vh]'>
            <div className='animate-pulse text-gray-500 dark:text-gray-400'>Loading profile...</div>
        </div>
    )
}

export default MyProfile

import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { backend_url } from '../App';

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {customerId} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    //fetch customer data
    const fetchSingleCustomer = async () => {
        try {
            const response = await axios.get(`${backend_url}/api/customer/get-singlecustomer/${customerId}`, {withCredentials: true});
            response.data.map((item) => {
                setName(item.name)
                setEmail(item.email)
                setPhone(item.phone)
                setAddress(item.address)
            })
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        fetchSingleCustomer()
    }, [])

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.put(`${backend_url}/api/customer/update/${customerId}`, {name, email, phone, address}, {withCredentials: true});
            if(response.data) {
                toast.success(response.data);
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');
                navigate('/');
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
    }
    return (
        <div className='bg-blue-600 h-screen flex justify-center items-center'>
            <div className='bg-white rounded p-8 w-full max-w-[570px]'>
                <form onSubmit={updateHandler} className='flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>Edit Student</h2>
                    <div className='mb-2 flex flex-col gap-1'>
                        <label className='font-medium text-gray-800 text-[15px]'>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='border-2 border-gray-400 w-full rounded p-3 font-medium text-sm focus:outline-none text-gray-700 placeholder:text-gray-500' required />
                    </div>
                    <div className='mb-2 flex flex-col gap-1'>
                        <label className='font-medium text-gray-800 text-[15px]'>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='border-2 border-gray-400 w-full rounded p-3 font-medium text-sm focus:outline-none text-gray-700 placeholder:text-gray-500' required />
                    </div>
                    <div className='mb-2 flex flex-col gap-1'>
                        <label className='font-medium text-gray-800 text-[15px]'>Phone</label>
                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone' className='border-2 border-gray-400 w-full rounded p-3 font-medium text-sm focus:outline-none text-gray-700 placeholder:text-gray-500' required />
                    </div>
                    <div className='mb-2 flex flex-col gap-1'>
                        <label className='font-medium text-gray-800 text-[15px]'>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' className='border-2 border-gray-400 w-full rounded p-3 font-medium text-sm focus:outline-none text-gray-700 placeholder:text-gray-500' required />
                    </div>
                    <button type='submit' className='bg-blue-500 text-white w-[120px] h-[43px] font-medium mt-3 cursor-pointer'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Edit
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { backend_url } from '../App';

const Home = () => {
    const [model, setModel] = useState(false)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    
    // fetch All Data
    const fetchAllData = async () => {
        try {
            let response = await axios.get(`${backend_url}/api/customer/get-customers`, { withCredentials: true });
            setData(response.data.reverse());
        } catch (error) {
            console.log("Error in getting all data: " + error);
        }
    }
    useEffect(() => {
        fetchAllData();
    }, [])
    // Delete customer
    const deleteCustomer = async (customerId) => {
        try {
            let response = await axios.delete(`${backend_url}/api/customer/delete/${customerId}`, { withCredentials: true });
            if (response.data) {
                toast.success(response.data);
                fetchAllData();
            }
        } catch (error) {
            console.log("Error in deleting customer: " + error)
            toast.error(error.respnse);
        }
    }
    // Add customer
    const addCustomerHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            let response = await axios.post(`${backend_url}/api/customer/add`,{name,email,phone,address}, { withCredentials: true })
            if (response.data) {
                toast.success(response.data);
                fetchAllData();
                setLoading(false)
                setModel(false);
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.response)
            toast.error(error.response)
        }
    }
    return (
        <div className='flex h-screen items-center justify-center bg-blue-600 px-3'>
            <div className='max-w-5xl w-full bg-white rounded-md p-7'>
                <h2 className='text-gray-800 font-semibold text-2xl mb-5'>Customers</h2>
                <button onClick={() => setModel(true)} className='bg-green-600 cursor-pointer text-white px-5 py-2 rounded font-medium'>Add +</button>
                <table className='table w-full mt-6'>
                    <thead>
                        <tr className='w-full hidden lg:grid lg:grid-cols-[2fr_3fr_2fr_4fr_2fr_1fr] gap-4 border-b pb-2 border-gray-300'>
                            <th className='text-gray-800 font-semibold text-start'>Name</th>
                            <th className='text-gray-800 font-semibold text-start'>Email</th>
                            <th className='text-gray-800 font-semibold text-start'>Phone</th>
                            <th className='text-gray-800 font-semibold text-start'>Address</th>
                            <th className='text-gray-800 font-semibold text-start'>Date</th>
                            <th className='text-gray-800 font-semibold text-start'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((customer, index) => (
                            <tr key={index} className='w-full flex flex-col lg:grid lg:grid-cols-[2fr_3fr_2fr_4fr_2fr_1fr] gap-4 text-sm border-b py-3 border-gray-300'>
                                <td className='text-gray-600 font-medium text-start'>{customer.name}</td>
                                <td className='text-gray-600 font-medium text-start'>{customer.email}</td>
                                <td className='text-gray-600 font-medium text-start'>{customer.phone}</td>
                                <td className='text-gray-600 font-medium text-start'>{customer.address}</td>
                                <td className='text-gray-600 font-medium text-start'>{new Date(customer.date).toDateString()}</td>
                                <th className="buttons flex items-center justify-between gap-3">
                                    <Link to={`/update/${customer.id}`} className='text-xl text-gray-800 cursor-pointer'><FiEdit /></Link>
                                    <button onClick={() => deleteCustomer(customer.id)} className='text-xl text-gray-800 cursor-pointer'><RiDeleteBin5Line /></button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Add customer */}
            <div className={`bg-white rounded p-8 pt-10 w-[570px] fixed z-50 ${model ? "block" : "hidden"}`}>
                <form onSubmit={addCustomerHandler} className='flex flex-col gap-2'>
                    <span onClick={() => setModel(false)} className='absolute top-1 left-1 text-xl cursor-pointer'><IoMdClose /></span>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>Add customer</h2>
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
                    <button type='submit' className='bg-blue-500 text-white w-[120px] h-[43px] font-medium mt-3 cursor-pointer'>{loading ? "Loading..." : "ADD"}</button>
                </form>
            </div>
            {/* Overlay */}
            <div className={`bg-black h-screen w-full opacity-50 fixed ${model ? "block" : "hidden"}`}></div>
        </div>
    )
}

export default Home
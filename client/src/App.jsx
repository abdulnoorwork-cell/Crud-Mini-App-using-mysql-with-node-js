import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Edit from './pages/Edit';
export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/update/:customerId' element={<Edit />} />
      </Routes>
      <ToastContainer toastStyle={{color: 'black'}} />
    </div>
  )
}

export default App
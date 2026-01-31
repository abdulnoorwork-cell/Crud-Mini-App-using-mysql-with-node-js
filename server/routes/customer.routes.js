import express from 'express'
import { addCustomer, deleteCustomer, getCustomers, getSingleCustomer, updateCustomer } from '../controllers/customer.controller.js';
const router = express.Router()

router.get('/get-customers', getCustomers);
router.post('/add', addCustomer);
router.delete('/delete/:customerId', deleteCustomer)
router.get('/get-singlecustomer/:customerId', getSingleCustomer);
router.put('/update/:customerId', updateCustomer);

export default router;
import db from '../config/dbConnection.js'

export const getCustomers = (req, res) => {
    const sql = "SELECT * FROM customers";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json("Error in getting customers: " + err)
        } else {
            res.status(200).json(data);
        }
    })
}

export const addCustomer = (req,res) => {
    const {name, email, phone, address} = req.body;
    if(!name || !email || !phone || !address) {
        return res.status(400).json("All fields are required")
    }
    const sql = "INSERT into customers (`name`,`email`,`phone`,`address`) VALUES(?)"
    const values = [
        name,
        email,
        phone,
        address
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.status(500).json("Error in adding new customer: " + err)
        } else {
            res.status(201).json("Customer Created");
        }
    })
}

export const deleteCustomer = (req, res) => {
    const {customerId} = req.params;
    const sql = "DELETE FROM customers WHERE id = " + customerId;
    db.query(sql, (err, data) => {
        if(err) {
            return res.status(500).json("Error in deleting customer: " + err)
        } else {
            res.status(200).json("Customer Deleted")
        }
    })
}

export const getSingleCustomer = (req, res) => {
    const { customerId } = req.params;
    const sql = "SELECT * FROM customers WHERE id = " + customerId;
    db.query(sql, (err, data) => {
        if(err) {
            return res.status(500).json("Error in getting single customer: " + err)
        } else {
            res.status(200).json(data);
        }
    })
}

export const updateCustomer =async (req, res) => {
    const {customerId} = req.params;
    const { name,email,phone,address } = req.body;
    if(!name || !email || !phone || !address) {
        return res.status(400).json("All fields are required");
    }
    const sql = "UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = " + customerId;
    const values = [
        name,
        email,
        phone,
        address
    ]
    await db.query(sql, [...values, customerId], (err, data) => {
        if(err) {
            return res.status(500).json("Error in updating customer: " + err)
        } else {
            res.status(200).json("Customer Updated")
        }
    })
}
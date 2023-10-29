const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const mysql = require('mysql')
const conn = mysql.createConnection(config);
async function getCustomerData(value) {
    let query = ''
    if (value !== "") {
        query = 'SELECT * FROM customer_details where cust_email' + value;
    } else {
        query = 'SELECT * FROM customer_details'
    }
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    let error = ""
    if (data.length === 0) {
        error = "No Data Found"
    }
    return {
        data,
        error
    }
}
async function CustomerLogin(email, password) {
    let query = "";
    let rows = []
    let data = []
    let error = ""
    query = 'SELECT * FROM customer_details where cust_email=' + "'" + email + "'";
    rows = await db.query(query);
    data = helper.emptyOrRows(rows);
    if (data.length !== 0) {
        query = 'SELECT * FROM customer_details where cust_email=' + "'" + email + "'" + ' and cust_password=' + "'" + password + "'";
        rows = await db.query(query);
        data = helper.emptyOrRows(rows);
        if (data.length === 0) {
            error = "Please Enter Correct Password !"
        } else {
            let query1 = "UPDATE customer_details SET login_status='Y' where cust_email=" + "'" + email + "'" + ' and cust_password=' + "'" + password + "'";
            await db.query(query1).catch((err) => {
                error = err;
                data = []
                conn.rollback()
            })
        }
    } else {
        error = "Please Enter Correct Email Id !"
    }
    return {
        data,
        error
    }
}
async function CustomerLogout(email, userId) {
    let data = ''
    let error = ""
    let query1 = "UPDATE customer_details SET login_status='N' where cust_email=" + "'" + email + "'" + ' and cust_id=' + "'" + userId + "'";
    data = await db.query(query1).catch((err) => {
        error = err;
        data = ''
        conn.rollback()
    })
    return {
        data,
        error
    }
}
module.exports = {
    getCustomerData,
    CustomerLogin,
    CustomerLogout
}
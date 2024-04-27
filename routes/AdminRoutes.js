const admincontroller = require ("../controllers/AdminController")

const express = require ("express")
const adminrouter = express.Router()

// admin Routes

adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.get("/viewartists",admincontroller.viewartist)
adminrouter.get("/viewartworks",admincontroller.viewartworks)
adminrouter.get("/viewqueries",admincontroller.viewqueries)
adminrouter.get("/viewfeedbacks",admincontroller.viewfeedbacks)
adminrouter.get("/analysis",admincontroller.analysis)


adminrouter.delete("/deleteartist/:email",admincontroller.deleteartist)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)


adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)


adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)

module.exports = adminrouter
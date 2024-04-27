const customercontroller = require ("../controllers/CustomerController")

const express = require ("express")
const customerrouter = express.Router()

// customer Routes

customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)
customerrouter.post("/feedback",customercontroller.feedback)
customerrouter.post("/contactus",customercontroller.contactus)
customerrouter.post("/placeorder",customercontroller.placeorder)
customerrouter.post("/processingpayment",customercontroller.payment)
customerrouter.post("/addfavorite",customercontroller.addfavorite)
customerrouter.post("/otpsender",customercontroller.otpsender)

customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile)
customerrouter.put("/changecustomerpwd",customercontroller.changecustomerpwd)

customerrouter.get("/customerprofile/:email",customercontroller.customerprofile)
customerrouter.get("/explorearts",customercontroller.explorearts) 
customerrouter.get("/getartobject/:artid",customercontroller.getartobject)
customerrouter.get("/findartist/:email",customercontroller.findartist)
customerrouter.get("/searchbycategory/:category",customercontroller.searchbycategory)
customerrouter.get("/searchbytitle/:title",customercontroller.searchbytitle)
customerrouter.get("/viewfavorite/:email",customercontroller.viewfavorite)
customerrouter.get("/vieworder/:email",customercontroller.vieworder)

customerrouter.delete("/deleteorder/:orderid",customercontroller.deleteorder)
customerrouter.delete("/removefavorite/:email",customercontroller.removefavorite)


module.exports = customerrouter
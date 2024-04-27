const Customer = require ("../models/Customer")
const Artist = require ("../models/Artist")
const Admin = require ("../models/Admin")
const Artwork = require ("../models/Artwork")
const ContactUs = require("../models/ContactUs")
const Feedback = require ("../models/Feedback")
const Order = require ("../models/Order")

const viewcustomers = async (request,response) => 
{
    try
    {
        const customers = await Customer.find()
        if(customers.length == 0)
        {
            response.send("NO CUSTOMER REGISTERED YET")
        }
        else
        {
            response.json(customers)
        }
    }
    catch(e)
    {
        response.status(500).send(e.message)
    }
}

const deletecustomer = async (request, response) => 
{
     try 
     {
       const email = request.params.email
       const customer = await Customer.findOne({"email":email})
       if(customer!=null)
       {
         await Customer.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
};

const viewartist = async (request,response) => 
{
    try
    {
        const artists = await Artist.find()
        if(artists.length == 0)
        {
            response.send("NO ARTIST REGISTERED YET")
        }
        else
        {
            response.json(artists)
        }
    }
    catch(e)
    {
        response.status(500).send(e.message)
    }
}

const deleteartist = async (request, response) => 
{
     try 
     {
       const email = request.params.email
       const artist = await Artist.findOne({"email":email})
       if(artist!=null)
       {
         await Artist.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
};

const viewartworks = async (request,response) => 
{
    try
    {
        const artworks = await Artwork.find()
        if(artworks.length == 0)
        {
            response.send("NO ARTWORKS PUBLISHED YET")
        }
        else
        {
            response.json(artworks)
        }
    }
    catch(e)
    {
        response.status(500).send(e.message)
    }
};

const viewqueries = async (request,response) => 
{
    try
    {
        const queries = await ContactUs.find()
        if(queries.length == 0)
        {
            response.send("NO ARTWORKS PUBLISHED YET")
        }
        else
        {
            response.json(queries)
        }
    }
    catch(e)
    {
        response.status(500).send(e.message)
    }
};

const viewfeedbacks = async (request,response) => 
{
    try
    {
        const feedbacks = await Feedback.find()
        if(feedbacks.length == 0)
        {
            response.send("NO ARTWORKS PUBLISHED YET")
        }
        else
        {
            response.json(feedbacks)
        }
    }
    catch(e)
    {
        response.status(500).send(e.message)
    }
};
 
const checkadminlogin = async (request, response) => 
{
      try 
      {
        const input = request.body
        console.log(input)
        const admin = await Admin.findOne(input)
        response.json(admin)
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
};

const changeadminpwd = async (request, response) => {
  try 
  {
    const {username, oldpassword, newpassword } = request.body;

    const admin = await Admin.findOne({ username, password: oldpassword });
    
     if (!admin) 
    {
      response.status(400).send('Invalid Old Password');
    }
    else
    {
        if(oldpassword==newpassword)
        {
          response.status(400).send('Both Passwords are Same');
        }
        else
        {
          await Admin.updateOne({username},{ $set: { password: newpassword } });
           response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};


const analysis = async (req, res) => {
  try 
  {
      const artistCount = await Artist.countDocuments();
      const artCount = await Artwork.countDocuments();
      const customerCount = await Customer.countDocuments();
      const feedbackCount = await Feedback.countDocuments();
      const orderCount = await Order.countDocuments();
      res.json({artistCount,artCount,customerCount,feedbackCount,orderCount});
  } 
  catch (error) 
  {
      res.status(500).send(error.message);
  }
};


module.exports = {viewcustomers,deletecustomer,checkadminlogin,deleteartist,viewartist,viewartworks,viewqueries,viewfeedbacks,changeadminpwd,analysis}
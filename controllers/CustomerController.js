const Artwork = require("../models/Artwork");
const Customer = require ("../models/Customer")
const Artist = require ("../models/Artist")
const Feedback = require ("../models/Feedback")
const ContactUs = require ("../models/ContactUs")
const Order = require ("../models/Order")
const Transaction = require ("../models/Transaction")
const Favorite = require ("../models/Favorite")

const insertcustomer = async (request,response) => {
    try 
    {
      const input = await request.body;
      const customer = new Customer(input);
      await customer.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
}

const updatecustomerprofile = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const customer = await Customer.findOne({ email });
    if (!customer) 
    {
      response.status(200).send('Customer not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        customer[key] = input[key];
      }
    }
    await customer.save();
    response.status(200).send('Customer Profile Updated Successfully');
  } 
  catch (e) 
  {
    response.status(500).send(e.message);
  }
};


const checkcustomerlogin = async (request, response) => 
{
     try 
     {
       const input = request.body
       const customer = await Customer.findOne(input)
       response.json(customer)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
};

const customerprofile = async (request, response) => 
{
      try 
      {
        const email = request.params.email
        const customer = await Customer.findOne({email})
        if(customer)
        {
          response.json(customer) 
        }
        else
        {
          return response.status(200).send('Customer not found with the provided email id');
        }
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
};

const findartist = async (request, response) => 
{
      try 
      {
        const email = request.params.email
        const artist = await Artist.findOne({email})
        if(artist)
        {
          response.json(artist) 
        }
        else
        {
          return response.status(200).send('Artist not found with the provided email id');
        }
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
};

const explorearts = async (request, response) => 
{
   try 
   {
     const arts = await Artwork.find();
     if(arts.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(arts);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
};

const getartobject = async (request, response) => {
  try 
  {
    const artid = request.params.artid;

    const artwork = await Artwork.findOne({artid});

    if(!artwork)
    {
      response.status(400).send('Invalid Artid');
    }
    else
    {
      response.json(artwork);
    }
  }
  catch (error) 
   {
     response.status(500).send(error.message);
   }
};

const changecustomerpwd = async (request, response) => {
  try 
  {
    const {email, oldpassword, newpassword } = request.body;

    const customer = await Customer.findOne({ email, password: oldpassword });
    
     if (!customer) 
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
          await Customer.updateOne({email},{ $set: { password: newpassword } });
          response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};

const feedback = async (request,response) => {
  try 
  {
    const input = await request.body;
    const customerfeedback = new Feedback(input);
    await customerfeedback.save();
    response.send('Submitted Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
}

const contactus = async (request,response) => {
  try 
  {
    const input = await request.body;
    const contactus = new ContactUs(input);
    await contactus.save();
    response.send('Submitted Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
}

const placeorder = async (request,response) => {
  try 
  {
    const input = await request.body;
    const order = new Order(input);
    await order.save();
    response.send('Ordered Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
}

const deleteorder = async (request, response) => 
{
    try 
    {
      const orderid = request.params.orderid
      const order = await Order.findOne({"email":email})
      if(order!=null)
      {
        await order.deleteOne({"orderid":orderid})
        response.status(200).send("Order Cancelled Successfully")
      }
      else
      {
        response.status(200).send("Order Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
};

const payment = async (request,response) => {
  try 
  {
    const input = await request.body;
    const transaction = new Transaction(input);
    await transaction.save();
    response.send('Payment Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
}

const searchbycategory = async (request, response) => 
{
      try 
      {
        const category = request.params.category
        const art = await Artwork.find({category})
        if(art)
        {
          response.json(art) 
        }
        else
        {
          return response.status(200).send('No Arts found with this category');
        }
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
};


const searchbytitle = async (request, response) => {
  try {
    if (!request.params.title) {
      return response.status(400).send('Missing required query parameter: title');
    }
    const titleSubstring = request.params.title;
    const escapedTitle = titleSubstring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedTitle, 'i');
    const searchCriteria = { title: regex };
    const arts = await Artwork.find(searchCriteria);

    if (arts && arts.length > 0) {
      response.json(arts);
    } else {
      return response.status(200).send('No Arts found matching the substring in title');
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const addfavorite = async (request,response) => {
  try 
  {
    const input = await request.body;
    const favorite = new Favorite(input);
    await favorite.save();
    response.send('Favorite added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
}

const viewfavorite = async (request,response) => {
  try 
   {
     const email = request.params.email
     const arts = await Favorite.find({"user.email":email});
     if(arts.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(arts);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
}

const removefavorite = async (request, response) => 
{
     try 
     {
       const email = request.params.email
       const art = await Favorite.findOne({"user.email":email})
       if(art!=null)
       {
         await Favorite.deleteOne({"user.email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Artwork Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
};

const nodemailer = require ("nodemailer")

const otpsender = async (request, response) => {
  const gmailTransporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'yaswanthguntha7@gmail.com',
          pass: 'rohx rnqs cmbp uzxz'
      }
  });

  function generateOTP() {
      return Math.floor(Math.random() * 900000) + 100000;
  }

  const email = await request.body;
  const OTP = generateOTP();
  const otpMap = {};

  const mailOptions = {
      from: 'yaswanthguntha7@gmail.com.com',
      to: email,
      subject: 'Gallery App',
      html: `<p>OTP Verification for Forget Password</p><p>Your OTP is: <strong>${OTP}</strong></p>`
  };

  gmailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          response.status(500).send('Error sending email through Gmail: ' + error.message);
      } else {
          otpMap[email] = OTP;
          response.status(200).json(OTP);
      }
  });
};

const vieworder = async (request,response) => {
  try 
   {
     const email = request.params.email
     const arts = await Order.find({"user.email":email});
     if(arts.length==0)
     {
       response.status(200).send("DATA NOT FOUND");
     }
     else
     {
       response.json(arts);
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
}

module.exports = {insertcustomer,checkcustomerlogin,updatecustomerprofile,customerprofile,findartist,explorearts,getartobject,changecustomerpwd,feedback,contactus,placeorder,deleteorder,payment,searchbycategory,searchbytitle,addfavorite,viewfavorite,removefavorite,otpsender,vieworder}
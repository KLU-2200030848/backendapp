const Artist = require ("../models/Artist")
const Artwork = require ("../models/Artwork")
const Order = require ("../models/Order")

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const insertartist = async (request,response) => {
    try 
    {
      const input = await request.body;
      const artist = new Artist(input);
      await artist.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
}

const checkartistlogin = async (request, response) => 
{
     try 
     {
       const input = request.body
       const artist = await Artist.findOne(input)
       response.json(artist)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');

const publishartwork = async (req, res) => 
{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const {artid, title, category, description, dimensions, price, postedtime, artist } = req.body;
      const fileName = req.file ? req.file.filename : undefined; 

      const newArt = new Artwork({
        artid,
        title,
        category,
        description,
        dimensions,
        price,
        postedtime,
        artist,
        file: fileName 
      });

      await newArt.save();
      res.status(200).send('Artwork Published Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const artimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream(Binary Data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const updateartistprofile = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const artist = await Artist.findOne({ email });
    if (!artist) 
    {
      response.status(200).send('Artist not found');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        artist[key] = input[key];
      }
    }
    await artist.save();
    response.status(200).send('Profile Updated Successfully');
  } 
  catch (e) 
  {
    response.status(500).send(e.message);
  }
};

const artistprofile = async (request, response) => 
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

const myartwork = async (request, response) => 
{
   try 
   {
     const email = request.params.email
     const arts = await Artwork.find({"artist.email":email});
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

const deleteartwork = async (request, response) => 
{
    try 
    {
      const artid = request.params.artid
      const artwork = await Artwork.findOne({"artid":artid})
      if(artwork!=null)
      {
        await artwork.deleteOne({"artid":artid})
        response.status(200).send("Art Work Deleted Successfully")
      }
      else
      {
        response.status(200).send("Art Work Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
};

const changeartistpwd = async (request, response) => {
  try 
  {
    const {email, oldpassword, newpassword } = request.body;

    const artist = await Artist.findOne({ email, password: oldpassword });
    
     if (!artist) 
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
          await Artist.updateOne({email},{ $set: { password: newpassword } });
          response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};

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

const cancelorder = async (request, response) => 
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

module.exports = {insertartist,checkartistlogin,publishartwork,updateartistprofile,myartwork,artistprofile,artimage,deleteartwork,changeartistpwd,placeorder,cancelorder}
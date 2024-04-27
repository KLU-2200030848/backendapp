const artistcontroller = require ("../controllers/ArtistController")

const express = require ("express")
const artistrouter = express.Router()

// artist Routes

artistrouter.post("/insertartist",artistcontroller.insertartist)
artistrouter.post("/checkartistlogin",artistcontroller.checkartistlogin)
artistrouter.post("/publishartwork",artistcontroller.publishartwork)
artistrouter.post("/placeorder",artistcontroller.placeorder)


artistrouter.put("/updateartistprofile",artistcontroller.updateartistprofile)
artistrouter.put("/changeartistpwd",artistcontroller.changeartistpwd)


artistrouter.get("/myartwork/:email",artistcontroller.myartwork)
artistrouter.get("/artistprofile/:email",artistcontroller.artistprofile)
artistrouter.get("/artimage/:filename",artistcontroller.artimage)

artistrouter.delete("/deleteartwork/:artid",artistcontroller.deleteartwork)
artistrouter.delete("/cancelorder/:orderid",artistcontroller.cancelorder)


module.exports = artistrouter
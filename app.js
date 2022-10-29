const ewelink = require('ewelink-api');
// const functions = require('firebase-functions')
var cors = require('cors')
const express = require('express');
const app = express()
const port = 3001
app.use(cors())

let access_tokeen = ""
let access_region = ""

app.get('/getdevices',async (req, res) => {
  try {
      const connection = new ewelink({
        email: 'aakashsingh688@gmail.com',
        password: '95A@singh',
        region: 'as',
      });
    const auth = await connection.getCredentials();
    console.log('access token: ', auth.at);
    console.log('api key: ', auth.user.apikey);
    console.log('region: ', auth.region);
    access_tokeen = auth.at
    access_region = auth.region
      /* get all devices */
        const devices = await connection.getDevices();
        const dlist = []
        for(let i=0;i<devices.length;i++){
          dlist.push(devices[i])
        } 
        console.log(devices.length)
        console.log('200')
    return res.json({'response':dlist})
  } catch (error) {
    return res.json({ "status": "404" })
  }
})


app.get('/getdevices/state',async (req, res) => {
  try {
      const connection = new ewelink({
        at: access_tokeen,
        region: access_region
      });
      /* get all devices */
        const devices = await connection.getDevices();
        const dlist = []
        for(let i=0;i<devices.length;i++){
          dlist.push(devices[i])
        } 
        console.log(devices.length)
        console.log('200')
    return res.json({'response':dlist})
  } catch (error) {
    return res.json({ "status": "404" })
  }
})

app.get('/getstate/:id',async (req, res,) => {
  try {
      const connection = new ewelink({
        at: access_tokeen,
        region: access_region
      });
      var id = req.params.id;
      state = await connection.getDevicePowerState(id);
    return res.json({'response':state})
  } catch (error) {
    return res.json({ "status": "404" })
  }
})

app.post('/toggle/:id/:state', async (req,res) => {
  // console.log("token>>" + access_tokeen)
  try {
    const connection = new ewelink({
      at: access_tokeen,
      region: access_region
    });
    var id = req.params.id;
    var state = req.params.state
    if(state=='true'){
      var status = await connection.setDevicePowerState(id,"on"); // possible states 'toggle', 'on', 'off'
      console.log("id: " + id + " On")
    }
    else{
      var status = await connection.setDevicePowerState(id,"off"); // possible states 'toggle', 'on', 'off'
      console.log("id: " + id + " Off")
    }
    console.log(status);
    return res.json({"status":status})
  }
  catch(error){
    return res.json({"status":error})
  }
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

app.listen(process.env.PORT || 5000)
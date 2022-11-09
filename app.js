const ewelink = require('ewelink-api');
var cors = require('cors')
var serviceAccount = "serviceAccountKey.json"
const admin = require('firebase-admin')
const express = require('express');
const app = express()
const port = 3001
let username = ""
let pass = ""
app.use(cors())

const firebase = admin.initializeApp ({
  apiKey: "AIzaSyCnZNqVlR6UdIdL4OBzO731Mt1W7lV5d0I",
  authDomain: "buildint-rnd.firebaseapp.com",
  databaseURL: "https://buildint-rnd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "buildint-rnd",
  storageBucket: "buildint-rnd.appspot.com",
  messagingSenderId: "529209549403",
  appId: "1:529209549403:web:689c5de9548ae5af60957e",
  measurementId: "G-CZQQG8VSDG",
  credential: admin.credential.cert(serviceAccount)
});

app.get('/accountcredentials/:arg',async(req,res) => {

  var arg = req.params.arg;
  const resp = await firebase.database().ref("ewelink-account").child(arg).once("value")
  .then((data)=>{
    try{
    cred = JSON.stringify(data)
    console.log(cred)
    console.log(cred.split(":")[0].split('"')[1])
    console.log(cred.split(":")[1].split('"')[0])
    username = cred.split(":")[0].split('"')[1]
    pass = cred.split(":")[1].split('"')[0]
    return (res.json({'email':username, 'pass':pass}))
    }
    catch(e){
      console.log(e)
      return (res.json({'response':'user not found'}))
    }
  });
})

app.get('/getdevices',async (req, res) => {
  try {
      const connection = new ewelink({
        email : username,
        password : pass,
        region: 'as',
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


app.get('/getdevices/state',async (req, res) => {
  try {
    const connection = new ewelink({
      email : username,
      password : pass,
      region: 'as',
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
      email : username,
      password : pass,
      region: 'as',
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
      email : username,
      password : pass,
      region: 'as',
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
//   console.log(`App listening on port ${port}`)
// })

app.listen(process.env.PORT || 5000)
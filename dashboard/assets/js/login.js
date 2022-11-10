
// firebase authentication script
var firebaseConfig = {
  apiKey: "AIzaSyCnZNqVlR6UdIdL4OBzO731Mt1W7lV5d0I",
  authDomain: "buildint-rnd.firebaseapp.com",
  databaseURL: "https://buildint-rnd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "buildint-rnd",
  storageBucket: "buildint-rnd.appspot.com",
  messagingSenderId: "529209549403",
  appId: "1:529209549403:web:689c5de9548ae5af60957e",
  measurementId: "G-CZQQG8VSDG"
};


// firebase init
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let currenturl = window.location.href;
let uname = ''
let pwd = ''
// login click event
async function btn_click(){
  email = document.getElementById("login-email").value
  password = document.getElementById("login-password").value
  if(email.trim()==""){
    alert("Enter email")
  }
  else{
    validation = email.split("@")[0]
    // call ewelink route here
    url = "https://switch.aakashsingh.tech/accountcredentials/"+validation
    await fetch(url)
    .then(res => res.json())
    .then(data => {
      uname = data['email']
      pwd = data['pass']
      // console.log(uname,pwd)
      localStorage.setItem('uname',uname)
      localStorage.setItem('pwd',pwd)
    }
    
    )
    login(email,password)
  }
}

// login function
function login(email,password){
  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    showHomepage()
  })
  .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
}

// redirect to homepage on login
function showHomepage(){
  window.location.href="dashboard.html";
};

// signout and redirect to login page
function signout(){
  auth.signOut()
  .then(() => {
    window.location.href = "index.html"
  })
  .catch((error) => {
    alert("error signning out, please try again")
  })
}

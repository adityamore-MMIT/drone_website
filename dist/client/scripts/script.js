import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt8QbQn_BOZqcIzzqM_5W4mK1_iuFy5lQ",
  authDomain: "drone-website-33e43.firebaseapp.com",
  projectId: "drone-website-33e43",
  storageBucket: "drone-website-33e43.appspot.com",
  messagingSenderId: "913365160953",
  appId: "1:913365160953:web:4541dddf39eb4b9829a328",
  measurementId: "G-1F77KTE9VX",
  databaseURL: "https://drone-website-33e43-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contact_form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var fname = getInputVal("fname");
  var lname = getInputVal("lname");
  var email = getInputVal("emails");
  var country_code = getInputVal("country_code");
  var mobile_num = getInputVal("mobile");
  var message = getInputVal("message");
  // Save message
  // console.log(`fname: ${fname} lname:${lname} emails:${email} country_code:${country_code} mobile number:${mobile_num} message:${message}`)
  // saveMessage(fname,lname,email,country_code, mobile_num,message);

  // Clear form
  document.getElementById('contact_form').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname,lname,email,country_code, mobile_num,message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: fname,
    last_name:lname,
    email:email,
    country_code: country_code,
    mobile:mobile_num,
    message:message
  });
}
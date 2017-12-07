import { extendObservable } from 'mobx';
var axios = require('axios');
var http = require('https');


export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: null,
      success: null,
      get retrieveUser() {
        return this.user
      }
    })
    this.signUpUser = this.signUpUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  
  }

  signUpUser(newUserObj) {
   
    return new Promise((resolve, reject) => {
      axios.post("/signup",
        {
          firstName: newUserObj.firstName,
          lastName: newUserObj.lastName,
          email: newUserObj.email,
          confirmed: false,
          password: newUserObj.password,
          admin: newUserObj.admin,
          message: newUserObj.message
        }
      ).then((userObj) => {
        if (userObj.data) {
          this.user = userObj.data.userReturned
        } else {
          reject(userObj);
        }    
        resolve(userObj);
      })
    })
  }

  loginUser(userObj) {
    return new Promise((resolve, reject) => {
      axios.post('/login',
        {
          username: userObj.email,
          password: userObj.password
        }
      ).then((loggedInUser) => {
        if (loggedInUser.data.success) {
          this.user=loggedInUser.data.user
        } else {
          this.message='incorrect username or password'
        }
        resolve(loggedInUser.data);
        console.log(loggedInUser);
      })
      
    })
  }
  logout() {
    axios.get('/logout').then((res)=> {
      if (res) { 
        this.user = null;  
        sessionStorage.removeItem('user');
      }  else {
        console.log('undefined');
        this.props.history.push('/fancycalendar');
      }
    }, function(err){
      console.log(err);
    });
   
  }

  verifyUser(userObj){
    return new Promise((resolve, reject)=>{
      axios.get('/getUser').then((res)=>{
        if(res.data.message !== "nobody logged in"){
          this.user = res.data;
          resolve();
        } else {
          reject(res.data.message);
          //console.log('log in') 
          //this.props.history.push('/login')
        }
      })
   });
  }
};
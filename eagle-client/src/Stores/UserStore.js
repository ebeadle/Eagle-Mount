import { extendObservable } from 'mobx';
var axios = require('axios');



export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: null,
      success: null,
      // admin: false,
      get retrieveUser() {
        return this.user
      }
    })
    this.signUpUser = this.signUpUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  signUpUser(newUserObj) {
    console.log(newUserObj);
    return new Promise((resolve, reject) => {
      axios.post("/signup",
        {
          firstName: newUserObj.firstName,
          lastName: newUserObj.lastName,
          email: newUserObj.email,
          password: newUserObj.password,
          admin: newUserObj.admin,
          message: newUserObj.message
        }
      ).then((userObj) => {
        if (userObj.data) {
          this.user = userObj.data
        } else {
        
          reject(userObj);
        }
        console.log(userObj);
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
        console.log(loggedInUser)
        if (loggedInUser.data.success) {
          this.user=loggedInUser.data
        } else {
          this.message='incorrect username or password'
        }
        resolve(loggedInUser.data);
      })
    })
  }
  logout() {
    axios.get('/logout').then((res)=> {
      console.log(res);
      if (res) { 
        this.user = null;  
        sessionStorage.removeItem('user');
      }  else {
        console.log('undefined');
      }
    }, function(err){
      console.log(err);
    });
   
  }
}
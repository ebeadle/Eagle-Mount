import { extendObservable } from 'mobx';
var axios = require('axios');



export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: {},
      success: null,
      get retrieveUser() {
        return this.user
      }
    })
    this.signUpUser = this.signUpUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  signUpUser(newUserObj) {
    return new Promise((resolve, reject) => {
      axios.post("/signup",
        {
          firstName: newUserObj.firstName,
          lastName: newUserObj.lastName,
          email: newUserObj.email,
          password: newUserObj.password,
          skill: newUserObj.skill,
          message: newUserObj.message
        }
      ).then((userObj) => {
        if (userObj.data) {
          this.user = userObj.data
        } else {
          console.log("user add failed");
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
          currentUser: loggedInUser.data
        } else {
          console.log('incorrect username or password')
        }
        resolve(loggedInUser.data);
      })
    })
  }
}
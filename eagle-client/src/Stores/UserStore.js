import { extendObservable } from 'mobx';
var axios = require('axios');



export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: {},
      message: "null",
      get retrieveUser() {
        return this.user
      }
    })
    this.signUpUser = this.signUpUser.bind(this);
    console.log(this.user);
  }

  signUpUser(newUserObj) {
    return new Promise((resolve, reject) => {
      axios.post("/signup",
        {
          firstName: newUserObj.firstName,
          lastName: newUserObj.lastName,
          email: newUserObj.email,
          password: newUserObj.password,
          skill: newUserObj.skill
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
}
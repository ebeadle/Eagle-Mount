import {extendObservable} from 'mobx';
var axios = require('axios');



export default class UserStore {
  constructor(){
    extendObservable(this, {
      user: null,
      message: null
    })
  }
}
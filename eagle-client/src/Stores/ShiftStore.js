import { extendObservable } from 'mobx';
var axios = require('axios');


export default class ShiftStore {
  constructor() {
    extendObservable(this, {
      shift: [],
      success: null,
      get retrieveShift() {
        return this.shift
      }
    })
    this.addNewShift = this.addNewShift.bind(this);
    this.fetchShift = this.fetchShift.bind(this);
    
  }

  addNewShift(newShiftObj) {
    return new Promise((resolve, reject) => {
      axios.post("/open-shifts",
        {
          date: newShiftObj.date,
          day: newShiftObj.day,
          skill: newShiftObj.skill,
          claimed: newShiftObj.claimed,
          time: newShiftObj.time
        }
      ).then((shiftObj) => {
        if (shiftObj.data) {
          this.shift = shiftObj.data
        } else {
          console.log("shift add failed");
          reject(shiftObj);
        }
        console.log(shiftObj);
        resolve(shiftObj);
      })
    })
  }

  fetchShift(shiftObj){
    console.log('fetching shift')
    return new Promise((resolve, reject) => {
      axios.get('/shift').then((shiftObj) => {
      console.log(shiftObj)
      console.log('^^^^^^^^^^^')
  if (shiftObj.data) {
    console.log(shiftObj.data);
    this.shift = shiftObj.data;
  } else {
    console.log('undefined')
    reject(shiftObj);
  }
  resolve(shiftObj);
    }).catch(function (err){
      console.log(err)
    })
  })
}


  
  
  

}



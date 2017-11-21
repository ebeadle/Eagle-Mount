import { extendObservable, action } from 'mobx';
var axios = require('axios');


export default class ShiftStore {
  constructor() {
    extendObservable(this, {
      shifts: [],
      success: null,
      selectedShift: {},
      modalPopUp: false,
      setShift: action((selectedShift)=>{
        this.selectedShift = selectedShift
      }),
      get retrieveShift() { //this used to have just this.shift but it didn't render. Mobx wants the data filtered?
      return this.shifts.map((s)=> {
          return s
        })
      }
    })
    this.addNewShift = this.addNewShift.bind(this);
    this.fetchShifts = this.fetchShifts.bind(this);
  }

  addNewShift(newShiftObj) {
    return new Promise((resolve, reject) => {
      console.log(newShiftObj);
      axios.post("/open-shifts",
        {
          date: newShiftObj.date,
          time: newShiftObj.time,
          title: newShiftObj.title,
          start: newShiftObj.date
        }
      ).then((shiftObj) => {
        if (shiftObj.data) {
          axios.get("/shift").then((shiftObj) =>{
            console.log(shiftObj);
            this.shifts = shiftObj.data
          })
        } else {
          console.log("shift add failed");
          reject(shiftObj);
        }
        console.log(shiftObj);
        resolve(shiftObj);
      })
    })
  }
  

  fetchShifts(shiftObj){
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



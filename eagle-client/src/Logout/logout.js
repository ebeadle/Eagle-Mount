import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

var Logout = observer(class Logout extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.userStore.logout();
  }
  render () {
    return (
      <div><p>You have logged out.</p></div>
    );
  }
});
export default withRouter(inject('userStore')(Logout));

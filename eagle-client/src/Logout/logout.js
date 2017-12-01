import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

var Logout = observer(class Logout extends Component {

  componentDidMount() {
    this.props.userStore.logout();
    this.props.history.push('/'); 
  }
  render () {
    return (
      <div><p>You have logged out.</p></div>
    );
  }
});
export default withRouter(inject('userStore')(Logout));

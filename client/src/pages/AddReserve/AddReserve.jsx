import React, { Component } from 'react';
import ReserveForm from './components/ReserveForm';

export default class AddReserve extends Component {
  render() {
    return (
      <div>
        <ReserveForm push={this.props.history.push}/>
      </div>
    );
  }
}

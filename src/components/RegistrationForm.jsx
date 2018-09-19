import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RegistrationForm extends Component {
  render() {
    return (
      <div className="registration-form">
        <div className="form-row">
          <span>
            First Name
          </span>
          <div className="field">
            <input id="firstName" type="text" />
          </div>
        </div>
      </div>
    );
  }
}


const TextInputField = props => (
  <div className="field">
    <input type="text" onChange={props.onChange} />
  </div>
);

TextInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
}
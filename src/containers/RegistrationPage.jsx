import React, { Component } from 'react';

export default class RegistrationPage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            formValid: true
        };
    }

    render() {
        return <div>{this.state.formValid}</div>;
    }
}

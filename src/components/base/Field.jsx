import React, { Component } from 'react';

export default class Field extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            value: props.value
        };
        this.onChange = this.onChange.bind( this );
    }

    get hasError() {
        return this.props.error;
    }

    get classNames() {
        const additionalClasses = this.props.additionalClassNames || [];
        return [
            'form-control',
            'col-4',
            this.hasError ? 'is-invalid' : '',
            ...additionalClasses
        ].join( ' ' );
    }

    onChange( event ) {
        this.setState( {
            value: event.target.value
        } );
        this.props.updateCallback(
            this.props.name,
            this.state.value
        );
    }

    render() {
        return <input
            className={this.classNames}
            value={this.state.value}
            onChange={this.onChange}/>;
    }
}
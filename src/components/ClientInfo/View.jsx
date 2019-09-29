import React, { Component } from 'react';

export default class ClientInfoView extends Component {
    render() {
        return (
            <div className='row'>
                <dl className='col-6'>
                    <dt>First name:</dt>
                    <dd>{this.props.firstName}</dd>
                    <dt>Last name:</dt>
                    <dd>{this.props.lastName}</dd>
                    <dt>Reg code:</dt>
                    <dd>{this.props.regCode}</dd>
                </dl>
                <dl className='col-6'>
                    <dt>Phone:</dt>
                    <dd>{this.props.phone}</dd>
                    <dt>Address:</dt>
                    <dd>{this.props.address}</dd>
                    <dt>E-mail</dt>
                    <dd>{this.props.email}</dd>
                </dl>
            </div>
        );
    }
}
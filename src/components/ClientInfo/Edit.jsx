import React, { Component } from 'react';

export default class ClientInfoEdit extends Component {
    render() {
        return (
            <div className='row form-group'>
                <dl className='col-6'>
                    <dt>First name:</dt>
                    <dd>
                        <input type='text'
                            value={this.props.firstName}
                            className='form-control col-4'/>
                    </dd>
                    <dt>Last name:</dt>
                    <dd>
                        <input type='text'
                            value={this.props.lastName}
                            className='form-control col-4'/>
                    </dd>
                    <dt>Reg code:</dt>
                    <dd>
                        <input type='text'
                            value={this.props.regCode}
                            className='form-control col-4'/>
                    </dd>
                </dl>
                <dl className='col-6'>
                    <dt>Phone:</dt>
                    <dd>
                        <input type='text'
                            value={this.props.phone}
                            className='form-control col-4'/>
                    </dd>
                    <dt>Address:</dt>
                    <dd>
                        <input type='text'
                            value={this.props.address}
                            className='form-control col-4'/>
                    </dd>
                    <dt>E-mail</dt>
                    <dd>
                        <input type='email'
                            value={this.props.email}
                            className='form-control col-4'/>
                    </dd>
                </dl>
            </div>
        );
    }
}
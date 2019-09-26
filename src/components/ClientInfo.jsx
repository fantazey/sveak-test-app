import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ClientInfo extends Component {
    render() {
        return (
            <div>
                <dl className='col-6'>
                    <dt>First name:</dt>
                    <dd>{this.props.client.firstName}</dd>
                    <dt>Last name:</dt>
                    <dd>{this.props.client.lastName}</dd>
                    <dt>Reg code:</dt>
                    <dd>{this.props.client.regCode}</dd>
                </dl>
                <dl className='col-6'>
                    <dt>Phone:</dt>
                    <dd>{this.props.client.phone}</dd>
                    <dt>Address:</dt>
                    <dd>{this.props.client.address}</dd>
                </dl>
            </div>
        );
    }
}

function mapStateToProps( state, props ) {
    const client = state.ClientsReducer.currentClient;
    return { client: client };
}

export default connect( mapStateToProps, null )( ClientInfo );
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ClientInfo extends Component {
    render() {
        if ( !this.props.client ) {
            return null;
        }
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

const mapStateToProps = ( { ClientsReducer: state } ) => {
    debugger;
    return {
        client: state.currentClient
    };
};

export default connect( mapStateToProps, null )( ClientInfo );
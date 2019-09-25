import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientsReducer from '../reducers/clients';

export class ClientInfo extends Component {
    render() {    
        return (
            <div>
              test client data
            </div>
        );
    }
}

function mapStateToProps( state, props ) {
    const client = state.ClientsReducer.clients || [];
    return { clients: [ ...list ] };
}

export default connect( mapStateToProps, null )( ClientTable );
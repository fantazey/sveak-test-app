import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientRow from '../components/ClientRow';
import ClientsReducer from '../reducers/clients';

export class ClientTable extends Component {
    render() {
        if ( !this.props.clients ) {
            return null;
        }
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.clients.map( ( client, index ) =>
                            <ClientRow key={`client-row-${index}`} client={client}/>
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps( state, props ) {
    const list = state.ClientsReducer.clients || [];
    return { clients: [ ...list ] };
}

export default connect( mapStateToProps, null )( ClientTable );
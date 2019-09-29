import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientTable from '../components/ClientTable';
import { fetchClientsList } from '../actions/clients';
import { Loader } from './base/Loader';

class ClientsPage extends Loader {
    get whenLoaded() {
        return <ClientTable/>;
    }
}

const mapStateToProps = ( { ClientsReducer: state } ) => ( {
    pending: state.pending
} );

const mapDispatchToProps = dispatch => bindActionCreators( {
    fetchData: fetchClientsList
}, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ClientsPage );

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClient } from '../actions/clients';
import ClientInfo from '../components/ClientInfo';
import { Loader } from './base/Loader';

class ClientPage extends Loader {
    fetchData() {
        this.props.fetchData(
            this.props.match.params.id
        );
    }

    get whenLoaded() {
        return <ClientInfo/>;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
    fetchData: fetchClient
}, dispatch );

const mapStateToProps = ( { ClientsReducer: state } ) => ( {
    pending: state.pending
} );

export default connect( mapStateToProps, mapDispatchToProps )( ClientPage );
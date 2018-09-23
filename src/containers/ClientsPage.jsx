import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientTable from '../components/ClientTable';
import { loadClients } from '../actions/clients';

class ClientsPage extends Component {
    componentDidMount() {
        this.props.loadClients();
    }

    render() {
        return (
            <div className='page-content'>
                <ClientTable/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
    loadClients
}, dispatch );

export default connect( '', mapDispatchToProps )( ClientsPage );

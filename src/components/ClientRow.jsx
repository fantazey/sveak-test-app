import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { deleteClient } from '../actions/clients';

class ClientRow extends Component {
    get client() {
        return this.props.client;
    }

    get fullName() {
        return [ this.client.lastName, this.client.firstName ].join( '' );
    }

    viewClick( e ) {
        e.preventDefault();
        this.props.changePage( `user/${this.client.id}/info` );
    }

    deleteClick( e ) {
        e.preventDefault();
        this.props.deleteClient( this.client.id );
    }

    commentsClick( e ) {
        e.preventDefault();
        this.props.changePage( `user/${this.client.id}/comments` );
    }

    render() {
        return <tr>
            <td>{this.fullName}</td>
            <td>{this.client.phone}</td>
            <td>{this.client.address}</td>
            <td>
                <button className='btn btn-info mx-1'
                    onClick={this.viewClick.bind( this )}>
                    View
                </button>
                <button className='btn btn-info mx-1'
                    onClick={this.commentsClick.bind( this )}>
                    Comments
                </button>
                <button className='btn btn-warning mx-1'
                    onClick={this.deleteClick.bind( this )}>
                    Delete
                </button>
            </td>
        </tr>;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
    deleteClient,
    changePage: ( path ) => push( path )
}, dispatch );

export default connect( null, mapDispatchToProps )( ClientRow );
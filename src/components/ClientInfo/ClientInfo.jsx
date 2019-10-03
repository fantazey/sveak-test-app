import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientInfoView from './View';
import ClientInfoEdit from './Edit';

export class ClientInfo extends Component {
    constructor() {
        debugger;
        super( ...arguments );
        this.toggleMode = this.toggleMode.bind( this );
        this.state = {
            isEditMode: false
        };
    }

    toggleMode() {
        this.setState( {
            isEditMode: !this.state.isEditMode
        } );
    }

    get componentForMode() {
        if ( this.state.isEditMode ) {
            return <ClientInfoEdit {...this.propsForComponent}/>;
        }
        return <ClientInfoView {...this.propsForComponent}/>;
    }

    get propsForComponent() {
        return {
            firstName: this.client.firstName,
            lastName: this.client.lastName,
            regCode: this.client.regCode,
            phone: this.client.phone,
            address: this.client.address,
            email: this.client.email
        };
    }

    get client() {
        return this.props.client;
    }

    render() {
        if ( !this.client ) {
            return null;
        }
        return (
            <div className='card mt-4'>
                <div className='card-header'>
                    {this.client.lastName}&nbsp;{this.client.firstName}
                    <span className='float-right btn-link' onClick={this.toggleMode}>
                        {this.state.isEditMode ? 'cancel' : 'edit'}
                    </span>
                </div>
                <div className='card-body'>
                    {this.componentForMode}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( { ClientsReducer: state } ) => {
    return {
        client: state.currentClient
    };
};

export default connect( mapStateToProps, null )( ClientInfo );
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateClient } from '../../actions/clients';
import Field from '../base/Field';
import FailIndicator from '../base/FailIndicator';
import SuccessIndicator from '../base/SuccessIndicator';

export class ClientInfoEdit extends Component {
    get fieldList() {
        return [
            'firstName', 'lastName', 'regCode',
            'email', 'phone', 'address'
        ];
    }

    constructor( props ) {
        super( props );
        this.fieldUpdate = this.fieldUpdate.bind( this );
        this.submit = this.submit.bind( this );
        const fieldErrors = props.error && props.error.fields || {};

        const state = {};
        this.fieldList.forEach( key => {
            state[ key ] = props[ key ];
            state[ `${key}Error` ] = fieldErrors[ key ];
        } );
        this.state = state;
    }

    submit() {
        this.props.updateClient( this.props.id, this.state );
    }

    get alert() {
        if ( this.props.operationSuccess === false ) {
            return <FailIndicator text={this.props.error.error} />;
        }
        if ( this.props.operationSuccess === true ) {
            return <SuccessIndicator/>;
        }
    }

    fieldUpdate( fieldName, value ) {
        this.setState( {
            [ fieldName ]: value,
            [ `${fieldName}Error` ]: false
        } );
    }

    render() {
        return (
            <Fragment>
                {this.alert}
                <div className='row form-group'>
                    <dl className='col-6'>
                        <dt>First name:</dt>
                        <dd>
                            <Field
                                value={this.state.firstName}
                                name={'firstName'}
                                error={this.state.firstNameError}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>Last name:</dt>
                        <dd>
                            <Field
                                value={this.state.lastName}
                                name={'lastName'}
                                error={this.state.lastNameError}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>Reg code:</dt>
                        <dd>
                            <Field
                                value={this.state.regCode}
                                name={'regCode'}
                                error={this.state.regCodeError}
                                updateCallback={this.fieldUpdate} />
                        </dd>
                    </dl>
                    <dl className='col-6'>
                        <dt>Phone:</dt>
                        <dd>
                            <Field
                                value={this.state.phone}
                                name={'phone'}
                                error={this.state.phoneError}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>Address:</dt>
                        <dd>
                            <Field
                                value={this.state.address}
                                name={'address'}
                                error={this.state.addressError}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>E-mail</dt>
                        <dd>
                            <Field
                                value={this.state.email}
                                name={'email'}
                                error={this.state.emailError}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt></dt>
                        <dd>
                            <button className='btn-primary col-4' onClick={this.submit}>
                                Save
                            </button>
                        </dd>
                    </dl>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
    updateClient: updateClient
}, dispatch );

const mapStateToProps = ( { ClientsReducer: state } ) => ( {
    id: state.currentId,
    error: state.error,
    operationSuccess: state.operationSuccess
} );

export default connect( mapStateToProps, mapDispatchToProps )( ClientInfoEdit );
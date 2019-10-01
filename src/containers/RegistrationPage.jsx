import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { createClient } from '../actions/clients';
import { connect } from 'react-redux';
import Field from '../components/base/Field';
import LoadingIndicator from '../components/base/LoadingIndicator';
import SuccessIndicator from '../components/base/SuccessIndicator';
import FailIndicator from '../components/base/FailIndicator';

export class RegistrationPage extends Component {
    constructor( props ) {
        super( props );
        this.submit = this.submit.bind( this );
        this.fieldUpdate = this.fieldUpdate.bind( this );
        this.state = {
            formValid: true,
            firstName: '',
            lastName: '',
            regCode: ''
        };
    }

    get alert() {
        if ( this.props.operationSuccess === true ) {
            return <SuccessIndicator/>;
        }
        if ( this.props.operationSuccess === false ) {
            return <FailIndicator/>;
        }
        return null;
    }

    fieldUpdate( fieldName, value ) {
        this.setState( {
            [ fieldName ]: value
        } );
    }

    submit() {
        this.props.createClient( {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            regCode: this.state.regCode
        } );
    }

    render() {
        if ( this.props.pending ) {
            return <LoadingIndicator/>;
        }
        return (
            <Fragment>
                {this.alert}
                <div className='card mt-4'>

                    <div className='card-header'>
                        New User
                    </div>
                    <div className='card-body'>
                        <div className='row form-group'>
                            <dl className='col-6'>
                                <dt>First name:</dt>
                                <dd>
                                    <Field
                                        value={this.state.firstName}
                                        name={'firstName'}
                                        updateCallback={this.fieldUpdate}/>
                                </dd>
                                <dt>Last name:</dt>
                                <dd>
                                    <Field
                                        value={this.state.lastName}
                                        name={'lastName'}
                                        updateCallback={this.fieldUpdate}/>
                                </dd>
                                <dt>Reg code:</dt>
                                <dd>
                                    <Field
                                        value={this.state.regCode}
                                        name={'regCode'}
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
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ( { ClientsReducer: state } ) => {
    return {
        error: state.error,
        pending: state.pending,
        operationSuccess: state.operationSuccess
    };
};

const mapDispatchToProps = dispatch => bindActionCreators( {
    createClient: createClient
}, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( RegistrationPage );
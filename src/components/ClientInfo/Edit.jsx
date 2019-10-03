import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateClient } from '../../actions/clients';
import Field from '../base/Field';
import FailIndicator from '../base/FailIndicator';
import SuccessIndicator from '../base/SuccessIndicator';

export class ClientInfoEdit extends Component {
    constructor( props ) {
        super( props );
        this.fieldUpdate = this.fieldUpdate.bind( this );
        this.submit = this.submit.bind( this );
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            regCode: props.regCode,
            email: props.email,
            phone: props.phone,
            address: props.address
        };
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
            [ fieldName ]: value
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
                                updateCallback={this.fieldUpdate} />
                        </dd>
                    </dl>
                    <dl className='col-6'>
                        <dt>Phone:</dt>
                        <dd>
                            <Field
                                value={this.state.phone}
                                name={'phone'}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>Address:</dt>
                        <dd>
                            <Field
                                value={this.state.address}
                                name={'address'}
                                updateCallback={this.fieldUpdate}/>
                        </dd>
                        <dt>E-mail</dt>
                        <dd>
                            <Field
                                value={this.state.email}
                                name={'email'}
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
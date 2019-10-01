import React, { Component } from 'react';
import LoadingIndicator from '../../components/base/LoadingIndicator';

export class Loader extends Component {
    constructor() {
        super( ...arguments );
        if ( !this.whenLoaded ) {
            throw Error( 'whenLoaded component is not defined' );
        }
    }

    fetchData() {
        this.props.fetchData();
    }

    componentDidMount() {
        if ( this.props.fetchData ) {
            this.fetchData();
        }
    }

    render() {
        return (
            <div className='page-content'>
                {this.props.pending ? <LoadingIndicator/> : this.whenLoaded}
            </div>
        );
    }
}
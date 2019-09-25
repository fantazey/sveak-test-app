import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadClient } from '../actions/clients';

class ClientPage extends Component {
	componentDidMount() {		
        this.props.loadClient(
        	this.props.match.params.id
    	);
    }

	render() {		
		return (
			<div className='page-content'>
				tra tra tr
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
    loadClient
}, dispatch );

export default connect( '', mapDispatchToProps )( ClientPage );
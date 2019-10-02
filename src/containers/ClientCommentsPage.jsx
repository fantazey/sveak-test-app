import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCommentsList } from '../actions/comments';
import { Loader } from './base/Loader';
import CommentsTable from '../components/Comments/Table';

class ClientCommentsPage extends Loader {

    fetchData() {
        this.props.fetchData(
            this.props.match.params.id
        );
    }

    get whenLoaded() {
        return <CommentsTable/>;
    }
}

const mapStateToProps = ( { CommentsReducer: state } ) => ( {
    pending: state.pending
} );

const mapDispatchToProps = dispatch => bindActionCreators( {
    fetchData: fetchCommentsList
}, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ClientCommentsPage );

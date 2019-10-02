import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsRow from './Row';

export class CommentsTable extends Component {
    get header() {
        return [
            this.props.client.lastName,
            this.props.client.firstName,
            'comments'
        ].join( ' ' );
    }

    render() {
        return <div className='card mt-4'>
            <div className='card-header'>
                {this.header}
            </div>
            <div className='card-body'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Comment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.comments.map( ( comment, index ) =>
                            <CommentsRow key={`comment-row-${index}`} comment={comment}/>
                        )}
                    </tbody>
                </table>
            </div>
        </div>;
    }
}

function mapStateToProps( { CommentsReducer, ClientsReducer } ) {
    return {
        client: ClientsReducer.currentClient,
        comments: CommentsReducer.comments.filter( x=> x.user === +ClientsReducer.currentId )
    };
}


export default connect( mapStateToProps, null )( CommentsTable );
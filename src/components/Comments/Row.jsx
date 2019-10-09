import React, { Component } from 'react';

export default class CommentsRow extends Component {
    get comment() {
        return this.props.comment;
    }

    get formatDate() {
        return this.comment.createdAt.format( 'DD MMM Y HH:mm' );
    }

    render() {
        return <tr className={this.comment.system ? 'bg-secondary' : ''}>
            <td className='text-nowrap'>
                {this.formatDate}
            </td>
            <td>
                {this.comment.comment}
            </td>
            <td>

            </td>
        </tr>;
    }
}
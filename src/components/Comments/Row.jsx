import React, { Component } from 'react';

export default class CommentsRow extends Component {
    get comment() {
        return this.props.comment;
    }

    get formatDate() {
        const date = this.comment.createdAt;
        const dateStr = `${date.getDate()}-${1 + date.getMonth()}-${date.getFullYear()}`;
        const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${dateStr} ${timeStr}`;
    }

    render() {
        return <tr className={this.comment.system ? 'bg-secondary' : ''}>
            <td className='text-nowrap'>
                {this.formatDate}
            </td>
            <td>
                {this.props.comment.message}
            </td>
            <td>

            </td>
        </tr>;
    }
}
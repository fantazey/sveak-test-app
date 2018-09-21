import React, { Component } from 'react';

export default class ClientsPage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            page: 1
        };
    }
    render() {
        return (
            <div className='page-content'>
                <div className='table-wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td />
                                <td />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='pagination'>{this.state.page}</div>
            </div>
        );
    }
}

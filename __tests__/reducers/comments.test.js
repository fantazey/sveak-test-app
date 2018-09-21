import commentsReducer, { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../../src/reducers/comments';

const initState = {
    comments: {
        1: {
            id: 1, client_id: 1, comment: 'asd', type: 'info'
        },
        3: {
            id: 3, client_id: 1, comment: 'Test comment', type: 'warning'
        }
    },
    commentsIds: [ 1, 3 ]
};

describe( 'comments reducer', () => {
    it( 'return same state on unknown action', () => {
        const state = commentsReducer( initState, { type: 'ERR', data: '1' } );
        expect( state ).toEqual( initState );
    } );

    it( 'add new comment', () => {
        const commentData = {
            client_id: 1,
            comment: 'New comment for test',
            type: 'info'
        };
        const state = commentsReducer( initState, { type: ADD_COMMENT, data: commentData } );
        const newLength = state.commentsIds.length;
        const newLastId = state.commentsIds[ newLength - 1 ];
        expect( newLength ).toEqual( 3 );
        expect( newLastId ).toEqual( 4 );
        expect( state.comments[ newLastId ] ).toEqual( {
            id: newLastId,
            ...commentData
        } );
    } );

    it( 'edit existed comment', () => {
        const commentId = 3;
        const updateData = {
            id: 3,
            client_id: 1,
            comment: 'updated comment text',
            type: 'info'
        };
        const len = initState.commentsIds.length;
        const state = commentsReducer(
            initState,
            { type: EDIT_COMMENT, id: commentId, data: updateData },
        );
        const updatedComment = state.comments[ commentId ];
        expect( updatedComment ).not.toBeFalsy();
        expect( updatedComment.comment ).toEqual( updateData.comment );
        expect( updatedComment.id ).toEqual( commentId );
        expect( state.commentsIds.length ).toEqual( len );
    } );

    it( 'edit nonexistent comment', () => {
        const commentId = 12;
        const updateData = {
            id: 3,
            client_id: 1,
            comment: 'updated comment text',
            type: 'info'
        };
        const state = commentsReducer(
            initState,
            { type: EDIT_COMMENT, id: commentId, data: updateData },
        );
        expect( state ).toEqual( initState );
    } );

    it( 'delete existed comment', () => {
        const commentId = 1;
        const state = commentsReducer( initState, { type: DELETE_COMMENT, id: commentId } );
        expect( state.commentsIds.length ).not.toEqual( initState.commentsIds.length );
        expect( state.comments ).not.toEqual( initState.comments );
        expect( state.commentsIds ).not.toContain( commentId );
        expect( state.comments[ commentId ] ).toBeFalsy();
    } );

    it( 'delete nonexistent comment', () => {
        const state = commentsReducer( initState, { type: DELETE_COMMENT, id: 123 } );
        expect( state.comments ).toEqual( initState.comments );
        expect( state.commentsIds ).toEqual( initState.commentsIds );
    } );
} );

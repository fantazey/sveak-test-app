import {
    FETCH_COMMENTS_LIST_FAIL,
    FETCH_COMMENTS_LIST_PENDING,
    FETCH_COMMENTS_LIST_SUCCESS
} from '../actions/comments';
export const ADD_COMMENT = 'comments/ADD_COMMENT';
export const EDIT_COMMENT = 'comments/EDIT_COMMENT';
export const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const initialState = {
    pending: true,
    comments: [],
    operationSuccess: null,
    error: null
};

function fetchCommentsListHandler( state, commentsList ) {
    const comments = commentsList.map( x => ( {
        ...x,
        createdAt: new Date( x.createdAt )
    } ) );
    return {
        ...state,
        comments: [].concat( state.comments, comments ),
        pending: false
    };
}

export default ( state = initialState, action ) => {
    switch ( action.type ) {
    case FETCH_COMMENTS_LIST_PENDING:
        return {
            ...state,
            pending: true
        };
    case FETCH_COMMENTS_LIST_SUCCESS:
        return fetchCommentsListHandler( state, action.comments );
    case FETCH_COMMENTS_LIST_FAIL:
        return {
            ...state,
            error: action.error,
            pending: false
        };
    default:
        return state;
    }
};

import moment from 'moment';
import { LOCATION_CHANGE } from 'connected-react-router';
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

function fetchCommentsListHandler( state, user, commentsList ) {
    const allComments = state.comments.filter( x => x.user !== user );
    const comments = commentsList.map( x => ( {
        ...x,
        createdAt: moment( x.createdAt )
    } ) );
    return {
        ...state,
        comments: [].concat( allComments, comments ),
        pending: false
    };
}

export default ( state = initialState, action ) => {
    switch ( action.type ) {
    case LOCATION_CHANGE:
    case FETCH_COMMENTS_LIST_PENDING:
        return {
            ...state,
            pending: true
        };
    case FETCH_COMMENTS_LIST_SUCCESS:
        return fetchCommentsListHandler( state, action.user, action.comments );
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

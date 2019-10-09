import { API_PATH } from '../confg';
import { fetchClient, makeRequest } from './clients';

export const FETCH_COMMENTS_LIST_PENDING = 'comments/FETCH_COMMENTS_LIST_PENDING';
export const FETCH_COMMENTS_LIST_SUCCESS = 'comments/FETCH_COMMENTS_LIST_SUCCESS';
export const FETCH_COMMENTS_LIST_FAIL = 'comments/FETCH_COMMENTS_LIST_FAIL';

function fetchCommentsListPending() {
    return {
        type: FETCH_COMMENTS_LIST_PENDING
    };
}
function fetchCommentsListSuccess( user, list ) {
    return {
        type: FETCH_COMMENTS_LIST_SUCCESS,
        user: user,
        comments: list
    };
}
function fetchCommentsListFail( error ) {
    return {
        type: FETCH_COMMENTS_LIST_FAIL,
        error
    };
}
export function fetchCommentsList( id, limit = 10, offset = 0 ) {
    return dispatch => {
        dispatch( fetchCommentsListPending() );
        dispatch( fetchClient( id ) ).then( () => {
            const url = `${API_PATH}/clients/${id}/comments?limit=${limit}&offset=${offset}`;
            return makeRequest( url, {} ).then( res => {
                dispatch( fetchCommentsListSuccess( +id, res.comments ) );
            } ).catch( err => {
                dispatch( fetchCommentsListFail( err ) );
            } );
        } );
    };
}
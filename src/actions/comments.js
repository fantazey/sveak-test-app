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
function fetchCommentsListSuccess( list ) {
    return {
        type: FETCH_COMMENTS_LIST_SUCCESS,
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
        return fetchClient( id ).then( () => {
            dispatch( fetchCommentsListPending() );
            const url = `${API_PATH}/clients/${id}/comments?limit=${limit}&offset=${offset}`;
            makeRequest( url, {} ).then( res => {
                dispatch( fetchCommentsListSuccess( res.comments ) );
            } ).catch( err => {
                dispatch( fetchCommentsListFail( err ) );
            } );
        } );
    };
}
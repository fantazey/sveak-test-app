export const ADD_COMMENT = 'comments/ADD_COMMENT';
export const EDIT_COMMENT = 'comments/EDIT_COMMENT';
export const DELETE_COMMENT = 'comments/DELETE_COMMENT';

function addComment(state, data) {
  const comments = { ...state.comments };
  const commentsIds = [...state.commentsIds];
  const lastId = state.commentsIds[state.commentsIds.length - 1];
  const newId = lastId + 1;
  comments[newId] = {
    id: newId,
    ...data,
  };
  commentsIds.push(newId);
  return {
    comments, commentsIds,
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return addComment(state, action.data);
    default:
      return state;
  }
};

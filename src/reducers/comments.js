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

function updateComment(state, id, data) {
  const comments = { ...state.comments };
  const commentsIds = [...state.commentsIds];
  if (!comments[id]) {
    return {
      comments, commentsIds,
    };
  }
  comments[id] = Object.assign(comments[id], data);
  return {
    comments, commentsIds,
  };
}

function deleteComment(state, id) {
  const comments = { ...state.comments };
  const commentsIds = [...state.commentsIds];
  if (!comments[id]) {
    return { comments, commentsIds };
  }
  delete comments[id];
  if (commentsIds.indexOf(id) >= 0) {
    commentsIds.splice(commentsIds.indexOf(id), 1);
  }
  return { comments, commentsIds };
}

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return addComment(state, action.data);
    case EDIT_COMMENT:
      return updateComment(state, action.id, action.data);
    case DELETE_COMMENT:
      return deleteComment(state, action.id);
    default:
      return state;
  }
};

import commentsReducer, { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './comments';

const initState = {
  comments: {
    1: {
      id: 1, client_id: 1, comment: 'asd', type: 'info',
    },
    3: {
      id: 3, client_id: 1, comment: 'Test comment', type: 'warning',
    },
  },
  commentsIds: [1, 3],
};

describe('comments reducer', () => {
  it('return same state on unknown action', () => {
    const state = commentsReducer(initState, { type: 'ERR', data: '1' });
    expect(state).toEqual(initState);
  });

  it('add new comment', () => {
    const commentData = {
      client_id: 1,
      comment: 'New comment for test',
      type: 'info',
    };
    const state = commentsReducer(initState, { type: ADD_COMMENT, data: commentData });
    const newLength = state.commentsIds.length;
    const newLastId = state.commentsIds[newLength - 1];
    expect(newLength).toEqual(3);
    expect(newLastId).toEqual(4);
    expect(state.comments[newLastId]).toEqual({
      id: newLastId,
      ...commentData,
    });
  });
});

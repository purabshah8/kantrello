import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment,
  };
};

export const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    commentId: id,
  };
};

export const receiveCommentErrors = errors => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors,
  };
};

export const fetchComments = cardId => dispatch => {
  return CommentApiUtil.fetchComments(cardId).then(
    comments => dispatch(receiveComments(comments)),
    errors => dispatch(receiveCommentErrors(errors))
  );
};

// export const fetchComment = id => dispatch => {
//   return CommentApiUtil.fetchComment(id).then(
//     comment => dispatch(receiveComment(comment)),
//     errors => dispatch(receiveCommentErrors(errors))
//   );
// };

export const createComment =  comment => dispatch => {
  return CommentApiUtil.createComment(comment).then(
    newComment => dispatch(receiveComment(newComment)),
    errors => dispatch(receiveCommentErrors(errors))
  );
};

export const updateComment =  comment => dispatch => {
  return CommentApiUtil.updateComment(comment).then(
    updatedComment => dispatch(receiveComment(updatedComment)),
    errors => dispatch(receiveCommentErrors(errors))
  );
};

export const deleteComment = id => dispatch => {
  return CommentApiUtil.deleteComment(id).then(
    comment => dispatch(removeComment(comment.id)),
    errors => dispatch(receiveCommentErrors(errors))
  );
};

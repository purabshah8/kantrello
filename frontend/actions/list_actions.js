import * as ListApiUtil from '../util/list_api_util';

export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const RECEIVE_LIST_ERRORS = 'RECEIVE_LIST_ERRORS';

export const receiveLists = lists => {
  return {
    type: RECEIVE_LISTS,
    lists
  };
};

export const receiveList = list => {
  return {
    type: RECEIVE_LIST,
    list,
  };
};

export const removeList = id => {
  return {
    type: REMOVE_LIST,
    listId: id,
  };
};

export const receiveListErrors = errors => {
  return {
    type: RECEIVE_LIST_ERRORS,
    errors,
  };
};

export const fetchLists = id => dispatch => {
  return ListApiUtil.fetchLists(id).then(
    lists => dispatch(receiveLists(lists)),
    errors => dispatch(receiveListErrors(errors))
  );
};

export const fetchList = id => dispatch => {
  return ListApiUtil.fetchList(id).then(
    list => dispatch(receiveList(list)),
    errors => dispatch(receiveListErrors(errors))
  );
};

export const createList =  list => dispatch => {
  return ListApiUtil.createList(list).then(
    newList => dispatch(receiveList(newList)),
    errors => dispatch(receiveListErrors(errors))
  );
};

export const updateList =  list => dispatch => {
  return ListApiUtil.updateList(list).then(
    updatedList => dispatch(receiveList(updatedList)),
    errors => dispatch(receiveListErrors(errors))
  );
};

export const deleteList = id => dispatch => {
  return ListApiUtil.deleteList(id).then(
    list => dispatch(removeList(list.id)),
    errors => dispatch(receiveListErrors(errors))
  );
};

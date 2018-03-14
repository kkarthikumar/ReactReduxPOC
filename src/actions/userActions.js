import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users};
}

export function createUserSuccess(user) {
  return {type: types.CREATE_USER_SUCCESS, user};
}

export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function deleteUserSuccess(userId) {
  return {type: types.DELETE_USER_SUCCESS, userId};
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteUser(userId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return userApi.deleteUser(userId).then(users => {
      dispatch(deleteUserSuccess(userId));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.saveUser(user).then(user => {
      user.id ? dispatch(updateUserSuccess(user)) :
        dispatch(createUserSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

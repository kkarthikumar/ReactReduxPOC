import expect from 'expect';
import * as userActions from './userActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('User Actions', () => {
  describe('createUserSuccess', () => {
    it('should create a CREATE_USER_SUCCESS action', () => {
      //arrange
      const user = {name: 'Karthik'};
      const expectedAction = {
        type: types.CREATE_USER_SUCCESS,
        user: user
      };

      //act
      const action = userActions.createUserSuccess(user);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_USERS_SUCCESS when loading users', (done) => {
    // Here's an example call to nock.
    // nock('http://example.com/')
    //   .get('/users')
    //   .reply(200, { body: { user: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_USERS_SUCCESS, body: {users: [{name: 'Karthik'}]}}
    ];

    const store = mockStore({users: []}, expectedActions, done);
    store.dispatch(userActions.loadUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_USERS_SUCCESS);
      done();
    });
  });
});

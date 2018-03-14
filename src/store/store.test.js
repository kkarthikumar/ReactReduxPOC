import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as userActions from '../actions/userActions';

describe('Store', function() {
  it('Should handle creating users', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const user = {
      name: "Karthik"
    };

    // act
    const action = userActions.createUserSuccess(user);
    store.dispatch(action);

    // assert
    const actual = store.getState().users[0];
    const expected = {
      name: "Karthik"
    };

    expect(actual).toEqual(expected);
  });
});

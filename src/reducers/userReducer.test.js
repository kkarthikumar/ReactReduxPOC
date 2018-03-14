import expect from 'expect';
import userReducer from './userReducer';
import * as actions from '../actions/userActions';

describe('User Reducer', () => {
  it('should add user when passed CREATE_USER_SUCCESS', () => {
    // arrange
    const initialState = [
      {name: 'A'},
      {name: 'B'}
    ];

    const newUser = {name: 'C'};

    const action = actions.createUserSuccess(newUser);

    //act
    const newState = userReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual('A');
    expect(newState[1].name).toEqual('B');
    expect(newState[2].name).toEqual('C');
  });

  it('should update user when passed UPDATE_USER_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', name: 'A'},
      {id: 'B', name: 'B'},
      {id: 'C', name: 'C'}
    ];

    const user = {id: 'B', name: 'New Name'};
    const action = actions.updateUserSuccess(user);

    // act
    const newState = userReducer(initialState, action);
    const updatedUser = newState.find(a => a.id == user.id);
    const untouchedUser = newState.find(a => a.id == 'A');

    // assert
    expect(updatedUser.name).toEqual('New Name');
    expect(untouchedUser.name).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});

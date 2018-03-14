import React, {PropTypes} from 'react';
import UserListRow from './UserListRow';

const UserList = ({users}) => {
  return (
    <div className="divList">
     <h1>Users List</h1>                    
    <table className="table">     
      <tbody>
      {users.map(user =>
        <UserListRow key={user.id} user={user}/>
      )}
      </tbody>
    </table>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import '../../styles/styles.css'; //Webpack can import CSS files too!

const UserListRow = ({user}) => {
  return (
    <tr>
      <td className="circle"></td>
      <td>
        <Link className="linkContent" to={'/user/' + user.id}>{user.name}</Link>
      </td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;

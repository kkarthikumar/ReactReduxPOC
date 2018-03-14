import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import UserList from './UserList';
import {browserHistory} from 'react-router';
import UsersForm from './UsersForm';
import toastr from 'toastr';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

     this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      saving: false,
      deleting: false 
    };
        this.updateUserState = this.updateUserState.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        
  }

 componentWillReceiveProps(nextProps) {
        if (this.props.user.id !== nextProps.user.id) {
      // Necessary to populate form when existing user is loaded directly.
      this.setState({user: Object.assign({}, nextProps.user)});
          }
  }


  redirectToAddUserPage() {
    browserHistory.push('/user');
  }

 updateUserState(event) {
    const field = event.target.name;
    let user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    debugger;
    return this.setState({user: user});
  }

 userFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.user.name.length < 2) {
      errors.name = 'Name must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }
  
  redirectToSaveSucess() {
    this.setState({saving: false});
    toastr.success('User Added');
  const userLocal = {id: '', name: '', role: ''};
    this.setState({user: userLocal});    
    this.context.router.push('/users');
  }

  redirectToDeleteSucess() {  
    this.context.router.push('/users');    
    this.setState({deleting: false});
    toastr.success('User Deleted');  
     this.props.actions.loadUsers()
            .catch(error => {
              alert(error);
                toastr.error(error);
            });
  }

 clearUser(event) {
    event.preventDefault();
    browserHistory.push('/user');          
 }

  saveUser(event) {
    event.preventDefault();

    if (!this.userFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveUser(this.state.user)
      .then(() => this.redirectToSaveSucess())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

   deleteUser(event) {
    event.preventDefault();     
     if(confirm("Are you sure want to delete ?"))
    {    
    const userId=this.state.user.id;
    this.setState({deleting: true});
    const userLocal = {id: '', name: '', role: ''};
    this.setState({user: userLocal});  
    this.props.actions.deleteUser(userId)
      .then(() => this.redirectToDeleteSucess())
      .catch(error => {
        alert('error');
        toastr.error(error);
        this.setState({deleting: false});
      });
    }
  }

  render() {
    const {users} = this.props;
    return (
      <div className="container divWithBorder">       
        <div className="col-sm-3">
        <UserList  users={users}/>
          </div>
        <div className="col-sm-9 divForm">
        <hr/>
        <UsersForm
          onChange={this.updateUserState}
          onSave={this.saveUser}
          onClear={this.clearUser}
          onDelete={this.deleteUser}        
          user={this.state.user}
          errors={this.state.errors}
          saving={this.state.saving}
        />
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,  
  user: PropTypes.object.isRequired
};

UsersPage.contextTypes = {
  router: PropTypes.object
};

function getUserById(users, id) {
  const user = users.filter(user => user.id == id);
  if (user) return user[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
     const userId = ownProps.params.id; // from the path `/user/:id
  let user = {id: '', name: '', role: ''};

  if (userId !=='undefined' && userId && state.users.length > 0) {
    user = getUserById(state.users, userId);    
  }

  return {
    users: state.users,
     user: user
      };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UsersPage from './components/user/UsersPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UsersPage} />
    <Route path="users" component={UsersPage} />
    <Route path="user" component={UsersPage} />
    <Route path="user/:id" component={UsersPage} />
  </Route>
);

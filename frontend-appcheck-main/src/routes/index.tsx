import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import {SignUp, SignIn, Quests, Location, Employee, ListEmployee, Landing} from '../pages'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path= '/adm' component = {ListEmployee} isPrivate/>
    <Route path= '/func' component = {Employee} isPrivate/>
    <Route path= '/local' component = {Location} isPrivate/>
    <Route path= '/quest' component = {Quests} isPrivate/>
    <Route path= '/signup' component = {SignUp} isPrivate/>
    <Route path="/dashboard" component={Landing} isPrivate />
  </Switch>
);

export default Routes;

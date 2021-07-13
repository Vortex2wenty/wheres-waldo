import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import App from './App';
import departmentImg from 'images/department-store.jpeg';
import Level from '../components/Level';
import Leaderboards from '../components/Leaderboards'
import Leaderboard from '../components/Leaderboard';

const PropsLevel = () => (
  <Level img={departmentImg} />
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path='/' component={Navbar} />
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/levels/:level' component={PropsLevel} />
        <Route path='/leaderboards/:leaderboard' component={Leaderboard} />
        <Route path='/leaderboards' component={Leaderboards} />
      </Switch>
    </Router>,
    document.body.appendChild(document.createElement('div'))
  );
});

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import App from './App';
import Level from '../components/Level';
import Leaderboards from '../components/Leaderboards'
import Leaderboard from '../components/Leaderboard';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path='/' component={Navbar} />
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/levels/:level' component={Level} />
        <Route path='/leaderboards/:leaderboard' component={Leaderboard} />
        <Route path='/leaderboards' component={Leaderboards} />
      </Switch>
    </Router>,
    document.body.appendChild(document.createElement('div'))
  );
});

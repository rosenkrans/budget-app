import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Budgets from './components/Budgets.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Budgets}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Budgets from './components/Budgets.js'
import SingleBudget from './components/SingleBudget.js'
import Expenses from './components/Expenses.js'
import SingleExpense from './components/SingleExpense.js'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Budgets} />
          <Route path="/budgets/:budgetId" component={SingleBudget} />         
          <Route path="/expenses/:expenseId" component={SingleExpense} />
          <Route path="/expenses" component={Expenses} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

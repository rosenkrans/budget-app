import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Budgets from './components/Budgets.js'
import SingleBudget from './components/SingleBudget.js'
// import Expenses from './components/Expenses.js'
import SingleExpense from './components/SingleExpense.js'
import './App.css'
import SingleIncome from './components/SingleIncomes.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Budgets} />
          <Route path="/budgets/:budgetId/expenses/:expenseId" component={SingleExpense} />
          <Route path="/budgets/:budgetId/incomes/:incomeId" component={SingleIncome} />  
          <Route path="/budgets/:budgetId" component={SingleBudget} /> 
          {/* <Route path="/budgets/:budgetId/expenses" component={Expenses} /> */}            
          {/* <Route path="/expenses/:expenseId" component={SingleExpense} />
          <Route path="/expenses" component={Expenses} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

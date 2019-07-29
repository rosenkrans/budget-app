import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SimpleTable extends Component {
  
  state = {
    incomes: [],
    newIncome: {
      incomeName: '',
      income: '',
      incomeDate: ''
    },
    expenses: [],
    newExpense: {
        expenseName: '',
        estimatedAmount: '',
        actualPaidAmount: '',
        dueDate: '',
        paidDate: ''
        
    },
    isNewFormDisplayed: false,
    isIncomeFormDisplayed: false
}

  getAllExpensesByBudgetId = () => {
    axios.get(`/api/budgets/${this.props.budgetId}/expenses`)
      .then((res) => {
        this.setState({expenses: res.data})
      })
  }

  getAllIncomesByBudgetId = () => {
    axios.get(`/api/budgets/${this.props.budgetId}/incomes`)
      .then((res) => {
        this.setState({incomes: res.data})
      })
  }

  componentDidMount() {
    this.getAllIncomesByBudgetId()
    this.getAllExpensesByBudgetId()
  }

  handleToggleNewForm = () => {
    this.setState((state) => {
        return {isNewFormDisplayed: !state.isNewFormDisplayed}
    })
  }

  handleToggleIncomeForm = () => {
    this.setState((state) => {
      return {isIncomeFormDisplayed: !state.isIncomeFormDisplayed}
    })
  }

  handleInputChange = (event) => {
      const copiedExpense = {...this.state.newExpense}
      copiedExpense[event.target.name] = event.target.value 

      this.setState({newExpense: copiedExpense})
  }

  handleIncomeInputChange = (event) => {
    const copiedIncome = {...this.state.newIncome}
    copiedIncome[event.target.name] = event.target.value 

    this.setState({newIncome: copiedIncome})
  }

handleSubmit = (event) => {
  event.preventDefault()       
  axios.post(`/api/budgets/${this.props.budgetId}/expenses`, this.state.newExpense)
      .then(() => {
        this.setState({isNewFormDisplayed: false, newExpense: {
          expenseName: '',
          estimatedAmount: '',
          actualPaidAmount: '',
          dueDate: '',
          paidDate: ''
        }})
        this.getAllExpensesByBudgetId() 
      })
  }

  handleIncomeSubmit = (event) => {
      event.preventDefault()       
      axios.post(`/api/budgets/${this.props.budgetId}/incomes`, this.state.newIncome)
          .then(() => {
            this.setState({isIncomeFormDisplayed: false, newIncome: {
              
              incomeName: '',
          income: ''
            }})
            this.getAllIncomesByBudgetId() 
          })
  }

  render(){
    const incomeList=this.state.incomes.map((income) => {
      return(
        <TableRow>
          <TableCell><Link to={`/budgets/${this.props.budgetId}/incomes/${income._id}`}>{income.incomeName}</Link></TableCell>
          <TableCell align="right">{income.incomeDate}</TableCell>
          <TableCell align="right">{income.income}</TableCell>
        </TableRow>
      )
    })

    const sumOfIncome=this.state.incomes.reduce((acc, income) => {
      return(acc+income.income)
    },0)

    const sumOfEstimatedAmount=this.state.expenses.reduce((acc, estimated) => {
      return(acc+estimated.estimatedAmount)
    },0)
    const sumOfPaidExpenses=this.state.expenses.reduce((acc, paid) => {
      return(acc+paid.actualPaidAmount)
    },0)
  
    const expensesList=this.state.expenses.map((expense) => {
      return(
        <TableRow>
          <TableCell><Link to={`/budgets/${this.props.budgetId}/expenses/${expense._id}`}>{expense.expenseName}</Link></TableCell>
          <TableCell align="right">{expense.dueDate}</TableCell>
          <TableCell align="right">{expense.estimatedAmount}</TableCell>
          <TableCell align="right">{expense.paidDate}</TableCell>
          <TableCell align="right">{expense.actualPaidAmount}</TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <div>
          {this.state.isIncomeFormDisplayed
            ? <form onSubmit={this.handleIncomeSubmit}>
                <div className="income-info">
                  <label className="new-label" style={{color:'white'}} htmlFor="income-name">Income Name: </label>
                  <input 
                      type="text" 
                      name="incomeName" 
                      id="income-name" 
                      onChange={this.handleIncomeInputChange} 
                      value={this.state.newIncome.incomeName}
                  />

                    <label className="new-label" style={{color:'white'}} htmlFor="income-date">Due Date: </label>
                    <input 
                        type="date" 
                        name="incomeDate" 
                        id="income-date" 
                        onChange={this.handleIncomeInputChange} 
                        value={this.state.newIncome.incomeDate}
                    />

                  <label className="new-label" style={{color:'white'}} htmlFor="income-amount">Income Amount: </label>
                  <input 
                      type="text" 
                      name="income" 
                      id="income" 
                      onChange={this.handleIncomeInputChange} 
                      value={this.state.newIncome.income}
                  />
                </div>
                <div>
                  <input className="edit-submit-button" type="submit" value="Add Income" />
                </div>
                
              </form>

                  :<div>
                      <div>
                        <button className="create-income-button" 
                          onClick={this.handleToggleIncomeForm}>
                          New Income
                        </button>
                      </div>
                  </div>  
          }
        </div>


        <div>
          {this.state.isNewFormDisplayed
              ? <form onSubmit={this.handleSubmit}>

                  <div className="new-expense-form">
                    <div className="expense-name-due-est">
                    <label className="new-label" htmlFor="expense-name">Expense Name: </label>
                    <input 
                        type="text" 
                        name="expenseName" 
                        id="expense-name" 
                        className="new-field"
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.expenseName}
                    />

                    <label className="new-label" htmlFor="due-date">Due Date: </label>
                    <input 
                        type="date" 
                        name="dueDate" 
                        id="due-date" 
                        className="new-field"
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.dueDate}
                    />

                    <label className="new-label" htmlFor="estimated-amount">Estimated Amount: </label>
                    <input 
                        type="text" 
                        name="estimatedAmount" 
                        id="estimated-amount" 
                        className="new-field"
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.estimatedAmount}
                    />
                    </div>

                    <label className="new-label" htmlFor="paid-date">Paid Date: </label>
                    <input 
                        type="date" 
                        name="paidDate" 
                        id="paid-date" 
                        className="new-field"
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.paidDate}
                    />

                    <label className="new-label" htmlFor="actual-paid-amount">Actual Paid Amount: </label>
                    <input 
                        type="text" 
                        name="actualPaidAmount" 
                        id="actual-paid-amount" 
                        className="new-field"
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.actualPaidAmount}
                    />

                    <div>
                    <input className="edit-submit-button" type="submit" value="Add Expense" />
                    </div>
                  </div>
                </form>

                  :<div>
                      <div>
                        <button className="create-expense-button" 
                          onClick={this.handleToggleNewForm}>
                          Create New Expense
                        </button>
                      </div>
                  </div>
          }
      </div>

        <div className="income-table">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontSize:'16px', color:'black'}}>{[<strong>Income Name</strong>]} </TableCell>
                  <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Date Deposited</strong>]}</TableCell>
                  <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Income Amount</strong>]}</TableCell>            
                </TableRow>
              
              </TableHead>
              <TableBody>
                {incomeList}
                <TableRow>
                  <TableCell>{[<strong>Income Total</strong>]}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">$ {sumOfIncome}</TableCell>            
                </TableRow>
              </TableBody>          
            </Table>
          </Paper>

        </div>

        <div className="expense-table">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:'16px', color:'black'}}>{[<strong>Expense Name</strong>]}</TableCell>
                <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Date Due</strong>]}</TableCell>
                <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Estimated Amount</strong>]}</TableCell>
                <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Date Paid</strong>]}</TableCell>
                <TableCell style={{fontSize:'16px', color:'black'}} align="right">{[<strong>Amount Paid</strong>]}</TableCell>               
              </TableRow>
            
            </TableHead>
            <TableBody>
              {expensesList}
              <TableRow>
                <TableCell>{[<strong>Total</strong>]}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">$ {sumOfEstimatedAmount}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">$ {sumOfPaidExpenses}</TableCell>              
              </TableRow>
            </TableBody>          
          </Table>
        </Paper>
        </div>
        <div>
          <p><strong>Balance: </strong>${(sumOfIncome-sumOfPaidExpenses).toFixed(2)}</p>
        </div>
      </div>
    )
  } 
}




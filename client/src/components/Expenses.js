import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

export default class SimpleTable extends Component {
  
  state = {
    expenses: [],
    newExpense: {
        expenseName: '',
        estimatedAmount: '',
        actualPaidAmount: '',
        dueDate: '',
        paidDate: ''
    },
    isNewFormDisplayed: false
}

  getAllExpensesByBudgetId = () => {
    axios.get(`/api/budgets/${this.props.budgetId}/expenses`)
      .then((res) => {
        this.setState({expenses: res.data})
      })
  }

  componentDidMount() {
    this.getAllExpensesByBudgetId()
  }

  handleToggleNewForm = () => {
    this.setState((state) => {
        return {isNewFormDisplayed: !state.isNewFormDisplayed}
    })
  }

  handleInputChange = (event) => {
      const copiedExpense = {...this.state.newExpense}
      copiedExpense[event.target.name] = event.target.value 

      this.setState({newExpense: copiedExpense})
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

  render(){
    const sumOfEstimatedAmount=this.state.expenses.reduce((acc, estimated) => {
      return(acc+estimated.estimatedAmount)
    },0)
    const sumOfPaidExpenses=this.state.expenses.reduce((acc, paid) => {
      return(acc+paid.actualPaidAmount)
    },0)
    console.log(sumOfPaidExpenses)
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
        {this.state.isNewFormDisplayed
            ? <form onSubmit={this.handleSubmit}>

                <div className="new-expense-form">
                  <div className="expense-name-due-est">
                  <label htmlFor="expense-name">Expense Name: </label>
                  <input 
                      type="text" 
                      name="expenseName" 
                      id="expense-name" 
                      onChange={this.handleInputChange} 
                      value={this.state.newExpense.expenseName}
                  />

                  {/* <TextField 
                    id="expense-name"
                    label="Expense Name: "
                    style={{
                        backgroundColor: "white"
                    }}
                    value={this.state.newExpense.expenseName}
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />     */}


                  <label htmlFor="due-date">Due Date: </label>
                  <input 
                      type="date" 
                      name="dueDate" 
                      id="due-date" 
                      onChange={this.handleInputChange} 
                      value={this.state.newExpense.dueDate}
                  />

                  {/* <TextField 
                    id="due-date"
                    label="Due Date: "
                    style={{
                        backgroundColor: "white"
                    }}
                    value={this.state.newExpense.dueDate}
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />   */}

                  <label htmlFor="estimated-amount">Estimated Amount: </label>
                  <input 
                      type="text" 
                      name="estimatedAmount" 
                      id="estimated-amount" 
                      onChange={this.handleInputChange} 
                      value={this.state.newExpense.estimatedAmount}
                  />
                  </div>

                  {/* <TextField 
                    id="estimated-amount"
                    label="Estimated Amount: "
                    style={{
                        backgroundColor: "white"
                    }}
                    value={this.state.newExpense.estimatedAmount}
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />   */}

                  <label htmlFor="paid-date">Paid Date: </label>
                  <input 
                      type="date" 
                      name="paidDate" 
                      id="paid-date" 
                      onChange={this.handleInputChange} 
                      value={this.state.newExpense.paidDate}
                  />

                  {/* <TextField 
                    id="paid-date"
                    label="Paid Date: "
                    style={{
                        backgroundColor: "white"
                    }}
                    value={this.state.newExpense.paidDate}
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />   */}

                  <label htmlFor="actual-paid-amount">Actual Paid Amount: </label>
                  <input 
                      type="text" 
                      name="actualPaidAmount" 
                      id="actual-paid-amount" 
                      onChange={this.handleInputChange} 
                      value={this.state.newExpense.actualPaidAmount}
                  />

                  {/* <TextField 
                    id="actual-paid-amount"
                    label="Actual Paid Amount: "
                    style={{
                        backgroundColor: "white"
                    }}
                    value={this.state.newExpense.actualPaidAmount}
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />   */}

                  <div>
                  <input className="edit-submit-button" type="submit" value="Add Expense" />
                  </div>
                </div>
                {/* </div> */}
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

        <div className="expense-table">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense Name</TableCell>
                <TableCell align="right">Date Due</TableCell>
                <TableCell align="right">Estimated Amount</TableCell>
                <TableCell align="right">Date Paid</TableCell>
                <TableCell align="right">Amount Paid</TableCell>
                
              </TableRow>
            
            </TableHead>
            <TableBody>
              {expensesList}
              <TableRow>
                <TableCell>{[<strong>Total</strong>]}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{sumOfEstimatedAmount}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{sumOfPaidExpenses}</TableCell>              
              </TableRow>
            </TableBody>
           
          </Table>
        </Paper>
        </div>
      </div>
    )
  } 
}




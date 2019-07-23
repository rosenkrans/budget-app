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
  
  state={
    expenses: []
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

  render(){
    const expensesList=this.state.expenses.map((expense) => {
      return(
        <TableRow>
          <TableCell><Link to={`/budgets/${this.props.budgetId}/expenses/${expense._id}`}>{expense.expenseName}</Link></TableCell>
          <TableCell align="right">Date Due</TableCell>
          <TableCell align="right">{expense.estimatedAmount}</TableCell>
          <TableCell align="right">Date Paid</TableCell>
          <TableCell align="right">{expense.actualPaidAmount}</TableCell>
        </TableRow>
      )
    })
  return (
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
        </TableBody>
      </Table>
    </Paper>
  );
}
}
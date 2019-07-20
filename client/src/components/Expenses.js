import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Expenses extends Component {
    state = {
        expenses: [],
        newExpense: {
            name: '',
            expenseName: '',
            estimatedAmount: '',
            actualPaidAmount: ''
        },
        isNewFormDisplayed: false
    }

    componentDidMount() {
        this.getAllExpenses()
    }

    getAllExpenses = () => {
        axios.get('/api/expenses')
                .then((res) => {
                this.setState({expenses: res.data})
            })
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
        axios.post('/api/expenses', this.state.newExpense)
            .then(() => {
                this.setState({isNewFormDisplayed: false})
                this.getAllExpenses() 
            })
    }

    render() {
        let expensesList = this.state.expenses.map((expense) => {
            console.log(expense)
            return (
                <div>
                    <Link key={expense._id} to={`/expenses/${expense._id}`}>{expense.name}</Link>
                </div>
            )
        })

        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-expense-name">Expense Name</label>
                    <input
                        type="text"
                        name="name"
                        id="new-expense-name"
                        onChange={this.handleInputChange}
                        value={this.state.newExpense.name}
                    />

                    <label htmlFor="expense-name">Expense Name: </label>
                    <input 
                        type="text" 
                        id="expense-name" 
                        name="expenseName" 
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.expenseName}
                    />

                    <label htmlFor="estimated-amount">Estimated Amount: </label>
                    <input 
                        type="text" 
                        id="estimated-amount" 
                        name="estimatedAmount" 
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.estimatedAmount}
                    />

                    <label htmlFor="actual-paid-amount">Actual Paid Amount: </label>
                    <input 
                        type="text" 
                        id="actual-paid-amount" 
                        name="actualPaidAmount" 
                        onChange={this.handleInputChange} 
                        value={this.state.newExpense.actualPaidAmount}
                    />

                    <input type="submit" value="Add Expense" />
                </form>

                :<div>
                    <div>
                        <h1 className="expense-list-header">Expense List: </h1>
                        <button onClick={this.handleToggleNewForm}>Create New Expense</button>
                    </div>
                    
                    <div id="expense-list">
                        {expensesList}
                    </div>
                </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link} from 'react-router-dom'

export default class SingleExpense extends Component {
    state = {
        expense: {},
        isEditFormDisplayed: false, 
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/budgets/${this.props.match.params.budgetId}/expenses/${this.props.match.params.expenseId}`)
            .then((res) => {
                console.log(res)
                this.setState({expense: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedExpense = {...this.state.expense}
        copiedExpense[event.target.name] = event.target.value

        this.setState({expense: copiedExpense}) 
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/budgets/${this.props.match.params.budgetId}/expenses/${this.state.expense._id}`, this.state.expense)
            .then((res) => {
                this.setState({
                    expense: res.data,
                    isEditFormDisplayed: false 
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
        
    handleDeleteExpense = () => {
        axios.delete(`/api/budgets/${this.props.match.params.budgetId}/expenses/${this.state.expense._id}`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/budgets/${this.props.match.params.budgetId}`} />
        }
        return (
            this.state.isEditFormDisplayed
            ? <form onSubmit={this.handleSubmit}>
                <label htmlFor="expense-name">Expense Name: </label>
                <input 
                    type="text" 
                    id="expense-name" 
                    name="expenseName" 
                    onChange={this.handleInputChange} 
                    value={this.state.expense.expenseName}
                />

                <label htmlFor="due-date">Due Date: </label>
                <input 
                    type="date" 
                    name="dueDate" 
                    id="due-date" 
                    onChange={this.handleInputChange} 
                    value={this.state.expense.dueDate}
                />

                <label htmlFor="estimated-amount">Estimated Amount: </label>
                <input 
                    type="text" 
                    id="estimated-amount" 
                    name="estimatedAmount" 
                    onChange={this.handleInputChange} 
                    value={this.state.expense.estimatedAmount}
                />

                <label htmlFor="paid-date">Paid Date: </label>
                <input 
                    type="date" 
                    name="paidDate" 
                    id="paid-date" 
                    onChange={this.handleInputChange} 
                    value={this.state.expense.paidDate}
                />

                <label htmlFor="actual-paid-amount">Actual Paid Amount: </label>
                <input 
                    type="text" 
                    id="actual-paid-amount" 
                    name="actualPaidAmount" 
                    onChange={this.handleInputChange} 
                    value={this.state.expense.actualPaidAmount}
                />

                <input className="edit-submit-button" type="submit" value="Update Expense" />
            </form>

            :<div>
                <div>
                    <Link to={`/budgets/${this.props.match.params.budgetId}`}>Back to Budget</Link>
                </div>
                <div className="single-expense-content">
                    <div class="single-expense-buttons">
                        <button class="button" onClick={this.handleToggleEditForm}>Edit Expense</button>
                        <button class="button" onClick={this.handleDeleteExpense}>Delete Expense</button>
                    </div>
                    <h3>Expense: {this.state.expense.expenseName}</h3>
                    <h3>Due Date: {this.state.expense.dueDate}</h3>
                    <h3>Estimated Amount: {this.state.expense.estimatedAmount}</h3>
                    <h3>Paid Date: {this.state.expense.paidDate}</h3>
                    <h3>Actual Amount Paid: {this.state.expense.actualPaidAmount}</h3>      
                </div>
            </div>
        )
    }
}






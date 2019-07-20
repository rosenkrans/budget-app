import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class SingleBudget extends Component {

    state = {
        budget: {},
        isEditFormDisplayed: false, 
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/budgets/${this.props.match.params.budgetId}`)
            .then((res) => {
                this.setState({budget: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedBudget = {...this.state.budget}
        copiedBudget[event.target.name] = event.target.value

        this.setState({budget: copiedBudget}) 
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/budgets/${this.state.budget._id}`, this.state.budget)
            .then((res) => {
                this.setState({
                    budget: res.data,
                    isEditFormDisplayed: false 
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
        
    handleDeleteBudget = () => {
        axios.delete(`/api/budgets/${this.state.budget._id}`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            this.state.isEditFormDisplayed
            ? <form onSubmit={this.handleSubmit}>
                <label htmlFor="budget-name">Budget Name: </label>
                <input 
                    type="text" 
                    id="budget-name" 
                    name="name" 
                    onChange={this.handleInputChange} 
                    value={this.state.budget.name}
                />

                <label htmlFor="expense-name">Expense Name: </label>
                <input 
                    type="text" 
                    id="expense-name" 
                    name="expenseName" 
                    onChange={this.handleInputChange} 
                    value={this.state.budget.expenseName}
                />

                <label htmlFor="estimated-amount">Estimated Amount: </label>
                <input 
                    type="text" 
                    id="estimated-amount" 
                    name="estimatedAmount" 
                    onChange={this.handleInputChange} 
                    value={this.state.budget.estimatedAmount}
                />

                <input type="submit" value="Update Budget" />
            </form>

            :<div>
                <button onClick={this.handleToggleEditForm}>Edit Budget</button>
                <button onClick={this.handleDeleteBudget}>Delete Budget</button>
                <h2>{this.state.budget.name}</h2>
                <h3>{this.state.budget.expenseName}</h3>
                <h3>{this.state.budget.estimatedAmount}</h3>               
            </div>
        )
    }
}


import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Budgets extends Component {

    state = {
        budgets: [],
        newBudget: {
            name: '',
            expenseName: ''       
        },
        isNewFormDisplayed: false
    }

    componentDidMount() {
        this.getAllBudgets()
    }

    getAllBudgets = () => {
        axios.get('/api/budgets')
                .then((res) => {
                this.setState({budgets: res.data})
            })
    }

    handleToggleNewForm = () => {
        this.setState((state) => {
            return {isNewFormDisplayed: !state.isNewFormDisplayed}
        })
    }

    handleInputChange = (event) => {
        const copiedBudget = {...this.state.newBudget}
        copiedBudget[event.target.name] = event.target.value 

        this.setState({newBudget: copiedBudget})
    }

    handleSubmit = (event) => {
        event.preventDefault()       
        axios.post('/api/budgets', this.state.newBudget)
            .then(() => {
                this.setState({isNewFormDisplayed: false})
                this.getAllBudgets() 
            })
    }

    render() {
        let budgetsList = this.state.budgets.map((budget) => {
            console.log(budget)
            return (
                <Link key={budget._id} to={`/budgets/${budget._id}`}>{budget.name}</Link>
            )
        })

        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-budget-name">Budget Name</label>
                    <input
                        type="text"
                        name="name"
                        id="new-budget-name"
                        onChange={this.handleInputChange}
                        value={this.state.newBudget.name}
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

                    <input type="submit" value="Add Budget" />
                </form>

                :<div>
                    <div>
                        <h1 className="budget-list-header">Budget List: </h1>
                        <button onClick={this.handleToggleNewForm}>Create New Budget</button>
                    </div>
                    
                    <div id="budget-list">
                        <h3>Something</h3>
                        {budgetsList}
                    </div>
                </div>
        )
    }
}

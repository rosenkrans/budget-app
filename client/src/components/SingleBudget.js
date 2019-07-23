import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Expenses from './Expenses.js'
import SimpleTable from './SimpleTable.js'

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
            .then(() => {
                axios.get(`/api/budgets/${this.props.match.params.budgetId}/expenses`)
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
                <a href='/'>Home</a>
                <label htmlFor="budget-name">Budget Name: </label>
                <input 
                    type="text" 
                    id="budget-name" 
                    name="name" 
                    onChange={this.handleInputChange} 
                    value={this.state.budget.name}
                />

                <input type="submit" value="Update Budget" />
            </form>

            :<div>
                <div>
                    <a href='/'>Home</a>
                </div>
                <div class="single-budget-buttons">
                    <button class="button" onClick={this.handleToggleEditForm}>Edit Budget Name</button>
                    <button class="button" onClick={this.handleDeleteBudget}>Delete Budget</button>
                </div>
                <h2>{this.state.budget.name} Budget</h2>
                
                <div>
                    <Expenses 
                        budgetId={this.props.match.params.budgetId}
                    />
                </div>
                <div>
                    <SimpleTable 
                        budgetId={this.props.match.params.budgetId}
                    />
                </div>
            </div>
        )
    }
}



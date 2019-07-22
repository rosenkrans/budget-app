import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Budgets extends Component {

    state = {
        budgets: [],
        newBudget: {
            name: '',
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
                <div>
                    <Link key={budget._id} to={`/budgets/${budget._id}`}>{budget.name}</Link>
                </div>
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

                    <input type="submit" value="Add Budget" />
                </form>

                :<div>
                    <div>
                        <button class="create-budget-button" onClick={this.handleToggleNewForm}>Create New Budget</button>
                        <h1 className="budget-list-header">List of Budgets </h1>                       
                    </div>
                    
                    <div id="budget-list">
                        {budgetsList}
                    </div>
                </div>
        )
    }
}


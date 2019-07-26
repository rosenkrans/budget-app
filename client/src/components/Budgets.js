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
                    <Link style={{color:'white'}} key={budget._id} to={`/budgets/${budget._id}`}>{budget.name}</Link>
                </div>
            )
        })

        return (
            this.state.isNewFormDisplayed
                ? <form onSubmit={this.handleSubmit} id="create-budget-form">
                    <a href='/'>Home</a>
                    <div className="create-budget-form">
                        <label htmlFor="new-budget-name" style={{color:'white'}}>Budget Name: </label>
                        <input
                            type="text"
                            name="name"
                            id="new-budget-name"
                            onChange={this.handleInputChange}
                            value={this.state.newBudget.name}
                        />

                        <input className="edit-submit-button" type="submit" value="Add Budget" />
                    </div>
                </form>

                :<div className="budget-list-body" id="budget-list-body">
                    <div>
                        <div>
                            <button 
                                className="create-budget-button" 
                                onClick={this.handleToggleNewForm}>Create New Budget
                            </button>
                            <h1 className="budget-list-header">List of Budgets </h1>                       
                        </div>
                        
                        <div id="budget-list">                       
                            {budgetsList}                        
                        </div>
                    </div>
                </div>
        )
    }
}


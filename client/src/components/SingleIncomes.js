import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link} from 'react-router-dom'

export default class SingleIncome extends Component {
    state = {
        income: {},
        isEditFormDisplayed: false, 
        redirectToBudget: false
    }

    componentDidMount() {
        axios.get(`/api/budgets/${this.props.match.params.budgetId}/incomes/${this.props.match.params.incomeId}`)
            .then((res) => {
                console.log(res)
                this.setState({income: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedIncome = {...this.state.income}
        copiedIncome[event.target.name] = event.target.value

        this.setState({income: copiedIncome}) 
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/budgets/${this.props.match.params.budgetId}/incomes/${this.state.income._id}`, this.state.income)
            .then((res) => {
                this.setState({
                    income: res.data,
                    isEditFormDisplayed: false,
                    redirectToBudget: true
                })
            })
    
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
        
    handleDeleteIncome = () => {
        if(window.confirm("Are you sure you want to delete?")){ 
        axios.delete(`/api/budgets/${this.props.match.params.budgetId}/incomes/${this.state.income._id}`)
            .then(() => {
                this.setState({redirectToBudget: true})
            })
        }
    }

    render() {
        if(this.state.redirectToBudget) {
            return <Redirect to={`/budgets/${this.props.match.params.budgetId}`} />
        }
        return (
            this.state.isEditFormDisplayed
            ? <form onSubmit={this.handleSubmit}>
                <div className="edit-income-form" id="edit-income-form">
                <div>
                <label style={{color:'white'}} htmlFor="income-name">Income Name: </label>
                  <input 
                      type="text" 
                      name="incomeName" 
                      id="income-name"
                      className="input-field"
                    onChange={this.handleInputChange} 
                    value={this.state.income.incomeName}
                />
                </div>
                <div>
                <label style={{color:'white'}} htmlFor="income-date">Due Date: </label>
                    <input 
                        type="date" 
                        name="incomeDate" 
                        id="income-date" 
                        className="input-field"
                    onChange={this.handleInputChange} 
                    value={this.state.income.incomeDate}
                />
                </div>
                <div>
                <label style={{color:'white'}} htmlFor="income-amount">Income Amount: </label>
                  <input 
                      type="text" 
                      name="income" 
                      id="income" 
                      className="input-field"
                    onChange={this.handleInputChange} 
                    value={this.state.income.income}
                />
                </div>
              
                <div>
                <input className="edit-submit-button" type="submit" value="Update Income" />
                </div>
                </div>
            </form>

            :<div id="single-income-content">
                <div>
                    <Link to={`/budgets/${this.props.match.params.budgetId}`}>Back to Budget</Link>
                </div>
                <div className="single-income-content">
                    <div class="single-income-buttons">
                        <button class="button" onClick={this.handleToggleEditForm}>Edit Income</button>
                        <button class="button" onClick={this.handleDeleteIncome}>Delete Income</button>
                    </div>
                    <h3 style={{color:'white'}}>Income: {this.state.income.incomeName}</h3>
                    <h3 style={{color:'white'}}>Income Date: {this.state.income.incomeDate}</h3>
                    <h3 style={{color:'white'}}>Income Ammount: {this.state.income.income}</h3>                        
                </div>
            </div>
        )
    }
}






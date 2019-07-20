const express = require('express')

const budgetApi = require('../models/budget.js')

const budgetRouter = express.Router()

budgetRouter.get('/', (req, res) => {
  budgetApi.getAllBudgets()
    .then((budgets) => {
      res.json(budgets) 
    })
})

budgetRouter.get('/:budgetId', (req, res) => {
  budgetApi.getSingleBudget(req.params.budgetId)
    .then((budget) => {
      res.json(budget)
    })
    .catch((err) => {
      console.log(err)
    })
})

budgetRouter.post('/', (req, res) => {
  budgetApi.addNewBudget(req.body) 
    .then((budget) => {
      res.json(budget) 
    })
    .catch((err) => {
      console.log(err)
    })
})

budgetRouter.put('/:budgetId', (req, res) => {
  budgetApi.updateBudget(req.params.budgetId, req.body)
    .then((updatedBudget) => {
      res.json(updatedBudget) 
    })
    .catch((err) => {
      console.log(err)
    })
})

budgetRouter.delete('/:budgetId', (req, res) => {
  budgetApi.deleteBudget(req.params.budgetId) 
    .then((deleteBudget) => {
      res.json(deleteBudget)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = {
  budgetRouter
}

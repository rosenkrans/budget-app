const express = require('express')

const incomeApi = require('../models/income.js')

const incomeRouter = express.Router({mergeParams: true})

incomeRouter.get('/', (req, res) => {
  incomeApi.getAllIncomesByBudgetId(req.params.budgetId)
    .then((incomes) => {
      res.json(incomes) 
    })
    .catch((err) => {
      console.log(err)
    })
})

incomeRouter.get('/:incomeId', (req, res) => {
  incomeApi.getSingleIncome(req.params.incomeId)
    .then((income) => {
      res.json(income)
    })
    .catch((err) => {
      console.log(err)
    })
})

incomeRouter.post('/', (req, res) => {
  req.body.budgetId = req.params.budgetId
  incomeApi.addNewIncome(req.body) 
    .then((income) => {
      res.json(income) 
    })
    .catch((err) => {
      console.log(err)
    })
})

incomeRouter.put('/:incomeId', (req, res) => {
  incomeApi.updateIncome(req.params.incomeId, req.body)
    .then((updatedIncome) => {
      res.json(updatedIncome) 
    })
    .catch((err) => {
      console.log(err)
    })
})

incomeRouter.delete('/:incomeId', (req, res) => {
  incomeApi.deleteIncome(req.params.incomeId) 
    .then((deleteIncome) => {
      res.json(deleteIncome)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = {
  incomeRouter
}

const express = require('express')

const expenseApi = require('../models/expense.js')

const expenseRouter = express.Router({mergeParams: true})

expenseRouter.get('/', (req, res) => {
  expenseApi.getAllExpensesByBudgetId()
    .then((expenses) => {
      res.json(expenses) 
    })
})

expenseRouter.get('/:expenseId', (req, res) => {
  expenseApi.getSingleExpense(req.params.expenseId)
    .then((expense) => {
      res.json(expense)
    })
    .catch((err) => {
      console.log(err)
    })
})

expenseRouter.post('/', (req, res) => {
  expenseApi.addNewExpense(req.body) 
    .then((expense) => {
      res.json(expense) 
    })
    .catch((err) => {
      console.log(err)
    })
})

expenseRouter.put('/:expenseId', (req, res) => {
  expenseApi.updateExpense(req.params.expenseId, req.body)
    .then((updatedExpense) => {
      res.json(updatedExpense) 
    })
    .catch((err) => {
      console.log(err)
    })
})

expenseRouter.delete('/:expenseId', (req, res) => {
  expenseApi.deleteExpense(req.params.expenseId) 
    .then((deleteExpense) => {
      res.json(deleteExpense)
    })
    .catch((err) => {
      console.log(err)
    })
})

// expenseRouter.delete('/allexpenses', (req, res) => {
//     expenseApi.deleteAllExpenses(banana) 
//     .then((deleteAllExpenses) => {
//       res.json(deleteAllExpenses)
//     })
//     .catch((err) => {
//         console.log(err)
//       })
// })

module.exports = {
  expenseRouter
}

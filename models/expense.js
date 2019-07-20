const mongoose = require('./connection.js')

const ExpenseSchema = new mongoose.Schema({
 name: String,
 expenseName: String,
 estimatedAmount: Number,
 actualPaidAmount: Number,
 budgetId: mongoose.Types.ObjectId
})

const ExpenseCollection = mongoose.model('Expense', ExpenseSchema)

function getAllExpensesByBudgetId(budgetId) {
  return ExpenseCollection.find({budgetId})
}

function getSingleExpense(expenseId) {
  return ExpenseCollection.findById(expenseId)
}

function addNewExpense(expenseObject) {
  return ExpenseCollection.create(expenseObject)
}

function updateExpense(expenseId, updatedExpenseObject) {
  return ExpenseCollection.findByIdAndUpdate(expenseId, updatedExpenseObject, {new: true})
}

function deleteExpense(expenseId) {
  return ExpenseCollection.findByIdAndDelete(expenseId)
}

module.exports = {
  getAllExpensesByBudgetId,
  getSingleExpense,
  addNewExpense,
  updateExpense,
  deleteExpense
}
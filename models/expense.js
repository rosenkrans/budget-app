const mongoose = require('./connection.js')

const ExpenseSchema = new mongoose.Schema({
 name: String,
 expenseName: String,
 estimatedAmount: Number,
 actualPaidAmount: Number
})

const ExpenseCollection = mongoose.model('Expense', ExpenseSchema)

function getAllExpenses() {
  return ExpenseCollection.find()
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
  getAllExpenses,
  getSingleExpense,
  addNewExpense,
  updateExpense,
  deleteExpense
}
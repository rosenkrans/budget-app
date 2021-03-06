const mongoose = require('./connection.js')

const BudgetSchema = new mongoose.Schema({
 name: String,
 expenseName: String,
 estimatedAmount: Number,
 actualPaidAmount: Number
})

const BudgetCollection = mongoose.model('Budget', BudgetSchema)

function getAllBudgets() {
  return BudgetCollection.find()
}

function getSingleBudget(budgetId) {
  return BudgetCollection.findById(budgetId)
}

function addNewBudget(budgetObject) {
  return BudgetCollection.create(budgetObject)
}

function updateBudget(budgetId, updatedBudgetObject) {
  return BudgetCollection.findByIdAndUpdate(budgetId, updatedBudgetObject, {new: true})
}

function deleteBudget(budgetId) {
  return BudgetCollection.findByIdAndDelete(budgetId)
}

module.exports = {
  getAllBudgets,
  getSingleBudget,
  addNewBudget,
  updateBudget,
  deleteBudget
}

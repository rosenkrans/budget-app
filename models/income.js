const mongoose = require('./connection.js')

const IncomeSchema = new mongoose.Schema({
 incomeName: String,
 income: Number,
 incomeDate: String,
 budgetId: mongoose.Types.ObjectId
})

const IncomeCollection = mongoose.model('Income', IncomeSchema)

function getAllIncomesByBudgetId(budgetId) {
  return IncomeCollection.find({budgetId: budgetId})
}

function getSingleIncome(incomeId) {
  return IncomeCollection.findById(incomeId)
}

function addNewIncome(incomeObject) {
  return IncomeCollection.create(incomeObject)
}

function updateIncome(incomeId, updatedIncomeObject) {
  return IncomeCollection.findByIdAndUpdate(incomeId, updatedIncomeObject, {new: true})
}

function deleteIncome(incomeId) {
  return IncomeCollection.findByIdAndDelete(incomeId)
}

module.exports = {
  getAllIncomesByBudgetId,
  getSingleIncome,
  addNewIncome,
  updateIncome,
  deleteIncome
}
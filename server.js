const express = require('express')
const app = express()

const { budgetRouter } = require('./controllers/budget.js')
const { expenseRouter } = require('./controllers/expense.js')
const { incomeRouter } = require('./controllers/income.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/api/budgets', budgetRouter)
app.use('/api/budgets/:budgetId/expenses', expenseRouter)
app.use('/api/budgets/:budgetId/incomes', incomeRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

